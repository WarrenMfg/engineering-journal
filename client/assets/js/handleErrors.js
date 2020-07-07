const handleErrors = feedback => {
  const para = `<p>${feedback}</p>`;
  const outerContainer = $('#error-feedback');
  const innerFlexContainer = $('#error-feedback-flex');

  // append feedback to flexbox
  innerFlexContainer.append(para);
  // display feedback
  outerContainer.slideDown('slow', () => {
    // after 2 seconds, hide feedback
    setTimeout(() => {
      outerContainer.slideUp('slow', () => {
        // remove feedback from DOM
        innerFlexContainer.empty();
      });
    }, 2000);
  });
};
