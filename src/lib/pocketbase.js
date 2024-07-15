import PocketBase from "pocketbase";

//const backend_api_url = "http://localhost:8080";
const backend_api_url = `${import.meta.env.VITE_BACKEND_API_URL}`;
export const pbClient = new PocketBase(backend_api_url);
pbClient.autoCancellation(false);

export async function getTasks() {
  return await pbClient.collection("tasks")
    .getFullList();
}

export async function createTask(title, description) {
  const data = {
    "title": title,
    "description": description,
    "user": pbClient.authStore.model.id};
  await pbClient.collection("tasks").create(data);
}

export async function deleteTask(id) {
  let confirm = window.confirm("Are you sure you want to delete this task?");
  if (confirm) {
    await pbClient.collection("tasks").delete(id);
    window.location.reload();
  }  
}

export async function updateTask(id, title, description) {
  const data = {
    "title": title,
    "description": description,
    "user": pbClient.authStore.model.id};
  await pbClient.collection("tasks").update(id, data);
}

export async function toggleTask(id) {
  const task = await pbClient.collection("tasks").getOne(id)
  console.log(task);
  const data = {
    "title": task.title,
    "description": task.description,
    "completed":!task.completed,
    "user": pbClient.authStore.model.id};
  await pbClient.collection("tasks").update(id, data);
}

export async function getTaskById(id) {
  return await pbClient.collection("tasks").getOne(id);
}

export const isUserValid = pbClient.authStore.isValid;

export async function login(username, password) {
  await pbClient.collection("users").authWithPassword(username, password);
  window.location.reload();
}

export function signout() {  
  pbClient.authStore.clear();
  window.location.reload();
}

export async function signup(username, password) {
  const userData = {
    "username": username,
    "password": password,
    "passwordConfirm": password
  };
  console.log(userData);
  //TODO. Add a confirm password field.
  await pbClient.collection("users").create(userData);
}