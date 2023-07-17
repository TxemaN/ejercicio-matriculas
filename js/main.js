const existeOMalEscrita = document.querySelector("#existeOMalEscrita")
const fraseExisteOMalEscrita = document.querySelector("#fraseExisteOMalEscrita")
const multasAcumuladas = document.querySelector("#multasAcumuladas")
const form = document.querySelector("#formulario")
let matriculaIntroducida = document.querySelector("#matriculaIntroducida")
const fragment = document.createDocumentFragment();
let arrayMultas = JSON.parse(localStorage.getItem("comprobadosArray")) || []


//EVENTO SUBMIT//
form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const matricula = matriculaIntroducida.value
  verificar(matricula)
}
);


//ESTO PPARA LA VALIDACION
const regExp = {
  matricula: /\d\d\d-[A-Za-z]{1}$/i,
}

const verificar = (matricula) => {

  const validado = validar(matricula);
  if (!validado) {

    let mensaje = "formato no válido"

    existeOMalEscrita.textContent = mensaje
  } else {

    getInfoConductor(matricula)
      .then((respuesta) => {
        multasAcumuladas.innerHTML = respuesta;
        subirArrayLocal(matricula)
        pintarMultas(matricula)
      }).catch((error) => { existeOMalEscrita.innerHTML = error })
    form.reset()
  }
}

const validar = (matriculilla) => {
  if (!regExp.matricula.test(matriculilla)) {
    return false;
  } else {
    return true;
  }
}

//ESTO PPARA comprobar si existe//

const arrayConductores = [
  { matricula: "123-j", nombre: 'Pepe', multa: 800, modelo: "MPajero" },
  { matricula: "123-b", nombre: 'Ana', multa: 500, modelo: "Canyonero" },
  { matricula: "123-e", nombre: 'bea', multa: 150, modelo: "Deportivo" }
];
const arrayMulta = [
  { matricula: "123-j", multa: 800 },
  { matricula: "123-b", multa: 500 },
  { matricula: "123-e", multa: 150 },
];

const arrayModelo = [
  { matricula: "123-j", modelo: "MPajero" },
  { matricula: "123-b", modelo: "Canyonero" },
  { matricula: "123-e", modelo: "Deportivo" },
]


const getInfoConductor = async (matricula) => {
  try {
    const nombre = arrayConductores.find((item) => item.matricula === matricula)?.nombre


    if (nombre) return (nombre);
    else throw (`El vehículo con matrícula ${matricula} no tiene multa`)
  }
  catch (error) {
    throw error
  }
}


//RELLENAR ARRAY LOCAL//
const subirArrayLocal = (matricula) => {

  const coincidencia = arrayMultas.find((elemento) => elemento.matricula == matricula)

  if (!coincidencia) {
    arrayMultas.push({
      matricula: arrayConductores.find((item) => item.matricula == matricula)?.matricula,
      nombre: arrayConductores.find((item) => item.matricula == matricula)?.nombre,
      multa: arrayConductores.find((item) => item.matricula == matricula)?.multa,
      modelo: arrayConductores.find((item) => item.matricula == matricula)?.modelo
    })

    localStorage.setItem("comprobadosArray", JSON.stringify(arrayMultas));
  }
}

//PINTARLO EN LA WEB

const pintarMultas = () => {
  let mensaje = ""

  existeOMalEscrita.textContent = mensaje
  multasAcumuladas.innerHTML = ""
  arrayMultas.forEach((item) => {
    const nuevalinea = document.createElement("TR");
    const nuevaMatricula = document.createElement("TD");
    nuevaMatricula.textContent = `${item.matricula}`;
    const nuevoModelo = document.createElement("TD");
    nuevoModelo.textContent = `${item.modelo}`
    const nuevoNombre = document.createElement("TD");
    nuevoNombre.textContent = `${item.nombre}`
    const nuevaMulta = document.createElement("TD");
    nuevaMulta.textContent = `${item.multa}`

    nuevalinea.append(nuevaMatricula);
    fragment.append(nuevalinea, nuevaMatricula, nuevoModelo, nuevoNombre, nuevaMulta)
  })
  multasAcumuladas.append(fragment);
};