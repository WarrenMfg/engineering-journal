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
  const validatedInputs = validateInputs(
    description.val().trim(),
    keywords.val().trim(),
    link.val().trim()
  );

  // toggle progress cursor and masking div off
  if (!validatedInputs) return $('#mask').toggle();

  // query collection
  const collection = $('h1.page-title').html();

  // AJAX
  $.ajax({
    url: `${API_URL}/api/resource/${collection}`,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(validatedInputs),
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

  tbody.prepend(
    `<tr>
      <td>${resource.description}</td>
      <td>${resource.keywords.join(', ')}</td>
      <td><a href="${resource.link}" target="_blank">${getHost(resource.link)}</a></td>
      <td><button class="btn btn-outline-primary btn-sm" type="button" id=${resource._id}>Edit</button></td>
    </tr>`
  );
};
