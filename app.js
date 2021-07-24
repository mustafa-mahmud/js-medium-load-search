'use strict';

const loader = document.querySelector('.loader');
const postsContainer = document.querySelector('#posts-container');
const filter = document.getElementById('filter');

const limit = 5;
let page = 1;

const fetchData = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const datas = await res.json();

  displayUI(datas);
};

const displayUI = (datas) => {
  page++;

  datas.forEach((data) => {
    const div = document.createElement('div');
    div.classList.add('post');
    div.innerHTML = `
		<div class="number">${data.id}</div>
		<div class="post-info">
			<h2 class="post-title">${data.title}</h2>
			<p class="post-body">${data.body}</p>
		</div>
		`;

    postsContainer.appendChild(div);
  });

  window.addEventListener('scroll', scrollEffect);
};

const scrollEffect = () => {
  const bodyHeight = document.body.scrollHeight - 10;
  const windowScroll = window.innerHeight + window.scrollY;

  if (windowScroll > bodyHeight) {
    window.removeEventListener('scroll', scrollEffect);
    loader.classList.add('show');
    setTimeout(() => {
      loader.classList.remove('show');
      fetchData();
    }, 3000);
  }
};

const filterData = (e) => {
  const titles = postsContainer.querySelectorAll('.post-title');
  const value = filter.value;

  titles.forEach((title) => {
    if (title.textContent.trim().includes(value.trim())) {
      title.closest('.post').style.display = 'flex';
    } else {
      title.closest('.post').style.display = 'none';
    }
  });
};

///////////////////////////
fetchData();

window.addEventListener('scroll', scrollEffect);
filter.addEventListener('input', filterData);
