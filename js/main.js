//alert ("Bienvenido a HireZen: el tracker de vacantes de trabajo. Entre la información del puesto.");

// Se crea un array de objetos vacío
const reqForm = document.getElementById('nuevoPuesto');
    
let posiciones = [];

reqForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(reqForm);
    const tituloDeLaPosicion = form.get('tituloDeLaPosicion');
    const idDeLaPosicion = form.get('numeroId');
    const fechaLimite = form.get('fechaLimite');
    const vacantes = form.get('vacantes');

    const req = {
        titulo: tituloDeLaPosicion,
        id: idDeLaPosicion,
        fecha: fechaLimite,
        vacantesReq: vacantes,

    };

    crearReq(req);
});


const crearReq = (req) => {
    const reqsAbiertas = document.getElementById('posicionesAbiertas');
    const tr = document.createElement('tr');
    posiciones.push(req);

    tr.innerHTML += `
    <tr>
        <td> ${req.titulo} </td>
        <td> ${req.id} </td>
        <td> ${req.fecha} </td>
        <td>80</td>
        <td> ${req.vacantesReq} </td>
        <button class="visualizar"> Ver detalles </button>
        <button class="remover" id="${req.titulo}" name="remover" value="${req.titulo}"> Remover </button>
        
    </tr>    
    `;
    reqsAbiertas.appendChild(tr);

guardarReqStorage(posiciones);

reqsAbiertas.addEventListener('click', (e) => {
    removerReq(e.target.value);
    });
};

const removerReq = (titulo) => {
    posiciones.forEach((req, index) => {
        if (req.tituloDeLaPosicion === titulo) {
            posiciones.splice(index, 1);
        }
        
    });
    mostrarReqs (posiciones);
    guardarReqStorage (posiciones);
    
};

const mostrarReqs = (posiciones) => {
    const reqsAbiertas = document.getElementById('posicionesAbiertas');
    const tr = document.createElement('tr');
    
    reqsAbiertas.innerHTML = ''; //no usé .innerHTML porque está borrando el header de la tabla

    posiciones.forEach(posiciones => {

        tr.innerHTML += `
            <tr>
                <td> ${req.titulo} </td>
                <td> ${req.id} </td>
                <td> ${req.fecha} </td>
                <td>80</td>
                <td> ${req.vacantesReq} </td>
                <button class="visualizar"> Ver detalles </button>
                <button class="remover" id="${req.titulo}" name="remover" value="${req.titulo}"> Remover </button>
                
            </tr>    
            `;
            reqsAbiertas.appendChild(tr);
    });  

    reqsAbiertas.addEventListener('click', (e) => {
        removerReq(e.target.value);
    });

};


const guardarReqStorage = (posiciones) => {
    localStorage.setItem('posiciones', JSON.stringify(posiciones));
};

const getReqStorage = () => {
    const reqStorage = JSON.parse(localStorage.getItem('posiciones'));
    return reqStorage;
};

document.addEventListener ('DOMContentLoaded', () => {
    if (localStorage.getItem('posiciones')) {
        posiciones = getReqStorage();
        mostrarReqs(posiciones);
    }
})

//Pregunta: como aplicar este while a cada vez que el prompt pida una nueva posicion?
/* while (vacantes === 0) {
    vacantes = parseInt(prompt('El numero de vacantes no puede ser 0. Cuantas vacantes hay que llenar para el puesto de '+ tituloDeLaPosicion +'?'));
} */

// chequeando si el puesto se registró correctamente usando 'includes' y buscando por id o título

//console.log(posiciones.includes(prompt ('Busque el puesto guardado por título o id')));

// impidiendo el usuario de agregar un nuevo puesto que ya está guardado

/* let nuevoPuesto ='';
do {
    if (nuevoPuesto !== posiciones.includes(nuevoPuesto)) {
    alert('Este puesto ya existe en HireZen.Entre uno nuevo');
    }

    nuevoPuesto = prompt('Vamos a crear un nuevo puesto en HireZen. Ingrese el titulo o id del nuevo puesto')
} while (posiciones.includes(nuevoPuesto));
 */
