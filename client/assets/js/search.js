const searchModal = () => {
  // query search modal
  const modal = $('.modal.search');
  // query search input
  const search = $('#modal-search');
  // query site input
  const site = $('#modal-site');
  // query radio inputs
  const radioInputs = $('.form-check-input');

  // query search button
  const searchButton = $('#search');

  // add event listener on click to show search modal
  searchButton.on('click', () => {
    // freeze scroll
    const scrollY = window.scrollY;
    $('body').addClass('freeze').css('top', `-${scrollY}px`);

    // show search modal
    modal.toggle().addClass('show');

    // clear inputs
    search.val('');
    site.val('');
    radioInputs.each((i, el) => {
      el.checked = false;
    });

    // focus on first input
    modal.find('.form-control').first().focus();
  });

  // callback to close modal; used below
  const closeModal = () => {
    // clear inputs
    search.val('');
    site.val('');
    // hide search modal
    modal.toggle().removeClass('show');

    // unfreeze body
    unfreezeBody();
  };

  // toggle search modal on escape
  modal.on('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // toggle search modal when click outside of search modal
  modal.on('mousedown', e => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  });

  // add event listener to search modal close button
  modal.find('button.close').on('click', closeModal);

  // add event listener to search modal cancel button
  modal.find('.modal-footer button').on('click', closeModal);

  // add event listener to site input
  site.on('keyup', e => {
    radioInputs.each((i, el) => {
      if (e.target.value === el.value) el.checked = true;
      else el.checked = false;
    });
  });

  // add event listeners to radio buttons
  radioInputs.closest('.radios').on('click', 'input', e => {
    site.val(e.target.value);
  });

  // add event listener to submit
  modal.find('button[type=submit]').on('click', e => {
    // prevent default form behavior
    e.preventDefault();

    // get search and site inputs
    const validatedSearchInputs = validateSearchInputs(search.val().trim(), site.val().trim());
    // return if errors
    if (!validatedSearchInputs) return;

    // hide search modal
    modal.toggle().removeClass('show');

    // unfreeze body
    unfreezeBody();

    // open new tab
    window.open(
      `https://duckduckgo.com/?q=site:${validatedSearchInputs.validSite} ${validatedSearchInputs.validSearch}`,
      '_blank'
    );
  });
};
