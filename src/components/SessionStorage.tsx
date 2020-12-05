import { isBrowser } from "./Util";

function setToken(token: string): void {
  if (!isBrowser) return;
  sessionStorage.setItem("token", token);
  // console.log(`token: ${token}`);
}

function getToken(): string | null {
  if (!isBrowser) return null;
  const token = sessionStorage.getItem("token");
  // console.log(`token: ${token}`);
  return token;
}

function setUser(user: string): void {
  if (!isBrowser) return;
  sessionStorage.setItem("user", user);
  // console.log(`user: ${user}`);
}

function getUser(): string | null {
  if (!isBrowser) return null;
  const user = sessionStorage.getItem("user");
  // console.log(`user: ${user}`);
  return user;
}

function setRepos(repos: string): void {
  if (!isBrowser) return;
  sessionStorage.setItem("repos", repos);
  // console.log(`repos: ${repos}`);
}

function getRepos(): string | null {
  if (!isBrowser) return null;
  const repos = sessionStorage.getItem("repos");
  // console.log(`repos: ${repos}`);
  return repos;
}

function setLastRepo(lastRepo: string): void {
  if (!isBrowser) return;
  sessionStorage.setItem("lastRepo", lastRepo);
  // console.log(`lastRepo: ${lastRepo}`);
}

function getLastRepo(): string | null {
  if (!isBrowser) return null;
  const repo = sessionStorage.getItem("lastRepo");
  // console.log(`lastRepo: ${repo}`);
  return repo;
}

function setLastCommit(lastCommit: string): void {
  if (!isBrowser) return;
  sessionStorage.setItem("lastCommit", lastCommit);
  // console.log(`lastCommit: ${lastRepo}`);
}

function getLastCommit(): string | null {
  if (!isBrowser) return null;
  const repo = sessionStorage.getItem("lastCommit");
  // console.log(`lastCommit: ${repo}`);
  return repo;
}

function clear() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("repos");
  // sessionStorage.removeItem("lastRepo");
  // sessionStorage.removeItem("lastCommit");
}

export default {
  setToken,
  getToken,
  setUser,
  getUser,
  setRepos,
  getRepos,
  setLastRepo,
  getLastRepo,
  setLastCommit,
  getLastCommit,
  clear,
};
