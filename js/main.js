const reqForm = document.getElementById('nuevoPuesto');
const msAdias = 0;
const fechaDeHoy = new Date();
const fechaDeHoyReal = fechaDeHoy.toLocaleString(fechaDeHoy.DATE_SHORT);

function idGenerator () {
    let generateNumber = parseInt((Date.now())/4);
    return generateNumber;
}

function calcularFechas (fecha1, fecha2) {
    let diferenciaFechas = fecha1 - fecha2;
    let msAdias = 1000 * 3600 * 24;
    let cantidadDeDias = parseInt(diferenciaFechas/msAdias);
    return cantidadDeDias;
};

let posiciones = [];

reqForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(reqForm);
    const tituloDeLaPosicion = form.get('tituloDeLaPosicion');
    const idDeLaPosicion = idGenerator();
    const fechaLimite = new Date(form.get('fechaLimite'));
    const fechaLimiteReal = fechaLimite.toLocaleString(fechaLimite.DATE_SHORT);
    const vacantes = form.get('vacantes');
    const cantDias = (calcularFechas (fechaLimite, fechaDeHoy));
    const categorias = form.get('categoria');


    const req = {
        titulo: tituloDeLaPosicion,
        id: idDeLaPosicion,
        fecha: fechaLimiteReal,
        rowCantDias: cantDias,
        vacantesReq: vacantes,
        categoria: categorias,

    };

    crearReq(req);
});

const crearReq = (req) => {
    const reqsAbiertas = document.getElementById('posicionesAbiertas');
    const tr = document.createElement('tr');
    posiciones.push(req);

    tr.innerHTML = `
    <tr>
    <td> ${req.titulo} </td>
    <td> ${req.id} </td>
    <td> ${req.fecha} </td>
    <td> ${req.rowCantDias} </td>
    <td> ${req.vacantesReq} </td>
    <td> ${req.categoria} </td>
    <button class="visualizar"> Ver detalles </button> 
    <button class="remover" id="${req.id}" name="remover" value="${req.id}"> Remover </button>
    </tr>    
    `;
    reqsAbiertas.appendChild(tr);

guardarReqStorage(posiciones);

reqsAbiertas.addEventListener('click', (e) => {
    removerReq(e.target.value);
    });
};

const removerReq = (idPosicion) => {
    posiciones.forEach((req, index) => {
        if (req.id == idPosicion) {
            posiciones.splice(index, 1);
        }
        
    });
    mostrarReqs (posiciones);
    guardarReqStorage (posiciones);
    
};

