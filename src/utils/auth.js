const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.what2wear.ignorelist.com"
    : "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function userRegistration({ email, password, name, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then(checkResponse)
    .catch((err) => console.error("Error registering", err));
}

function userLogin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

function checkTokenValidity(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { userLogin, userRegistration, checkTokenValidity };
