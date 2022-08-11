import { useEffect, useState } from "react"
import './App.css';
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
import Navbar from "./Navbar/Navbar";


function App() {
  const [place, setPlace] = useState("")
  const [placeInfo, setPlaceInfo] = useState([])

  const [show, setShow] =useState(false)
 
 

  useEffect(() => {
    handleFetch()

    
  }, [])

const handlerecent=()=>{
  // console.log(localStorage.getItem("city"))
localStorage.setItem("city",placeInfo.name);
localStorage.getItem("city") === "undefined" ?  setShow(false) :   setShow(true)

}
  const handleFetch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=10a8ad146b098afcd471a622eca52984`).then((response) => response.json()).then((data) => setPlaceInfo({
      name: data.name ,
      country: data.sys.country ,
      current_temp: data.main.temp,
      high_temp: data.main.temp_max,
      low_temp: data.main.temp_min,
      condition: data.weather[0].main
    })).catch((err)=>{
console.log(err)
  
    })
  
handlerecent()

    setPlace("")


  }

  return (
    <>
    <Navbar></Navbar>
    <div

      className="app"
      style={
        placeInfo.condition?.toLowerCase() === "clear" ||
          placeInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Clear})` }
          : placeInfo.condition?.includes("cloudy")
            ? { backgroundImage: `url(${Cloudy})` }
            : placeInfo.condition?.toLowerCase().includes("rainy")
              ? { backgroundImage: `url(${Rainy})` }
              : placeInfo.condition?.toLowerCase().includes("snow")
                ? { backgroundImage: `url(${Snow})` }
                : { backgroundImage: `url(${Overcast})` }
      }
    >
      <div className="search-input">

        <input class="form-control me-2" type="search" value={place} onChange={(e)=>setPlace(e.target.value)} placeholder="Type city name here" aria-label="Search" />
        <button class="btn btn-outline-success"style={{border:"2 px solid blue",backgroundColor:"black"}} onClick={handleFetch} type="submit"><strong>Search</strong></button>
    
      </div>
      <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.current_temp || 36}° C </h1>
          <div className="condition-high-low">
            <h1>{placeInfo.condition || "clouds"}</h1>
            <h1>{placeInfo.high_temp || 36}° C</h1>
            <h1>{placeInfo.low_temp || 36}° C</h1>
          </div>
        </div>
        <h2>

          {placeInfo.name || "Haldwani"}, {placeInfo.country || "IN"}

       
          <ul class="list-group">
          <li class="list-group-item">Most Recent</li>
          {show && <li class="list-group-item list-group-item-info">{localStorage.getItem("city")}</li>}
  
    

  

</ul>
        </h2>
      </div>
    </div>

    </>



  );
}

export default App;
