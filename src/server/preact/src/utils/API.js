export const apiURL = "http://192.168.50.140:34567";

export function get(url) {
  return fetch(`${apiURL}${url}`).then((response) => response.json());
}

export function post(url, data) {
  return fetch(`${apiURL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.headers.get("Content-Type") === "application/json") {
      return response.json();
    }
  });
}