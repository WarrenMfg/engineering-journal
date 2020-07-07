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
      // if no results, handle errors
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

    innerFlexContainer.append(para);
    outerContainer.slideDown('slow', () => {
      setTimeout(() => {
        outerContainer.slideUp('slow', () => {
          innerFlexContainer.empty();
        });
      }, 2000);
    });

    // toggle error class
    // const $userInput = $('#userInput');
    // $userInput.toggleClass('userInputError');

    // provide feedback
    // setUserInput(feedback);
    // $userInput.blur();

    // reset input
    // setTimeout(() => {
    //   $userInput.toggleClass('userInputError');
    //   setUserInput('');
    //   $userInput.focus();
    // }, 2000);
  };

  const populateDOM = resources => {
    // query tbody
    const tbody = $('tbody');

    // get domain from link
    const getDomain = link => {
      let domain = link.split('//')[1].split('/')[0];
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
          <td class="d-flex justify-content-center align-items-center"><button class="btn btn-outline-primary btn-sm" type="button" style="width: 75px;">Edit</button></td>
        </tr>`
      );
    });
  };
});

/*

*/
