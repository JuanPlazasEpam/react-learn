export function addMovie(movie) {
  return fetch("https://your-api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie)
  }).then((res) => res.json());
}
