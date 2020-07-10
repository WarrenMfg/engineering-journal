const deleteResource = e => {
  // query collection
  const collection = $('h1.page-title').html();
  const id = e.target.dataset.id;

  // AJAX
  $.ajax({
    url: `${API_URL}/api/resource/${collection}/${id}`,
    type: 'DELETE',
    dataType: 'json',
    success: resource => {
      // handle error if no resource
      if (!resource) return handleErrors('Sorry, an error has occurred.');
      // update row with edited resource
      removeRow(id);
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
    }
  });
};

const removeRow = id => {
  $(`button#${id}`).parentsUntil('tbody').last().remove();
};
