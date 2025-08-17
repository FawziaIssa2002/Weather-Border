// import { useState } from "react";
// import shearch from "../assets/search.svg"
// function SearchBar({ onSearch, onLocation , isDark}) {
//   const [city, setCity] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (city.trim()) {
//       onSearch(city);
//       setCity("");
//     }
//   };

//   return (
//     <div className="SearchB">
//       <form onSubmit={handleSubmit} className="">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="أدخل اسم المدينة"
//           className="p-2 rounded text-black"
//         />
//         <button type="submit" className="imageSearch">
//           <img 
//             src={shearch} 
//             alt="بحث" 
//             className={isDark ? "dark-icon" : "light-icon"} 
//           />
//         </button>
//       </form>
//       <button
//         onClick={onLocation}
//         className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
//       >
//         استخدام موقعي الحالي
//       </button>
//     </div>
//   );
// }

// export default SearchBar;
import { useState } from "react";
import shearch from "../assets/search.svg";

function SearchBar({ onSearch, onLocation,  }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className={'search-container'}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="أدخل اسم المدينة"
          className="search-input"
        />
        <button type="submit" className="search-button">
          <img 
            src={shearch} 
            alt="بحث" 
            className="search-icon" 
          />
        </button>
      </form>
      <button
        onClick={onLocation}
        className="location-button"
      >
        استخدام موقعي الحالي
      </button>
    </div>
  );
}

export default SearchBar;