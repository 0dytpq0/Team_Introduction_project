
const API_KEY = '9d59e5435a200330c977e89d2befbb38';

function onGeoOk(position){
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`
  
  fetch(url).then(response => response.json()).then(data => {
    const locationContainer = document.querySelector('#weather .location');
    const tempContainer = document.querySelector('#weather .temp');

    locationContainer.innerText = `${data.name}`;
    tempContainer.innerText = `: ${data.main.temp.toFixed(0)}°`;
    
  });

}
function onGeoError(){
  alert("날씨 정보를 받을 수 없습니다.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)