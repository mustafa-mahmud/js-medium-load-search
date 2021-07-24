'use strict';

const loader = document.querySelector('.loader');

const limit = 5;
const page = 1;

const fetchData = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const datas = await res.json();

  displayUI(datas);
};

const displayUI = (datas) => {};

///////////////////////////
fetchData();

window.addEventListener('scroll', function () {
  const bodyHeight = document.body.clientHeight - 50;
  const windowScroll = window.innerHeight + window.scrollY;

  if (windowScroll > bodyHeight) {
    loader.classList.add('show');

    /* setTimeout(() => {
			loader.classList.remove('show');
		}, 500); */
  } else loader.classList.remove('show');
});
