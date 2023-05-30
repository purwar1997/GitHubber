import { redirect } from 'react-router-dom';

async function delay() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

export async function getUser(githubId) {
  try {
    await delay();

    let res = await fetch(`https://api.github.com/users/${githubId}`);
    const user = await res.json();

    res = await fetch(`https://api.github.com/users/${githubId}/repos?per_page=100&sort=pushed`);
    const repos = await res.json();

    return { user, repos };
  } catch (err) {
    throw new Error(err.message || 'Error fetching user details');
  }
}

export async function authRequired() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user) {
    throw redirect('/login');
  }
}
