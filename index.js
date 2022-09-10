import{myApi} from './api.js'
 const apikey= myApi();


window.addEventListener('load',()=>{
    if(navigator.geolocation){
      navigator.geolocation.
      getCurrentPosition((position)=>{
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;


        const url=`http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=${apikey}`;

        fetch(url)
        .then(resp=>{ return resp.json()})
        .then((data)=>{
            console.log(data);
        })
      })
        
           
        
    }
})