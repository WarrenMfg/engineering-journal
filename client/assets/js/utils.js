// DOMPurify
DOMPurify.setConfig({ ALLOWED_TAGS: [] });

// API URL
const API_URL = 'http://localhost:50000';

// timeoutID
let timeoutID;
// handle errors
const handleErrors = feedback => {
  const para = `<p>${feedback}</p>`;
  const outerContainer = $('#error-feedback');
  const innerFlexContainer = $('#error-feedback-flex');

  // if outerContainer is visible, then replace feedback
  if (outerContainer.css('display') === 'block') {
    // clear timeout
    clearTimeout(timeoutID);

    // remove/stop animation
    outerContainer.stop(true, false);

    // replace feedback
    innerFlexContainer.find('p').text(feedback);

    // animate
    outerContainer.slideDown('slow');

    // set new timeout
    timeoutID = setTimeout(() => {
      outerContainer.slideUp('slow', () => {
        // remove feedback from DOM
        innerFlexContainer.empty();
      });
    }, 2000);

    // otherwise, if not visible, add feedback
  } else {
    // append feedback to flexbox
    innerFlexContainer.append(para);
    // display feedback
    outerContainer.slideDown('slow', () => {
      // after 2 seconds, hide feedback
      timeoutID = setTimeout(() => {
        outerContainer.slideUp('slow', () => {
          // remove feedback from DOM
          innerFlexContainer.empty();
        });
      }, 2000);
    });
  }
};

// validate resource inputs
const validateResourceInputs = (description, keywords, link) => {
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
    keyword = keyword.trim();
    if (keyword) arr.push(keyword);
    return arr;
  }, []);

  // validate link
  const validLink = DOMPurify.sanitize(link);
  if (!validator.isURL(validLink)) {
    handleErrors('Please include a valid link.');
    return;
  }

  // return validatedResourceInputs
  return {
    description: validDescription,
    keywords: validKeywords,
    link: validLink,
    createdAt: Date.now()
  };
};

const validateSearchInputs = (search, site) => {
  // validate search
  const validSearch = DOMPurify.sanitize(search);
  if (!validSearch) {
    handleErrors('Please include a valid search input.');
    return;
  }

  // validate site
  const validSite = DOMPurify.sanitize(site);
  if (!validSite) {
    handleErrors('Please include a valid site input.');
    return;
  }

  return {
    validSearch,
    validSite
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

const tableRow = (className = '', createdAt, description, keywords, link, _id) => `
  <tr class="${className}" data-createdat=${createdAt}>
    <td>${description}</td>
    <td>${keywords.join(', ')}</td>
    <td><a href="${link}" target="_blank">${getHost(link)}</a></td>
    <td><button class="btn btn-outline-primary btn-sm" type="button" id=${_id}>Edit</button></td>
  </tr>
`;

// unfreeze body
const unfreezeBody = () => {
  const body = $('body');
  const scrollY = body.css('top');
  body.css('top', '');
  body.removeClass('freeze');
  window.scrollTo(0, parseInt(scrollY) * -1);
};
