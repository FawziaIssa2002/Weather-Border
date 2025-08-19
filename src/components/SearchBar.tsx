import { useState } from "react";
import shearch from "../assets/search.svg";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocation: () => void;
}

function SearchBar({ onSearch, onLocation }: SearchBarProps) {
  const [city, setCity] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleCitySubmit = (cityName: string) => {
    onSearch(cityName);
    setHistory((prev) => {
      const updated = [cityName, ...prev.filter((c) => c !== cityName)];
      return updated.slice(0, 5);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      handleCitySubmit(city); // هنا نستدعي نفس الدالة
      setCity("");
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="أدخل اسم المدينة"
          className="search-input"
        />
        <button type="submit" className="search-button">
          <img src={shearch} alt="بحث" className="search-icon" />
        </button>
      </form>
      <button onClick={onLocation} className="location-button">
        استخدام موقعي الحالي
      </button>

      {/* قائمة آخر المدن */}
      {history.length > 0 && (
        <div className="search-history">
          <h4> : آخر عمليات البحث </h4>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <button
                  className="history-item"
                  onClick={() => handleCitySubmit(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
