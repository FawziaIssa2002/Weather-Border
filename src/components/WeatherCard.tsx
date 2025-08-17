import { useEffect, useState } from "react";
import cloud from '../assets/cloud.svg';
const weatherIcons = {
  0: { text: "صحو"},
  1: { text: "غائم جزئيًا"  },
  2: { text: "غائم", icon: cloud },
  3: { text: "مطر خفيف" },
  45: { text: "ضباب" },
  48: { text: "ضباب كثيف" },
  51: { text: "رذاذ خفيف" },
  61: { text: "مطر"},
  71: { text: "ثلوج" },
  95: { text: "عاصفة رعدية"},
};

function WeatherCard({ data }) {
  // const [colors, setColors] = useState("primary:#121331,secondary:#08a88a");
  const info = weatherIcons[data.code] || { text: "غير معروف", icon: "https://cdn.lordicon.com/slduhdil.json" };

  // تغيير اللون حسب درجة الحرارة
  useEffect(() => {
    const temp = data.temp;
    let primary = "#121331";
    let secondary = "#08a88a";

    if (temp >= 30) {
      primary = "#f59e0b"; // أصفر / حار
      secondary = "#fbbf24";
    } else if (temp <= 10) {
      primary = "#3b82f6"; // أزرق / بارد
      secondary = "#60a5fa";
    }

    // تغيير الألوان حسب الوضع الليلي
    // if (isDark) {
    //   primary = "#fcd34d";
    //   secondary = "#f97316";
    // }

    setColors(`primary:${primary},secondary:${secondary}`);
  }, [data.temp, isDark]);

  return (
    <div className=''>
      <h2 className="">
        الإحداثيات: {parseFloat(data.lat).toFixed(2)}, {parseFloat(data.lon).toFixed(2)}
      </h2>
      <div className="">
        {/* <lord-icon
          src={info.icon}
          trigger="loop"
          colors={colors}
          style={{ width: "100px", height: "100px" }}
        ></lord-icon> */}
          {/* {Object.values(weatherIcons).map((iconItem, index) => (
    <img
      key={index}
      src={iconItem.icon}
      trigger="loop"
      colors="primary:#121331,secondary:#08a88a"
      style={{ width: "100px", height: "100px" }}
    />
  ))} */}
      {info.icon != null && (
        <img
          src={info.icon}
          style={{ width: "100px", height: "100px" }}
        />
      )}

        
      </div>
      <p className=""> °Cدرجة الحرارة :{Math.round(data.temp)}</p>
      <p className=""> الجو:{info.text}</p>
      <p className="">الرياح: {data.wind} كم/س</p>
      <p className="">التوقيت: {data.time}</p>
    </div>
  );
}

export default WeatherCard;
