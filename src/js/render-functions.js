function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
  <a class="photo-card" href="${largeImageURL}" alt="${tags}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="value">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="value">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="value">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="value">${downloads}</span>
    </p>
  </div>
</a>`
    )
    .join('');
}

export { createMarkup };
