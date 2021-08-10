const searchResolution = document.getElementById('searchResolution');
const queueResolution = document.getElementById('queueResolution');
const url = 'http://localhost:3000';

searchResolution.addEventListener('keyup', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const name = searchResolution.value.trim();
    const response = await fetch(`${url}/resolution/${name}/show`);
    const resolution = await response.json();
    queueResolution.value = resolution;
  }
});
