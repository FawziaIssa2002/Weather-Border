import cloud from '../assets/cloud.svg';
import sun from '../assets/Sun.png';
import rain from '../assets/Rain.png';
import windy from '../assets/windy.png';
// const weatherIcons: Record< WeatherInfo> = {
//   0: { text: "صحو" , icon: sun },
//   1: { text: "غائم جزئيًا" , icon: cloud  },
//   2: { text: "غائم", icon: cloud },
//   3: { text: "مطر خفيف" , icon: rain  },
//   45: { text: "ضباب" },
//   48: { text: "ضباب كثيف" },
//   51: { text: "رذاذ خفيف" },
//   61: { text: "مطر" , icon: rain },
//   71: { text: "ثلوج" },
//   95: { text: "عاصفة رعدية" , icon: windy },
// };
const weatherIcons: Record<number, { text: string; icon?: string }> = {
  0: { text: "صحو", icon: sun },
  1: { text: "غائم جزئيًا", icon: cloud },
  2: { text: "غائم", icon: cloud },
  3: { text: "مطر خفيف", icon: rain },
  45: { text: "ضباب" },
  48: { text: "ضباب كثيف" },
  51: { text: "رذاذ خفيف" },
  61: { text: "مطر", icon: rain },
  71: { text: "ثلوج" },
  95: { text: "عاصفة رعدية", icon: windy },
};

interface Weather {
  temp: number;
  wind: number;
  code: number;
  time: string;
  lat: number;
  lon: number;
}

interface WeatherCardProps {
  data: Weather;
}

function WeatherCard({ data }: WeatherCardProps) {

const info = weatherIcons[data.code as keyof typeof weatherIcons] || { text: "غير معروف", icon: "https://cdn.lordicon.com/slduhdil.json" };

  return (
    <div className=''>
      <h2 className="">
    الإحداثيات: {data.lat.toFixed(2)}, {data.lon.toFixed(2)}
        {/* الإحداثيات: {parseFloat(data.lat).toFixed(2)}, {parseFloat(data.lon).toFixed(2)} */}
      </h2>
      <div className="">
        

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
