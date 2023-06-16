import React, { useState, useEffect } from 'react';

function Layout({ children, setCurrentPath }) {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <button onClick={() => setCurrentPath('/')}>Home</button>
            </li>
            <li>
              <button onClick={() => setCurrentPath('/create')}>Create Post</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { title, body };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New post:', data);
      })
      .catch(error => console.error('Error:', error));

    setTitle('');
    setBody('');
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={event => setBody(event.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  let currentPage;
  if (currentPath === '/') {
    currentPage = <Home />;
  } else if (currentPath === '/create') {
    currentPage = <CreatePost />;
  }

  return (
    <Layout setCurrentPath={setCurrentPath}>
      {currentPage}
    </Layout>
  );
}

export default App;
