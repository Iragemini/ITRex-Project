const searchResolution = document.getElementById('searchResolution');
const queueResolution = document.getElementById('queueResolution');
const url = 'http://localhost:3000';

searchResolution.addEventListener('keyup', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    queueResolution.value = '';
    const name = searchResolution.value.trim();
    const response = await fetch(`${url}/resolution/${name}/show`);
    if (!response.ok) {
      const error = await response.json();
      queueResolution.value = error.message;
      return;
    }
    queueResolution.value = await response.json();
  }
});
