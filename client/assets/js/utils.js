// DOMPurify
DOMPurify.setConfig({ ALLOWED_TAGS: [] });

// API URL
const API_URL = 'http://localhost:50000';

// handle errors
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

// validate inputs
const validateInputs = (description, keywords, link) => {
  // validate description
  const validDescription = DOMPurify.sanitize(description);
  if (!validDescription) {
    handleErrors('Please include a valid description.');
    return;
  }

  // validate keywords and make array
  let validKeywords = DOMPurify.sanitize(keywords);
  if (!validKeywords) {
    handleErrors('Please include valid keywords.');
    return;
  }

  validKeywords = validKeywords.split(',').reduce((arr, keyword) => {
    if (keyword) arr.push(keyword);
    return arr;
  }, []);

  // validate link
  const validLink = DOMPurify.sanitize(link);
  if (!validator.isURL(validLink)) {
    handleErrors('Please inlcude a valid link.');
    return;
  }

  // return validatedInputs
  return {
    description: validDescription,
    keywords: validKeywords,
    link: validLink,
    createdAt: Date.now()
  };
};

// get host from link
const getHost = link => {
  // split host
  let host = link.split('//')[1].split('/')[0];

  // if still contains 'www', then remove; return result either way
  if (/^www./.test(host)) {
    return host.split('www.')[1];
  } else {
    return host;
  }
};
