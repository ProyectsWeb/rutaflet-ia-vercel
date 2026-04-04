import { DOMAIN } from "../config/configPath.js";


export default function Cargar(){
  const $cargar = document.createElement('div');
  $cargar.innerHTML= `
  <div class="box-carga">
     <textarea id="lista" name="mitexto"></textarea>
     <div class="btn-controls">
      <button id ="procesar">Cargar</button>
       <button id ="reset-visitas">Reset</button>
     </div>
   </div>
  `; 

   const $procesar =  $cargar.querySelector('#procesar');   
   $procesar.addEventListener('click', (e)=>{
     e.preventDefault()     
     procesar()
    });

    const $reset = $cargar.querySelector('#reset-visitas');
    $reset.addEventListener('click', (e)=>{
      e.preventDefault()      
      resetVisitas()
    });

  return $cargar
}

/* onclick="procesar()" */
function procesar(){
  const texto = document.getElementById('lista').value;
  console.log(texto)

  // separa por enter o coma
  const contratos = texto.split(/\n|,/).map(c => c.trim()).filter(c => c !== ''); 
  console.log(contratos)
  cargarClientes(contratos); 
}


export async function cargarClientes(contratos){
    console.log(contratos)       
         

   const res = await fetch(`/api/clientes-filtrar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ contratos })
   
  });  
  
   const data = await res.json();  
   console.log(data)   
    alert('Contratos Cargados');
}

async function resetVisitas(){
  await fetch(`/api/reset-visitas`, {
    method: 'POST'
  });

  alert('Visitas reiniciadas');
}