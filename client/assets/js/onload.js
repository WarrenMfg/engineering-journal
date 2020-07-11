$(function() {
  // toggle progress cursor and masking div
  $('#mask').toggle();

  // query heading
  const collection = $('h1.page-title').html();

  // make AJAX request
  $.ajax({
    url: `${API_URL}/api/resources/${collection}`,
    type: 'GET',
    dataType: 'json',
    success: resources => {
      // if no results, handle errors / provide feedback
      if (!resources.length) return handleErrors('No resouces yet.');

      // add resources to DOM
      appendToTable(resources);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      // log error
      console.log('Onload error:', jqXHR, textStatus, errorThrown);
      // handle error
      handleErrors('Sorry, an error has occurred.');
    },
    complete: () => {
      // toggle progress cursor and masking div
      $('#mask').toggle();
    }
  });

  // add API data to DOM
  const appendToTable = resources => {
    // query tbody
    const tbody = $('tbody');

    // make table row
    resources.forEach(resource => {
      tbody.append(
        `<tr>
          <td>${resource.description}</td>
          <td>${resource.keywords.join(', ')}</td>
          <td><a href="${resource.link}" target="_blank">${getHost(resource.link)}</a></td>
          <td class="d-flex justify-content-center align-items-center"><button class="btn btn-outline-primary btn-sm" type="button" id=${resource._id}>Edit</button></td>
        </tr>`
      );
    });
  };

  // MODAL EVENT LISTENERS
  // query modal
  const modal = $('.modal');

  // toggle modal on escape
  modal.on('keydown', e => {
    if (e.key === 'Escape') {
      // hide modal
      modal.toggle().addClass('show');

      // unfreeze body
      unfreezeBody();
    }
  });

  // toggle modal on click off
  modal.on('click', e => {
    if (e.target.classList.contains('modal')) {
      // hide modal
      modal.toggle().addClass('show');

      // unfreeze body
      unfreezeBody();
    }
  });

  // add event listener to modal close button
  modal.find('button.close').on('click', () => {
    // hide modal
    modal.toggle().removeClass('show');

    // unfreeze body
    unfreezeBody();
  });

  // delegate 'Edit' button clicks to table
  $('table').on('click', 'button', e => {
    // freeze scroll
    const scrollY = window.scrollY;
    $('body').addClass('freeze').css('top', `-${scrollY}px`);

    // show modal
    modal.toggle().addClass('show');

    // add resource _id to modal submit button (needed in editResource.js)
    modal.find('button[type=submit]').attr('data-id', e.target.id);
    // add resource _id to modal delete button (needed in deleteResource.js)
    modal.find('.modal-footer button').attr('data-id', e.target.id);

    // get resource row
    const tableRow = $(e.target).parentsUntil('tbody').last();
    // get modal form inputs
    const inputs = $('.modal .form-control');
    // populate inputs with resource to be edited
    tableRow.children().each((i, tableData) => {
      if (i <= 1) {
        inputs[i].value = tableData.innerText;
      } else if (i === 2) {
        inputs[i].value = tableData.firstElementChild.href;
      }
    });

    // focus on first input
    inputs.first().focus();
  });

  // add event listener to modal delete button
  modal.find('.modal-footer button').on('click', e => {
    deleteResource(e);
  });
});