//Aplicando valores de un array a una funcion
/* let cantidadDeDias = 0;
let diferenciaFechas = 0;
let msAdias = 0;
let fechaDeHoy = new Date();

function calcularFechas (fecha1, fecha2) {
    diferenciaFechas = fecha1 - fecha2;
    msAdias = 1000 * 3600 * 24;
    cantidadDeDias = parseInt(diferenciaFechas/msAdias);
    return cantidadDeDias;
} */

//Funcion para saber cuantos dias hasta la fecha límite de presentacion de candidatos
/* let cantidadDeDias1 = calcularFechas ((posiciones[0].fechaLimite), fechaDeHoy);
let cantidadDeDias2 = calcularFechas ((posiciones[1].fechaLimite), fechaDeHoy);
let cantidadDeDias3 = calcularFechas ((posiciones[2].fechaLimite), fechaDeHoy); */

//Funcion para calcular cuantos candidatos hay que presentar para cada posicion
/* function calcularVacantes (vacantes,) {
    presentaciones = parseInt(vacantes * 3);
    return presentaciones;
}

let presentaciones1 = calcularVacantes (posiciones[0].vacantes);
let presentaciones2 = calcularVacantes (posiciones[1].vacantes);
let presentaciones3 = calcularVacantes (posiciones[2].vacantes); */

 //Resultados Finales


/* const boton = document.getElementById('enviar');

boton.onclick = function () {
    (console.log('La posición ' + (posiciones[0].tituloDeLaPosicion) + ' ID ' + (posiciones[0].numeroId) + ' se guardó con éxito. La fecha límite para presentar candiatos es ' + (posiciones[0].fechaLimite) + 'y tenés ' + cantidadDeDias1 + ' para presentar ' + presentaciones1 + ' candidatos'));
    (console.log('La posición ' + (posiciones[1].tituloDeLaPosicion) + ' ID ' + (posiciones[1].numeroId) + ' se guardó con éxito. La fecha límite para presentar candiatos es ' + (posiciones[1].fechaLimite) + 'y tenés ' + cantidadDeDias2 + ' para presentar ' + presentaciones2 + ' candidatos'));
    (console.log('La posición ' + (posiciones[2].tituloDeLaPosicion) + ' ID ' + (posiciones[2].numeroId) + ' se guardó con éxito. La fecha límite para presentar candiatos es ' + (posiciones[2].fechaLimite) + 'y tenés ' + cantidadDeDias3 + ' para presentar ' + presentaciones3 + ' candidatos'));
    
}
 */





























/* IDENTIFICACIÓN DEL PUESTO
let tituloDeLaPosicion = prompt("Título de la Vancante");
let id = parseInt(prompt("Entre el ID del puesto"));
let nombreCliente = prompt("Entre el nombre del cliente");
let vacantes = parseInt(prompt("Cuántas vacantes hay que llenar para este puesto?"));
let fechaInicio = Date.parse(prompt("Fecha de inicio del puesto")); /*conseguir prompt para fecha*/
/*
let fechaLimite = Date /*conseguir prompt para fecha. La fecha límite es 5 días antes de fechaInicio*/
/*
alert("El puesto " + tituloDeLaPosicion + " ID " + id + " para " + nombreCliente + " se ha registrado exitosamente y hay " + vacantes + " para llenar.")

/*METRICAS DEL RECLUTADOR
let invitaciones = parseInt(prompt("Cuántos candidatos fueron invitados a postularse?"));
let invitacionesAceptadas = parseInt(prompt("Cuántos candidatos acceptaron las invitaciones y se postularon?"));
let presentaciones = parseInt(prompt("Cuántos candidatos fueron presentados al cliente?"));
let fechaPresentacion = Date /*conseguir prompt para fecha
let entrevistas = parseInt(prompt("Cuántos candidatos fueron entrevistados por el cliente?"));
let cantContrataciones = parseInt(prompt("Cuántos candidatos fueron contratados por el cliente?"))
let fechaCierrePuesto = Date /*conseguir prompt para fecha*/


