$('#update-password').on('keydown', function(e) {
  if (e.key === 'Enter') {
    localStorage.setItem('password', DOMPurify.sanitize(e.target.value));
    e.target.value = '';
    $(this).blur();
  }
});
