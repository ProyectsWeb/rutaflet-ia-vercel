import { actualizarUbicacion, agruparClientes, obtenerClientes, pintarMarcadores } from "./mapa/utilsMapa.js";
import Cargar from "./views/cargar.js";


let map = L.map('mapa').setView([32.473255, -116.804404], 14);        
console.log(map)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);


document.addEventListener('DOMContentLoaded', async(e)=>{
  console.log("VERSION OPTIMIZADA Y MODULARIZADA");
  const Mapa = document.getElementById('mapa');
  const {pathname} = window.location
    console.log(pathname)

  if(pathname === '/cargar'){
    Mapa.innerHTML="";
    Mapa.appendChild(Cargar())
  }
    
  if(pathname === '/'){    
    navigator.geolocation.watchPosition(({coords})=>{ actualizarUbicacion(map, coords.latitude, coords.longitude); });

    async function iniciarApp() {
     const data = await obtenerClientes();
     const grouped = agruparClientes(data);
     pintarMarcadores(map, grouped);
    }

    iniciarApp();
  } //fin de pathname /

}); //fin del DOMContentLoaded