const button = document.querySelector('button');
const rabbit = document.getElementById('rabbit');

button.addEventListener('click', (e) => {
  console.log('click');
  rabbit.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

rabbit.addEventListener('click', () => {
  button.scrollIntoView({ behavior: 'smooth' });
});
