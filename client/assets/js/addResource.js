DOMPurify.setConfig({ ALLOWED_TAGS: [] });

const addResource = e => {
  e.preventDefault();
  // query inputs
  const description = $('#description');
  const keywords = $('#keywords');
  const link = $('#link');
  // query collection
  const collection = $('h1.page-title').html();

  const validatedInputs = validateInputs(description.val().trim(), keywords.val().trim(), link.val().trim());

  if (!validatedInputs) return;

  // AJAX
  $.ajax({
    url: `${API_URL}/api/resource/${collection}`,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(validatedInputs),
    dataType: 'json',
    success: resource => {
      // update table with new resource
      populateDOM(resource);
    },
    error: (xhr, errorType, exception) => {
      // log error
      console.log('Onload error:', xhr, errorType, exception);
      // handle error
      handleErrors('Sorry, an error has occurred.');
    },
    complete: () => {
      // reset inputs
      description.val('');
      keywords.val('');
      link.val('');
    }
  });
};

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

const populateDOM = resource => {
  // query tbody
  const tbody = $('tbody');

  // get domain from link
  const getDomain = link => {
    // split domain
    let domain = link.split('//')[1].split('/')[0];

    // if still contains 'www', then remove; return result either way
    if (/^www./.test(domain)) {
      return domain.split('www.')[1];
    } else {
      return domain;
    }
  };

  tbody.prepend(
    `<tr>
      <td>${resource.description}</td>
      <td>${resource.keywords.join(', ')}</td>
      <td><a href="${resource.link}">${getDomain(resource.link)}</a></td>
      <td class="d-flex justify-content-center align-items-center"><button class="btn btn-outline-primary btn-sm" type="button">Edit</button></td>
    </tr>`
  );
};
