(function() {
  // query dropdown menu
  const dropdownMenu = $('.dropdown-menu');

  // add event listern to topic.html links
  dropdownMenu.on('click', 'a[href="topic.html"]', e => {
    localStorage.setItem('topic', e.target.innerText);
  });

  // query add topic from dropdown menu
  const addTopic = dropdownMenu.children().first();

  // query filter input
  const filterInput = $('#filter');

  // query new topic name input field
  const newTopicName = $('#new-topic-name');

  // add on click event listener
  addTopic.on('click', () => {
    filterInput.hide();
    newTopicName.val('');
    newTopicName.show().focus();
  });

  // add on blur event listener
  newTopicName.on('blur', function() {
    $(this).hide();
    filterInput.show();
  });

  // add Enter event listener
  newTopicName.on('keydown', e => {
    const sanitized = DOMPurify.sanitize(e.target.value);
    if (e.key === 'Enter' && sanitized) {
      // toggle progress cursor and masking div on
      $('#mask').toggle();

      // AJAX
      $.ajax({
        url: `${API_URL}/api/collection/${localStorage.password}`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ collection: sanitized }),
        dataType: 'json',
        success: data => {
          // handle error if no resource
          if (!data.namespaces.length) return handleErrors('Sorry, an error has occurred.');
          // update dropdown menu with all collections
          populateDropdownMenu(data.namespaces, $('h1.page-title').html());
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
})();