/* functions para transformar fechas
let fecha = new date (prompt("Entre la fecha en formato dd/mm/aaaa"));

function formatoDeFecha(fecha) {
    let nuevoFormato = fecha.toLocaleDateString('es-AR');
    return nuevoFormato;
} 

alert (fecha);*/

/* const puestos = [
    {titulo: "Ingeniero de Produccion", id: 123456, nombreCliente: "Lenovo", vacantes: 5, fechaInicio: 25/12/2022, fechaLimite: 20/12/2022},
    {titulo: "Contador", id: 123686, nombreCliente: "Samsung", vacantes: 1, fechaInicio: 21/10/2022, fechaLimite: 16/10/2022},
    {titulo: "Recepcionista", id: 18746, nombreCliente: "Microsoft", vacantes: 3, fechaInicio: 2/09/2022, fechaLimite: 28/09/2022},
    {titulo: "Especialista de Marketing", id: 524456, nombreCliente: "Microsoft", vacantes: 5, fechaInicio: 02/1/2023, fechaLimite: 28/12/2022},
    {titulo: "Vendedor", id: 151496, nombreCliente: "Meta", vacantes: 2, fechaInicio: 25/12/2022, fechaLimite: 20/12/2022},

];

let buscaPuesto = prompt("Ingresse el titulo de la posicion");

const puestoAbierto = puestos.find(el => el.titulo === buscaPuesto);
alert(puestoAbierto);
 */


/* partes de codigo que podremos llegar a usar

let vacantesLlenas = parseInt(prompt("Cuántas de las vacantes se ha llenado?"));
let vacantesRestantes = vacantes - vacantesLlenas;

let razonDeLlenado = (100 * vacantesLlenas) / vacantes;

if (vacantesLlenas > vacantes) {
    alert("Número de vacantes llenas debe ser menor o igual al número de vacantes");

    
}
else if (vacantesLlenas == vacantes) {
    alert ("Ya llenaste todas las vacantes. Podés cerrar el puesto");
    
}

else if (vacantesLlenas < vacantes) {
    alert ("Has llenado el" + razonDeLlenado + "% de las vacantes. Te quedan " + vacantesRestantes + " por llenar");

}
*/





/* let tituloDeLaPosicion = prompt("Título de la Vancante");

let id = prompt(parseInt("Entre el ID de la cavante"));

let inicio = prompt (new Date("Cuándo va a ser el primer dia de  trabajo del contratado"));

let limite = new Date("2022/07/29");
/* let hoy = new date("");  

let vacantes = prompt("Cuantas vacantes hay que llenar para este puesto?");

if (vacantes <=0) {
    alert("El puesto tiene que tener por lo menos una vancate");
    
}

else if (asignacion) {

}

let asignacion = prompt("Cuándo te asignaron la búsqueda? DD/MM/YYYY");

let fechaAsignacion = new Date(asignacion);

let contratado = new Date("2022/06/29");

let invitaciones = prompt("Cuántos candidatos has invitado a que se postulen?");

let presentaciones = prompt("Cuántos candidatos has presnetado al cliente?");

let entrevistas = prompt("Cuántos candidatos fueron entrevistados por el cliente?");

let contratados = prompt("Cuántos candidatos fueron contratados por el cliente?");



let tiempoParaPresentarSeg = limite - asignacion;
let diasParaPresentar = tiempoParaPresentarSeg / (1000 * 3600 * 24);


alert(`El puesto ${tituloDeLaPosicion} (ID  ${id}) se ha registrado exitosamente. 
Tenés ${diasParaPresentar} días para presentar los candidatos de la vacante`); */