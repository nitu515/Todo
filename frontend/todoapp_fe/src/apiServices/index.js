export async function userRegister(payload) {
  const response = await fetch(`http://127.0.0.1:8000/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function userLogin(payload) {
  const response = await fetch(`http://127.0.0.1:8000/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function userLogout() {
  const response = await fetch(`http://127.0.0.1:8000/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function fetchTodoList() {
  const response = await fetch("http://127.0.0.1:8000/todo/");
  return response.json();
}

export async function addTodoTask(payload) {
  const response = await fetch(`http://127.0.0.1:8000/todo/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function fetchTodoListById(id) {
  const response = await fetch(`http://127.0.0.1:8000/todo/${id}`);
  return response.json();
}

export async function updateTodoTask(payload) {
  const response = await fetch(`http://127.0.0.1:8000/todo/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function deleteTodoTask(id) {
  const response = await fetch(`http://127.0.0.1:8000/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 204) {
    return { id };
  }

  const responseData = await response.json();
  return responseData;
}
