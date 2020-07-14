const topicCollection = localStorage.getItem('topic');
$('title').text(`Engineering Journal | ${topicCollection}`);
$('meta[property="og:title"]').attr('content', `Engineering Journal | ${topicCollection}`);
$('meta[name="twitter:title"]').attr('content', `Engineering Journal | ${topicCollection}`);
$('h1.page-title').text(topicCollection);
