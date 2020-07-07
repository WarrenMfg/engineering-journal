$(function() {
  // query heading
  const collection = $('h1.page-title').html();

  // API URL
  const url = `http://localhost:50000/api/resources/${collection}`;

  // AJAX
  $.ajax({
    url,
    type: 'GET',
    dataType: 'json',
    success: resources => {
      // if no results, handle errors / provide feedback
      if (!resources.length) return handleErrors('No resouces yet.');

      // update results state
      populateDOM(resources);
    },
    error: (xhr, errorType, exception) => {
      // log error
      console.log('Onload error:', xhr, errorType, exception);
      // handle error
      handleErrors('Sorry, an error has occurred.');
    }
  });

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

  const populateDOM = resources => {
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

    // make table row
    resources.forEach(resource => {
      tbody.append(
        `<tr>
          <td>${resource.description}</td>
          <td>${resource.keywords.join(', ')}</td>
          <td><a href="${resource.link}">${getDomain(resource.link)}</a></td>
          <td class="d-flex justify-content-center align-items-center"><button class="btn btn-outline-primary btn-sm" type="button">Edit</button></td>
        </tr>`
      );
    });
  };
});

/*

*/
