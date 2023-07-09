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
    // subirArrayLocal() SUBIR A LOCAL FUNCIONA
    getConductor()
   
  }

  form.reset()

}
);


//ESTO PPARA LA VALIDACION
const regExp = {
  matricula: /\d\d\d-[A-Za-z]{1}$/i,
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

const getConductor = (matriculilla) => {
  matriculilla = document.querySelector("#matriculaIntroducida").value;
  const nombre = arrayConductores.find((item) => item.matricula == matriculilla)?.nombre
  return new Promise((resolve, reject) => {
    if (nombre) resolve(`El vehículo con matrícula ${matriculilla} tiene multa`);
    else reject(`El vehículo con matrícula ${matriculilla} no tiene multa`)
  })
}

getConductor()
  .then((respuesta) => {
    fraseExisteOMalEscrita.textContent = respuesta
   return subirArrayLocal()
  })

  .catch((error) => {
    fraseExisteOMalEscrita.textContent = error
    
  })

//RELLENAR ARRAY LOCAL//
const subirArrayLocal = (matriculilla) => {
  matriculilla = document.querySelector("#matriculaIntroducida").value;
  const coincidencia = arrayMultas.find((elemento) => elemento.matricula == matriculilla)

  if (!coincidencia) {
    arrayMultas.push({
      matricula: matriculilla,
      nombre: arrayConductores.find((item) => item.matricula == matriculilla)?.nombre,
      multa: arrayConductores.find((item) => item.matricula == matriculilla)?.multa,
      modelo: arrayConductores.find((item) => item.matricula == matriculilla)?.modelo
    })

    localStorage.setItem("comprobadosArray", JSON.stringify(arrayMultas));
  }
}

//PINTARLO EN LA WEB

const pintarMultas = () => {
  multasAcumuladas.innerHTML = ""
  arrayMultas.forEach((item) => {
    const nuevaMulta = document.createElement("P");
    nuevaMulta.innerHTML = `${item.matricula} ${item.modelo} ${item.nombre} ${item.multa}`;
    fragment.append(nuevaMulta);
  })
  multasAcumuladas.append(fragment);
};
pintarMultas()
