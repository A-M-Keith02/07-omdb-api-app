// Beginner-friendly script to load NASA APOD images for a date range.
// Replace 'DEMO_KEY' with your API key from https://api.nasa.gov/
console.log('script.js loaded'); // debug: confirm script executed

document.addEventListener('DOMContentLoaded', () => {
  // Query DOM after it's ready to avoid null references
  const getImagesButton = document.getElementById('getImages');
  const gallery = document.getElementById('gallery');

  console.log('DOM ready. Found button:', !!getImagesButton, 'Found gallery:', !!gallery);

  // Helpful console warnings if elements are missing
  if (!gallery) {
    console.warn('Element with id="gallery" not found. Check index.html.');
  }
  if (!getImagesButton) {
    console.warn('Button with id="getImages" not found. Check index.html.');
  }

  // Attach listener only when both elements exist
  if (getImagesButton && gallery) {
    console.log('Attaching click listener to #getImages'); // debug
    // Use async/await for clarity; avoid try/catch per project guidance.
    getImagesButton.addEventListener('click', async () => {
      console.log('Get Space Images clicked'); // debug: confirm click reached handler

      // Read date values from the inputs
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;

      // Basic validation for beginners
      if (!startDate || !endDate) {
        alert('Please select both start and end dates.');
        return;
      }
      if (new Date(startDate) > new Date(endDate)) {
        alert('Start date must be before or equal to end date.');
        return;
      }

      // Show loading message while fetching
      gallery.innerHTML = '<p>Loading space images...</p>';

      // Build request URL using template literals
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

      // Fetch and handle network errors using .catch (no try/catch)
      const response = await fetch(url).catch((err) => {
        console.error('Network error:', err);
        gallery.innerHTML = '<p>Failed to load data. Check your network and try again.</p>';
        return null;
      });

      // Stop if fetch failed
      if (!response) return;

      // Handle non-OK HTTP responses
      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        gallery.innerHTML = '<p>Failed to load data. Try again later.</p>';
        return;
      }

      // Parse JSON and handle parse errors via .catch
      const data = await response.json().catch((err) => {
        console.error('Failed to parse JSON:', err);
        gallery.innerHTML = '<p>Failed to parse response. Try again later.</p>';
        return null;
      });

      if (!data) return;

      // Normalize API response to an array (API may return an object for single date)
      const items = Array.isArray(data) ? data : [data];

      // Sort items by date ascending
      const sortedData = items.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Render gallery items (simple templates for beginners)
      gallery.innerHTML = sortedData
        .map((item) => {
          const media =
            item.media_type === 'image'
              ? `<img src="${item.url}" alt="${item.title}" />`
              : `<iframe width="100%" height="200" src="${item.url}" title="${item.title}" allow="encrypted-media; autoplay; fullscreen"></iframe>`;

          return `
            <div class="card">
              ${media}
              <div class="card-content">
                <h3>${item.title}</h3>
                <p>${new Date(item.date).toDateString()}</p>
              </div>
            </div>
          `;
        })
        .join('');
    });
  }
});
