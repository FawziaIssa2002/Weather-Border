import {  useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar.js";
import WeatherCard from "./components/WeatherCard.js";
import './App.css'

function App() {
  interface Weather {
  temp: number;
  wind: number;
  code: number;
  time: string;
  lat: number;
  lon: number;
}

const [weather, setWeather] = useState<Weather | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const fetchWeatherByCoords = async (lat: number, lon: number, city: string = "موقعي الحالي") => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      setWeather({
        temp: response.data.current_weather.temperature,
        wind: response.data.current_weather.windspeed,
        code: response.data.current_weather.weathercode,
        time: response.data.current_weather.time,
        lat,
        lon,
        city
      });

    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات الطقس");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // جلب الطقس باسم المدينة
  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
      );
      if (geoResponse.data.length === 0) {
        setError("لم يتم العثور على المدينة");
        return;
      }
      const { lat, lon } = geoResponse.data[0];
      await fetchWeatherByCoords(Number(lat), Number(lon), city);
    } catch (err) {
      setError("تعذر جلب الإحداثيات");
    } finally {
      setLoading(false);
    }
  };

  // جلب الطقس حسب الموقع الحالي
  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          setError("لم يتم السماح بالوصول إلى الموقع");
        }
      );
    } else {
      setError("المتصفح لا يدعم تحديد الموقع");
    }
  };

  return (
    <div className={'app-container '}>
      <div className="header">
        {/* <button
          onClick={() => setIsDark(!isDark)}
          className="theme-toggle"
        >
          {isDark ? "☀️ نهاري" : "🌙 ليلي"}
        </button> */}
        <h1 className="app-title">تطبيق الطقس</h1>
      </div>

      <SearchBar
        onSearch={fetchWeatherByCity}
        onLocation={fetchWeatherByLocation}
      />

      <div className="weather-content">
        {loading && <p className="loading-text">جارٍ جلب البيانات...</p>}
        {error && <p className="error-text">{error}</p>}
        {weather && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}

export default App;
