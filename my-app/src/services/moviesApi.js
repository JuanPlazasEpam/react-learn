export function addMovie(movie) {
  return fetch("http://localhost:4000", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie)
  }).then((res) => res.json());
}