const mostrarReqs = (posiciones) => {
    const reqsAbiertas = document.getElementById('posicionesAbiertas');
    reqsAbiertas.innerHTML = ''; 
    posiciones.forEach(req => {
        const tr = document.createElement('tr');
        tr.innerHTML = `   
        <tr>
            <td> ${req.titulo} </td>
            <td> ${req.id} </td>
            <td> ${req.fecha} </td>
            <td> ${req.rowCantDias} </td>
            <td> ${req.vacantesReq} </td>
            <td> ${req.categoria} </td>
            <button class="visualizar"> Ver detalles </button>
            <button class="remover" id="${req.id}" name="remover" value="${req.id}"> Remover </button>
        </tr>`; 
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
});

const listaDeSueldos = document.querySelector('#listado');


document.addEventListener ('DOMContentLoaded', () =>  {
    fetch('./sueldos.json')
    .then((response) => response.json())
    .then((sueldos) => {
        mostrarSueldos(sueldos)
    })

});



const mostrarSueldos = (sueldos) => {
    sueldos.forEach((job) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class ="card">
        <img src='${job.img}' class ="images"></img>
        <div class="details">
        <h4 class="expect">${job.nombre}</h4>
        <p class="expectDetail">${job.categoria}</p>
        <p class="expectDetail">ARS ${job.sueldoPromedio}</p>
        </div>
        </div>
        
        `
        listaDeSueldos.appendChild(li);
    })
}; 



/* const detallesReq = (detalleDeLaPosicion) => {
    posiciones.forEach((req, index) => {
        if (req.categoria === detalleDeLaPosicion) {

            const li = document.createElement('li');
            li.innerHTML = `
            <h4 class="expect">${job.nombre}</h4>
            <p class="expectDetail">${job.categoria}</p>
            <p class="expectDetail">ARS ${job.sueldoPromedio}</p>
            `
            lista.appendChild(li);
        
    };
    mostrarReqs (posiciones);
    guardarReqStorage (posiciones);
    
    });
}; */




//console.log(mostrarSueldos);


/* function diferenciaFechas (fecha1, fecha2) {
    const diffInDays = fecha2.diff(fecha1, 'days');
    return diffInDays;
} */

//console.log(diffInDays);
/* let 
let msAdias = 0;
let fechaDeHoy = new Date();

function calcularFechas (fecha1, fecha2) {
    diferenciaFechas = fecha1 - fecha2;
    msAdias = 1000 * 3600 * 24;
    cantidadDeDias = parseInt(diferenciaFechas/msAdias);
    return cantidadDeDias;
} */

//const diff = fechaDeHoy.getDate().diff(fechaLimite.getDate(), 'days');

//console.log(diff);

//console.log(diff.toObject())


//Pregunta: como aplicar este while a cada vez que el prompt pida una nueva posicion?
/* while (vacantes === 0) {
    vacantes = parseInt(prompt('El numero de vacantes no puede ser 0. Cuantas vacantes hay que llenar para el puesto de '+ tituloDeLaPosicion +'?'));
} */

// chequeando si el puesto se registr?? correctamente usando 'includes' y buscando por id o t??tulo

//console.log(posiciones.includes(prompt ('Busque el puesto guardado por t??tulo o id')));

// impidiendo el usuario de agregar un nuevo puesto que ya est?? guardado

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

//Funcion para saber cuantos dias hasta la fecha l??mite de presentacion de candidatos
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
    (console.log('La posici??n ' + (posiciones[0].tituloDeLaPosicion) + ' ID ' + (posiciones[0].numeroId) + ' se guard?? con ??xito. La fecha l??mite para presentar candiatos es ' + (posiciones[0].fechaLimite) + 'y ten??s ' + cantidadDeDias1 + ' para presentar ' + presentaciones1 + ' candidatos'));
    (console.log('La posici??n ' + (posiciones[1].tituloDeLaPosicion) + ' ID ' + (posiciones[1].numeroId) + ' se guard?? con ??xito. La fecha l??mite para presentar candiatos es ' + (posiciones[1].fechaLimite) + 'y ten??s ' + cantidadDeDias2 + ' para presentar ' + presentaciones2 + ' candidatos'));
    (console.log('La posici??n ' + (posiciones[2].tituloDeLaPosicion) + ' ID ' + (posiciones[2].numeroId) + ' se guard?? con ??xito. La fecha l??mite para presentar candiatos es ' + (posiciones[2].fechaLimite) + 'y ten??s ' + cantidadDeDias3 + ' para presentar ' + presentaciones3 + ' candidatos'));
    
}
 */





























/* IDENTIFICACI??N DEL PUESTO
let tituloDeLaPosicion = prompt("T??tulo de la Vancante");
let id = parseInt(prompt("Entre el ID del puesto"));
let nombreCliente = prompt("Entre el nombre del cliente");
let vacantes = parseInt(prompt("Cu??ntas vacantes hay que llenar para este puesto?"));
let fechaInicio = Date.parse(prompt("Fecha de inicio del puesto")); /*conseguir prompt para fecha*/
/*
let fechaLimite = Date /*conseguir prompt para fecha. La fecha l??mite es 5 d??as antes de fechaInicio*/
/*
alert("El puesto " + tituloDeLaPosicion + " ID " + id + " para " + nombreCliente + " se ha registrado exitosamente y hay " + vacantes + " para llenar.")

/*METRICAS DEL RECLUTADOR
let invitaciones = parseInt(prompt("Cu??ntos candidatos fueron invitados a postularse?"));
let invitacionesAceptadas = parseInt(prompt("Cu??ntos candidatos acceptaron las invitaciones y se postularon?"));
let presentaciones = parseInt(prompt("Cu??ntos candidatos fueron presentados al cliente?"));
let fechaPresentacion = Date /*conseguir prompt para fecha
let entrevistas = parseInt(prompt("Cu??ntos candidatos fueron entrevistados por el cliente?"));
let cantContrataciones = parseInt(prompt("Cu??ntos candidatos fueron contratados por el cliente?"))
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

let vacantesLlenas = parseInt(prompt("Cu??ntas de las vacantes se ha llenado?"));
let vacantesRestantes = vacantes - vacantesLlenas;

let razonDeLlenado = (100 * vacantesLlenas) / vacantes;

if (vacantesLlenas > vacantes) {
    alert("N??mero de vacantes llenas debe ser menor o igual al n??mero de vacantes");

    
}
else if (vacantesLlenas == vacantes) {
    alert ("Ya llenaste todas las vacantes. Pod??s cerrar el puesto");
    
}

else if (vacantesLlenas < vacantes) {
    alert ("Has llenado el" + razonDeLlenado + "% de las vacantes. Te quedan " + vacantesRestantes + " por llenar");

}
*/





/* let tituloDeLaPosicion = prompt("T??tulo de la Vancante");

let id = prompt(parseInt("Entre el ID de la cavante"));

let inicio = prompt (new Date("Cu??ndo va a ser el primer dia de  trabajo del contratado"));

let limite = new Date("2022/07/29");
/* let hoy = new date("");  

let vacantes = prompt("Cuantas vacantes hay que llenar para este puesto?");

if (vacantes <=0) {
    alert("El puesto tiene que tener por lo menos una vancate");
    
}

else if (asignacion) {

}

let asignacion = prompt("Cu??ndo te asignaron la b??squeda? DD/MM/YYYY");

let fechaAsignacion = new Date(asignacion);

let contratado = new Date("2022/06/29");

let invitaciones = prompt("Cu??ntos candidatos has invitado a que se postulen?");

let presentaciones = prompt("Cu??ntos candidatos has presnetado al cliente?");

let entrevistas = prompt("Cu??ntos candidatos fueron entrevistados por el cliente?");

let contratados = prompt("Cu??ntos candidatos fueron contratados por el cliente?");



let tiempoParaPresentarSeg = limite - asignacion;
let diasParaPresentar = tiempoParaPresentarSeg / (1000 * 3600 * 24);


alert(`El puesto ${tituloDeLaPosicion} (ID  ${id}) se ha registrado exitosamente. 
Ten??s ${diasParaPresentar} d??as para presentar los candidatos de la vacante`); */