
window.addEventListener('load',()=>{
    if(navigator.geolocation){
      navigator.geolocation.
      getCurrentPosition((position)=>{
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;


        const url=`http://api.openweathermap.org/data/2.5/weather?q=ruiru&appid=acf204ed7b5ca0cb7edf388a6865e8ce`;

        fetch(url)
        .then(resp=>{ return resp.json()})
        .then((data)=>{
            console.log(data);
            weatherReport(data)
        })
      })
        
           
        
    }
})
document.getElementById('search').addEventListener('click',()=>{
  let place =document.getElementById('input').value;
  

  const urlsearch=`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=acf204ed7b5ca0cb7edf388a6865e8ce`;
  fetch(urlsearch)
     .then(resp=>{ return resp.json()})
     .then((data)=>{
      console.log(data);
      weatherReport(data)
     })



})

function weatherReport(data){
     let urlCast= `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=acf204ed7b5ca0cb7edf388a6865e8ce`;

     fetch(urlCast)
     .then(resp=>{ return resp.json()})
     .then((forecast)=>{
         console.log(forecast);
         hourForecast(forecast);
         dayForecast(forecast);



         document.getElementById('city').innerText= data.name+ ',' + data.sys.country;


         document.getElementById('temperature').innerText= Math.floor(data.main.temp-273)+ '°C';

         document.getElementById('clouds').innerText= data.weather[0].description;

     })
}


function hourForecast(forecast){
    document.querySelector('.templist').innerHTML='';
    for(let i=0;i<5;i++){
      let date= new Date(forecast.list[i].dt*1000);


      let hourR= document.createElement('div')
      hourR.setAttribute('class','next')

      let div=  document.createElement('div');
      let time = document.createElement('p');

      time.setAttribute('class','time');
      time.innerHTML = (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');

      let  temp= document.createElement('p');
      temp.innerHTML=Math.floor(forecast.list[i].main.temp_max-273)+ '°C' + '/'+ Math.floor(forecast.list[i].main.temp_min-273)+ '°C';

      div.appendChild(time);
      div.appendChild(temp);


      let desc=document.createElement('p');
      desc.setAttribute('class','desc');
      desc.innerText= forecast.list[i].weather[0].description;

      hourR.appendChild(div);
      hourR.appendChild(desc);
      document.querySelector('.templist').appendChild(hourR);
      
      

    }
}

function dayForecast(forecast){
  document.querySelector('.weekF').innerHTML='';



  for(let i=0;i<forecast.list.length;i+=8){
      console.log(forecast.list[i]);

      let div= document.createElement('div');
      div.setAttribute('class','dayF');

      let day= document.createElement('p');
      day.setAttribute('class','date');
      day.innerHTML= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
      div.appendChild(day);
      
      let temp= document.createElement('p');
      temp.innerHTML= Math.floor(forecast.list[i].main.temp_max-273)+ '°C' + '/'+ Math.floor(forecast.list[i].main.temp_min-273)+ '°C';
      div.appendChild(temp);
       

      let description= document.createElement('p');
      description.setAttribute('class','description')
      description.innerHTML= forecast.list[i].weather[0].description;
      div.appendChild(description);

      document.querySelector('.weekF').appendChild(div)

  }


}