import {  useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar.js";
import WeatherCard from "./components/WeatherCard.js";
import './App.css'

function App() {
  const [weather, setWeather] = useState<{ temp: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  // تغيير كلاس الـ body حسب الوضع
  // useEffect(() => {
  //   if (isDark) {
  //     document.body.classList.add("dark-mode-body");
  //     document.body.classList.remove("light-mode-body");
  //   } else {
  //     document.body.classList.add("light-mode-body");
  //     document.body.classList.remove("dark-mode-body");
  //   }
  // }, [isDark]);

  // جلب الطقس بالإحداثيات
  
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
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
        lon
      });
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات الطقس");
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
      await fetchWeatherByCoords(lat, lon);
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
    <div className={`app-container ${isDark ? "dark-mode" : "light-mode"}`}>
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
        isDark={isDark}
      />

      <div className="weather-content">
        {loading && <p className="loading-text">جارٍ جلب البيانات...</p>}
        {error && <p className="error-text">{error}</p>}
        {weather && <WeatherCard data={weather} isDark={isDark} />}
      </div>
    </div>
  );
}

export default App;
