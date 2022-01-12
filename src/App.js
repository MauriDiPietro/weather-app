import React, {useState} from 'react';
import dotenv from 'dotenv';
dotenv.config()

function App() {



const [query, setQuery] = useState('');
const [weather, setWeather] = useState({});

const search = evt => {
  if (evt.key === 'Enter') {
    // fetch(`${process.env.BASE_URL}weather?q=${query}&units=metric&APPID=${process.env.API_KEY}`)
    console.log(process.env)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=46ba30b2dba7e946eb7f503bd6e763a8`)
    .then(res => res.json())
    .then(result =>{
      setWeather(result)
       setQuery('') 
       console.log(result)
      })
  }
}

  const dateBuilder = (d) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app-warm' : 'app') : 'app'}>
     <main>
       <div className='search-box'>
         <input 
            type='text'
            className='search-bar'
            placeholder='Search city...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
         />
       </div>
       {
       (typeof weather.main != 'undefined') ? (
      <div>
         <div className='location-box'>
         <div className='location'>
           {weather.name}, {weather.sys.country} 
         </div>
         <div className='date'>{dateBuilder(new Date())}</div>
       </div>
       <div className='weather-box'>
         <div className='temp'>
           {Math.round(weather.main.temp)}ºC
         </div>
         <div className='weather'>
           {weather.weather[0].main}
         </div>
       </div>
      </div>
       ) : ('')
       }
     </main>
    </div>
  );
}

export default App;
