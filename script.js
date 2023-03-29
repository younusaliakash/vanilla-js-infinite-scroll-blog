const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5
let page = 1

//Get posts from API
async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

  const data = await res.json();
  return data;
}


//show posts in the DOM
async function showPost() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add("post");
    postElement.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">
      ${post.body}
      </p>
    `

    postsContainer.appendChild(postElement)
  })
}

//show loading 
function showLoading() {
  loading.classList.add('show')

  setTimeout(() => {
    loading.classList.remove('show')

    setTimeout(() => {
      page++;
      showPost();
    }, 300);
  }, 1000)
}

showPost()


window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight -5) {
    showLoading()
  }
})


// // Filter posts by input
function filterPosts (e) {
  const searchTerm  = e.target.value.toUpperCase()
  const posts = document.querySelectorAll('.post')
  
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase()
    const body = post.querySelector('.post-body').innerText.toUpperCase()

    if(title.indexOf(searchTerm) > -1 || body.indexOf(searchTerm) > -1 ) {
      post.style.display  = 'flex'
    } else {
      post.style.display  = 'none'
    }
  })
}

filter.addEventListener('input', filterPosts);