(function() {
  /* START ADD TOPIC */

  // query dropdown menu
  const dropdownMenu = $('.dropdown-menu');

  // add event listern to topic.html links
  dropdownMenu.on('click', 'a[href="topic.html"]', e => {
    // add query string for collection name and navigate to page

    e.target.href = 'javascript:void(0)';
    window.location.assign(
      `${window.location.origin}/topic.html?collection=${e.target.innerText.trim()}`
    );
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
      // sanitize and remove extra spaces between words
      const sanitized = DOMPurify.sanitize(
        e.target.value
          .split(' ')
          .reduce((acc, val) => {
            val = val.trim();
            if (val) {
              acc.push(val);
            }
            return acc;
          }, [])
          .join(' ')
      );

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

          // update dropdown menu and edit modal select element with all collections
          const sortedNamespaces = populateDropdownMenu(data.namespaces, collectionH1.text());

          // if not adding new topic from index.html, then update edit modal select element
          if (!window.location.pathname.includes('/index.html')) {
            populateEditTopic(sortedNamespaces, collectionH1.text());
          }
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
      )}/${DOMPurify.sanitize(getURLcollection())}`,
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
        // replace current page with index.html
        const href = window.location.href.split('/');
        href.splice(-1, 1, 'index.html');
        window.location.replace(href.join('/'));
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
    const sanitized = DOMPurify.sanitize(
      e.target.innerText
        .split(' ')
        .reduce((acc, val) => {
          val = val.trim();
          if (val) {
            acc.push(val);
          }
          return acc;
        }, [])
        .join(' ')
    );

    if (!sanitized) {
      // return to original
      collectionH1.text(DOMPurify.sanitize(getURLcollection()));
      return handleErrors('Please enter a valid topic.');
    } else {
      // else update h1
      collectionH1.text(sanitized);
    }

    // if no change
    if (sanitized === DOMPurify.sanitize(getURLcollection())) {
      return;
    }

    // toggle progress cursor and masking div on
    $('#mask').toggle();

    // AJAX
    $.ajax({
      url: `${API_URL}/api/collection/${DOMPurify.sanitize(
        localStorage.getItem('password').trim()
      )}/${DOMPurify.sanitize(getURLcollection())}/${sanitized}`,
      type: 'PUT',
      dataType: 'json',
      success: data => {
        // handle error if no resource
        if (!data.namespaces.length || !data.updatedCollection) {
          return handleErrors('Sorry, an error has occurred.');
        }

        // update url (performs a refresh, but removes previous url from browser history)
        window.location.replace(
          `${window.location.origin}/topic.html?collection=${data.updatedCollection}`
        );
      },
      error: (xhr, errorType, exception) => {
        // log error
        console.log('addResource error:', xhr, errorType, exception);

        if (xhr.status === 409) {
          // handle error
          handleErrors('Topic already exists.');
        } else {
          // handle error
          handleErrors('Sorry, an error has occurred.');
        }

        // revert H1 text
        collectionH1.text(DOMPurify.sanitize(getURLcollection()));

        // toggle progress cursor and masking div off
        $('#mask').toggle();
      }
    });
  });

  /* END UPDATE COLLECTION NAME EVENT LISTENERS */
})();
