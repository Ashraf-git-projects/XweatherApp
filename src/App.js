import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a9c54fb7b1444bd8af4124452250809&q=${city}`
      );
      if (!res.ok) throw new Error("Invalid response");
      const data = await res.json();

      if (data.error) {
        setError("Failed to fetch weather data");
      } else {
        setWeather(data);
      }
    } catch {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <p>X-Weather-App</p>
      <div className="app_content">
        <div className="search_elements">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button className="search_btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}

        {weather && (
          <div className="weather-cards">
            <div className="weather-card">🌡 Temp: {weather.current.temp_c}°C</div>
            <div className="weather-card">💧 Humidity: {weather.current.humidity}%</div>
            <div className="weather-card">
              🌥 Condition: {weather.current.condition.text}
            </div>
            <div className="weather-card">💨 Wind: {weather.current.wind_kph} kph</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
