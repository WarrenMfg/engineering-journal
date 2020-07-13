const addResource = e => {
  // prevent default form behavior
  e.preventDefault();

  // toggle progress cursor and masking div on
  $('#mask').toggle();

  // query inputs
  const description = $('#description');
  const keywords = $('#keywords');
  const link = $('#link');

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

  // AJAX
  $.ajax({
    url: `${API_URL}/api/resource/${collection}`,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(validatedResourceInputs),
    dataType: 'json',
    success: resource => {
      // handle error if empty array
      if (!resource) return handleErrors('Sorry, an error has occurred.');
      // update table with new resource
      prependToTable(resource);
    },
    error: (xhr, errorType, exception) => {
      // log error
      console.log('addResource error:', xhr, errorType, exception);
      // handle error
      handleErrors('Sorry, an error has occurred.');
    },
    complete: () => {
      // reset inputs
      description.val('');
      keywords.val('');
      link.val('');

      // focus on description
      description.focus();

      // toggle progress cursor and masking div off
      $('#mask').toggle();
    }
  });
};

const prependToTable = resource => {
  // query tbody
  const tbody = $('tbody');

  const pins = tbody.find('.pin');

  // if resources are pinned, add new resource after pins
  if (pins.length) {
    pins
      .last()
      .after(
        tableRow(
          '',
          resource.createdAt,
          resource.description,
          resource.keywords,
          resource.link,
          resource._id
        )
      );

    // else prepend to tbody
  } else {
    tbody.prepend(
      tableRow(
        '',
        resource.createdAt,
        resource.description,
        resource.keywords,
        resource.link,
        resource._id
      )
    );
  }

  // if currently filtering, run filter
  // query filter input
  const filterInputValue = DOMPurify.sanitize($('#filter').val());
  if (filterInputValue) filterTableRows({ target: { value: filterInputValue } });
};
