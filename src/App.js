import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setDots((prev) => (prev.length === 3 ? "" : prev + "."));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const fetchWeather = async () => {
    if (!city) return;

    setIsLoading(true);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a9c54fb7b1444bd8af4124452250809&q=${city}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await res.json();
      setWeather({
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        condition: data.current.condition.text,
        wind: data.current.wind_kph,
      });
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
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
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search_btn" onClick={fetchWeather}>
            Search
          </button>
        </div>

        {isLoading && <p>Loading data{dots}</p>}

        {!isLoading && weather && (
          <div className="weather-cards">
            <div className="weather-card">🌡 Temp: {weather.temp}°C</div>
            <div className="weather-card">💧 Humidity: {weather.humidity}%</div>
            <div className="weather-card">🌥 Condition: {weather.condition}</div>
            <div className="weather-card">💨 Wind: {weather.wind} kph</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
