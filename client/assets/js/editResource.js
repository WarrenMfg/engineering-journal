const editResource = e => {
  // prevent default form behavior
  e.preventDefault();

  // toggle progress cursor and masking div
  $('#mask').toggle();

  // query inputs
  const description = $('#modal-description');
  const keywords = $('#modal-keywords');
  const link = $('#modal-link');

  // query collection
  const collection = $('h1.page-title').html();

  // query resource _id (added from onload.js)
  const id = $('.modal button[type=submit]').attr('data-id');

  // validate inputs
  const validatedInputs = validateInputs(description.val().trim(), keywords.val().trim(), link.val().trim());

  if (!validatedInputs) return;

  // AJAX
  $.ajax({
    url: `${API_URL}/api/resource/${collection}/${id}`,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(validatedInputs),
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
      $('.modal').toggle().removeClass('show');

      // toggle progress cursor and masking div
      $('#mask').toggle();

      // unfreeze body
      unfreezeBody();
    }
  });
};

const updateRow = (id, resource) => {
  $(`button#${id}`).parentsUntil('tbody').last().children().each((i, tableData) => {
    if (i === 0) {
      tableData.innerText = resource.description;
    } else if (i === 1) {
      tableData.innerText = resource.keywords.join(', ');
    } else if (i === 2) {
      tableData.firstElementChild.href = resource.link;
      tableData.firstElementChild.innerText = getHost(resource.link);
    }
  });
};
