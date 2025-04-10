export const apiURL = "http://localhost:34567/api";

export function get(url, callback = undefined) {
  const response = fetch(`${apiURL}${url}`).then((response) => response.json());
  if (!callback) return response;
  return response.then(callback);
}

export function post(url, data, callback = undefined) {
  const response = fetch(`${apiURL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.headers.get("Content-Type") === "application/json") return response.json();
    else if (response.headers.get("Content-Type") === "text/plain") return response.text();
    else return response;
  });

  if (!callback) return response;
  return response.then(callback);
}

export default {
  url: apiURL,
  get,
  post,
}