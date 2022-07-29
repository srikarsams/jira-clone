export function get(url: string) {
  return fetch(url).then((res) => res.json());
}

export function post(url: string, body: string) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).then((res) => res.json());
}
