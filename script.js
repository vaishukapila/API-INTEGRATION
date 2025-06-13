const weatherApiKey = "apikey";//add api key
const newsApiKey = "apikey"; //add api key

// Fetch weather data
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("weatherResult").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

// Fetch news
async function getNews() {
  const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=5&token=${newsApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles.length === 0) {
      document.getElementById("newsResult").innerHTML = "<p>No news found.</p>";
      return;
    }

    document.getElementById("newsResult").innerHTML = data.articles.map(article => `
      <div class="news-card">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `).join('');
  } catch (error) {
    document.getElementById("newsResult").innerHTML = `<p style="color:red;">Failed to load news.</p>`;
  }
}
