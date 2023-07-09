const existeOMalEscrita = document.querySelector("#existeOMalEscrita")
const fraseExisteOMalEscrita = document.querySelector("#fraseExisteOMalEscrita")

const multasAcumuladas = document.querySelector("#multasAcumuladas")
const form = document.querySelector("#formulario")
const fragment = document.createDocumentFragment();


let arrayMultas = JSON.parse(localStorage.getItem("comprobadosArray")) || []



//EVENTO SUBMIT//
form.addEventListener('submit', (ev) => {
  ev.preventDefault()


  const validado = validar();
  if (!validado) {

    let mensaje = "formato no válido"

    existeOMalEscrita.textContent = mensaje
  }

  if (validado) {

    let mensaje = ""

    existeOMalEscrita.textContent = mensaje
    getConductor()

  }

  form.reset()

}
);


//ESTO PPARA LA VALIDACION
const regExp = {
  matricula: /\d\d\d-[A-Za-z]/i,
}


const validar = () => {

  let matricula = document.querySelector("#matriculaIntroducida").value;

  if (!regExp.matricula.test(matricula)) {
    return false;
  }

  else {
    return true;
  }
}


//ESTO PPARA comprobar si existe//

const arrayConductores = [
  { matricula: "123-j", nombre: 'Pepe', multa: 800, modelo: "MPajero" },
  { matricula: "123-b", nombre: 'Ana', multa: 500, modelo: "Canyonero" },
  { matricula: "123-e", nombre: 'bea', multa: 150, modelo: "Deportivo" }
];




let matricula = document.querySelector("#matriculaIntroducida").value;


const getConductor=async(matricula)=>{
  matricula= document.querySelector("#matriculaIntroducida").value;
  const nombre=arrayConductores.find((item)=>item.matricula===matricula)?.nombre
	if(nombre) return(`El vehículo con matrícula ${matricula} tiene multa`);
	else throw(`El vehículo con matrícula ${matricula} no tiene multa`)
		
}


const getInfoConductor=async(matricula)=>{
  try{
    const matriculilla=await getConductor(matricula);
    
    
    return `El vehículo con matrícula ${matriculilla} tiene multa`

  }catch(error){
throw error
  }
}

getInfoConductor(matricula)
.then((respuesta)=>{console.log(respuesta)})
.catch((error)=>{console.log(error)})


//RELLENAR ARRAY LOCAL//
const subirArrayLocal = (matriculilla) => {
  matriculilla = document.querySelector("#matriculaIntroducida").value;
  const coincidencia = arrayMultas.find((elemento) => elemento.matricula == matriculilla)

  if (!coincidencia) {
    arrayMultas.push({
      matricula: elemento.matricula,
      modelo: elemento.modelo,
      nombre: elemento.nombre,
      multa: elemento.multa
    })

    localStorage.setItem("comprobadosArray", JSON.stringify(arrayMultas));
  }
}

//PINTARLO EN LA WEB

const pintarMultas = () => {
  multasAcumuladas.innerHTML = ""
  arrayMultas.forEach((item) => {
    const nuevaMulta = document.createElement("P");
    nuevaMulta.textContent = `${item.matricula} ${item.modelo} ${item.nombre} ${item.multa}`;
    fragment.append(nuevaMulta);
  })
  multasAcumuladas.append(fragment);
};
pintarMultas()
