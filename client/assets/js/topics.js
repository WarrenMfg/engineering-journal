(function() {
  /* START ADD TOPIC */

  // query dropdown menu
  const dropdownMenu = $('.dropdown-menu');

  // add event listern to topic.html links
  dropdownMenu.on('click', 'a[href="topic.html"]', e => {
    // localStorage is used to handoff collection name
    // so that topicCollection.js can use it to populate h1.page-title in topic.html
    // then onload.js uses h1.page-title to fetch collection
    localStorage.setItem('topic', e.target.innerText.trim());
  });

  // query add topic from dropdown menu
  const addTopic = dropdownMenu.children().first();

  // query filter or update-password input
  const filter = $('#filter');
  const filterOrUpdatePassword = $('#filter').length ? filter : $('#update-password');

  // query new topic name input field
  const newTopicName = $('#new-topic-name');

  // query collection
  const collectionH1 = $('h1.page-title');

  // add on click event listener
  addTopic.on('click', () => {
    filterOrUpdatePassword.hide();
    newTopicName.val('');
    newTopicName.show().focus();
  });

  // add on blur event listener
  newTopicName.on('blur', function() {
    $(this).hide();
    filterOrUpdatePassword.show();
  });

  // add Enter event listener
  newTopicName.on('keydown', e => {
    if (e.key === 'Enter') {
      // sanitize
      const sanitized = DOMPurify.sanitize(e.target.value.trim());
      // if no sanitized input, return
      if (!sanitized) return newTopicName.blur();

      // toggle progress cursor and masking div on
      $('#mask').toggle();

      // AJAX
      $.ajax({
        url: `${API_URL}/api/collection/${DOMPurify.sanitize(
          localStorage.getItem('password').trim()
        )}`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ collection: sanitized }),
        dataType: 'json',
        success: data => {
          // handle error if no resource
          if (!data.namespaces.length || !data.newNamespace) {
            return handleErrors('Sorry, an error has occurred.');
          }

          // update dropdown menu with all collections
          populateDropdownMenu(data.namespaces, collectionH1.text());
        },
        error: (xhr, errorType, exception) => {
          // log error
          console.log('addResource error:', xhr, errorType, exception);
          // handle error
          handleErrors('Sorry, an error has occurred.');
        },
        complete: () => {
          // blur #new-topic-name input
          newTopicName.blur();

          // toggle progress cursor and masking div off
          $('#mask').toggle();
        }
      });
    }
  });

  /* END ADD TOPIC */
  /* START DELETE COLLECTION */

  // query delete button
  const deleteCollection = $('#delete-collection');

  // add on click event listener
  deleteCollection.on('click', () => {
    // confirm
    if (!confirm('Are you sure?')) return;

    // toggle progress cursor and masking div on
    $('#mask').toggle();

    // AJAX
    $.ajax({
      url: `${API_URL}/api/collection/${DOMPurify.sanitize(
        localStorage.getItem('password').trim()
      )}/${DOMPurify.sanitize(localStorage.getItem('topic').trim())}`,
      type: 'DELETE',
      dataType: 'json',
      success: data => {
        // handle error if no resource
        if (!data.dropped) return handleErrors('Sorry, an error has occurred.');
      },
      error: (xhr, errorType, exception) => {
        // log error
        console.log('addResource error:', xhr, errorType, exception);
        // handle error
        handleErrors('Sorry, an error has occurred.');
      },
      complete: () => {
        localStorage.removeItem('topic');
        // replace current page with index.html
        window.location.replace(window.location.origin + '/index.html');
      }
    });
  });

  /* END DELETE COLLECTION */
  /* START UPDATE COLLECTION NAME EVENT LISTENERS */

  // add keydown event listener to collectionH1
  collectionH1.on('keydown', e => {
    if (e.key === 'Enter') {
      // make content editable again
      e.target.contentEditable = false;
    }
  });

  // blur will run both on blur and on Enter because Enter blurs target
  collectionH1.on('blur', e => {
    // make target editable again
    e.target.contentEditable = true;

    // sanitize input
    const sanitized = DOMPurify.sanitize(e.target.innerText.trim());
    if (!sanitized) {
      collectionH1.text(DOMPurify.sanitize(localStorage.getItem('topic').trim()));
      return handleErrors('Please enter a valid topic.');
    }
    // if no change
    if (sanitized === DOMPurify.sanitize(localStorage.getItem('topic').trim())) return;

    // toggle progress cursor and masking div on
    $('#mask').toggle();

    // AJAX
    $.ajax({
      url: `${API_URL}/api/collection/${DOMPurify.sanitize(
        localStorage.getItem('password').trim()
      )}/${DOMPurify.sanitize(localStorage.getItem('topic').trim())}/${sanitized}`,
      type: 'PUT',
      dataType: 'json',
      success: data => {
        // handle error if no resource
        if (!data.namespaces.length || !data.updatedCollection) {
          return handleErrors('Sorry, an error has occurred.');
        }

        // update localStorage
        localStorage.setItem('topic', data.updatedCollection);

        // update dropdown menu with all collections
        populateDropdownMenu(data.namespaces, data.updatedCollection);
      },
      error: (xhr, errorType, exception) => {
        // log error
        console.log('addResource error:', xhr, errorType, exception);
        // handle error
        handleErrors('Sorry, an error has occurred.');
      },
      complete: () => {
        // toggle progress cursor and masking div off
        $('#mask').toggle();
      }
    });
  });

  /* END UPDATE COLLECTION NAME EVENT LISTENERS */
})();
