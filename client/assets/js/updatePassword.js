$('#updatePassword').on('keydown', e => {
  if (e.key === 'Enter') {
    localStorage.setItem('password', DOMPurify.sanitize(e.target.value));
    e.target.value = '';
  }
});
