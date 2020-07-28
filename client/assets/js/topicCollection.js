function topicCollection() {
  const collection = getURLcollection();
  const topic = DOMPurify.sanitize(collection);

  $('title').text(`Engineering Journal | ${topic}`);
  $('meta[property="og:title"]').attr('content', `Engineering Journal | ${topic}`);
  $('meta[name="twitter:title"]').attr('content', `Engineering Journal | ${topic}`);
  $('h1.page-title').text(topic);
}

topicCollection();
