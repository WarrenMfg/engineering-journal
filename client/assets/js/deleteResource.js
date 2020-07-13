const deleteResource = e => {
  // toggle progress cursor and masking div on
  $('#mask').toggle();

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
      $('.modal.edit').toggle().removeClass('show');

      // toggle progress cursor and masking div off
      $('#mask').toggle();

      // unfreeze body
      unfreezeBody();
    }
  });
};

const removeRow = id => {
  // query table row
  const tr = $(`button#${id}`).closest('tr');

  // add css feedback
  tr.css({ backgroundColor: 'pink' });

  // animate 'td' element padding; wrap 'td' elements with divs
  // NOTE: the last .children() method queries new div children
  const divs = tr
    .children()
    .animate({ paddingTop: 0, paddingBottom: 0 })
    .wrapInner('<div></div>')
    .children();

  // animate divs
  divs.slideUp('fast', () => {
    // remove entire table row from DOM
    tr.remove();
  });
};
