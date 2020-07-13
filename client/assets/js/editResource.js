const editResource = e => {
  // prevent default form behavior
  e.preventDefault();

  // toggle progress cursor and masking div on
  $('#mask').toggle();

  // query inputs
  const description = $('#modal-description');
  const keywords = $('#modal-keywords');
  const link = $('#modal-link');

  // validate inputs
  const validatedResourceInputs = validateResourceInputs(
    description.val().trim(),
    keywords.val().trim(),
    link.val().trim()
  );

  // toggle progress cursor and masking div off
  if (!validatedResourceInputs) return $('#mask').toggle();

  // query collection
  const collection = $('h1.page-title').html();

  // query resource _id (added from onload.js table click delegation)
  const id = $('.modal.edit button[type=submit]').attr('data-id');

  // AJAX
  $.ajax({
    url: `${API_URL}/api/resource/${localStorage.password}/${collection}/${id}`,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(validatedResourceInputs),
    dataType: 'json',
    success: resource => {
      // handle error if no resource
      if (!resource) return handleErrors('Sorry, an error has occurred.');
      // update row with edited resource
      updateRow(id, resource);
    },
    error: (xhr, errorType, exception) => {
      // log error
      console.log('addResource error:', xhr, errorType, exception);
      // handle error
      handleErrors('Sorry, an error has occurred.');
    },
    complete: () => {
      // hide modal
      $('.modal.edit').toggle().removeClass('show');

      // toggle progress cursor and masking div off
      $('#mask').toggle();

      // unfreeze body
      unfreezeBody();
    }
  });
};

const updateRow = (id, resource) => {
  // find row of button id; update innerText of 'td' elements,
  // and update innerText and href of 'a' element
  $(`button#${id}`).closest('tr').children().each((i, tableData) => {
    if (i === 0) {
      tableData.innerText = resource.description;
    } else if (i === 1) {
      tableData.innerText = resource.keywords.join(', ');
    } else if (i === 2) {
      tableData.firstElementChild.href = resource.link;
      tableData.firstElementChild.innerText = getHost(resource.link);
    }
  });

  // if currently filtering, run filter
  // query filter input
  const filterInputValue = DOMPurify.sanitize($('#filter').val());
  if (filterInputValue) filterTableRows({ target: { value: filterInputValue } });
};
