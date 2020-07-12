$(function() {
  // toggle progress cursor and masking div on
  $('#mask').toggle();

  /* START FETCH DATA ON LOAD */

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
      // toggle progress cursor and masking div off
      $('#mask').toggle();
    }
  });

  // add API data to DOM
  const appendToTable = resources => {
    // query tbody
    const tbody = $('tbody');
    let order;
    let pins = [];

    // make table rows and pins
    resources.forEach(resource => {
      // if meta, keep pins as order
      if (resource.meta) {
        order = resource.pins;

        // if pinned table row, push to pins array
      } else if (resource.isPinned) {
        pins.push(resource);

        // else append to tbody
      } else {
        tbody.append(
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
    });

    if (order) prependToTable(tbody, order, pins);
  };

  const prependToTable = (tbody = $('tbody'), order, pins) => {
    tbody.prepend(() => {
      let html;
      // iterate through order array to find in pins array
      order.forEach(id => {
        const pin = pins.find(obj => obj._id === id);
        html += tableRow('pin', pin.createdAt, pin.description, pin.keywords, pin.link, pin._id);
      });
      // return HTML string
      return html;
    });
  };

  /* END FETCH DATA ON LOAD */
  /* START MODAL EVENT LISTENERS */

  // query modal
  const modal = $('.modal');

  // toggle modal on escape
  modal.on('keydown', e => {
    if (e.key === 'Escape') {
      // hide modal
      modal.toggle().removeClass('show');

      // unfreeze body
      unfreezeBody();
    }
  });

  // toggle modal when click outside of modal
  modal.on('mousedown', e => {
    if (e.target.classList.contains('modal')) {
      // hide modal
      modal.toggle().removeClass('show');

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

  // add event listener to modal delete button
  modal.find('.modal-footer button').on('click', e => {
    if (confirm('Are you sure?')) deleteResource(e);
  });

  /* END MODAL EVENT LISTENERS */
  /* START TABLE & ERROR FEEDBACK EVENT LISTENERS */

  // delegate 'Edit' button clicks to table
  const table = $('table');

  table.on('click', 'button', e => {
    // stop propagation
    e.stopPropagation();

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
    const tableRow = $(e.target).closest('tr');
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

  // pin and unpin items
  table.on('click', 'tr', e => {
    // assign target
    const target = $(e.target);

    // return if clicked on link
    if (target.prop('tagName') === 'A') return;
    // return if clicked on thead
    if (target.closest('thead').length) return;

    // query collection
    const collection = $('h1.page-title').html();
    // query tr and resource button#id
    const tr = target.closest('tr');
    const id = tr.find('button').attr('id');

    // toggle progress cursor and masking div on
    $('#mask').toggle();

    // if tr has classname 'pin' then remove-pin
    if (tr.hasClass('pin')) {
      $.ajax({
        url: `${API_URL}/api/resource/remove-pin/${collection}/${id}`,
        type: 'PUT',
        dataType: 'json',
        success: resource => {
          // if no result, handle errors / provide feedback
          if (!resource) return handleErrors('Could not unpin resource.');

          // query tr without pin class and
          const notPinned = tr.closest('tbody').children(':not(.pin)');
          // iterate to find placement of tr
          notPinned.each(function() {
            if (tr.data('createdat') > $(this).data('createdat')) {
              // insert tr before the current table row because it was created later than current table row, but before others above it
              tr.removeClass('pin').insertBefore($(this));
              return false;

              // last table row
            } else {
              tr.removeClass('pin').insertAfter($(this));
            }
          });
        },
        error: (jqXHR, textStatus, errorThrown) => {
          // log error
          console.log('Onload error:', jqXHR, textStatus, errorThrown);
          // handle error
          handleErrors('Sorry, an error has occurred.');
        },
        complete: () => {
          // toggle progress cursor and masking div off
          $('#mask').toggle();
        }
      });

      // otherwise add-pin
    } else {
      $.ajax({
        url: `${API_URL}/api/resource/add-pin/${collection}/${id}`,
        type: 'PUT',
        dataType: 'json',
        success: resource => {
          // if no result, handle errors / provide feedback
          if (!resource) return handleErrors('Could not pin resource.');

          // move tr (will be moved, not cloned)
          const pins = tr.closest('tbody').children('.pin');
          if (pins.length) {
            tr.addClass('pin').insertAfter(pins);
          } else {
            tr.closest('tbody').prepend(tr.addClass('pin'));
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          // log error
          console.log('Onload error:', jqXHR, textStatus, errorThrown);
          // handle error
          handleErrors('Sorry, an error has occurred.');
        },
        complete: () => {
          // toggle progress cursor and masking div off
          $('#mask').toggle();
        }
      });
    }
  });

  // #error-feedback event listener (at top of page)
  $('#error-feedback').on('click', e => {
    $(e.target).closest('#error-feedback').css('display', 'none');
  });
});
