async function fetchImages(query, page) {
  const BASE_URL = 'pixabay.com/api/?';
  const API_KEY = 'key=25483716-618b2d780a36bac33dc71cf0e';
  const options = 'image_type=photo&orientation=horizontal&safesearch=true';
  const response = await fetch(
    `https://${BASE_URL}${API_KEY}&q=${query}&${options}&page=${page}&per_page=12`,
  );
  if (response.ok) {
    return await response.json();
  }
  return await Promise.reject(
    new Error(
      `No results were found matching your search for ${query} Try again!`,
    ),
  );
}

const ImagesAPI = {
  fetchImages,
};
export default ImagesAPI;
