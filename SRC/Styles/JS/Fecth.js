// Método que realiza el consumo al api GET

let drawTable = () => {

    fetch('http://localhost:3000/api/Modulos', {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then((response) => {
            return response.json()
        })
        .then((data) => {
            renderTable(data)
        })
}

drawTable();

// Metodo que renderiza la tabla con los datos

let renderTable = (data) => {

    const table = document.querySelector('.table');

    //Creación del nodo Body Table

    let bodytable = document.createElement('tbody');

    bodytable.className = "tbody";
    table.appendChild(bodytable);

    for (let i = 0; i < data.length; i++) {

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');


        let text1 = document.createTextNode(data[i].description);
        let text2 = document.createTextNode(data[i].profesor);
        let text3 = document.createTextNode(data[i].Horario);

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        bodytable.appendChild(tr);
    }
}



let createItem = () => {

    const descripcion = document.querySelector('#txtdescripcion').value;
    const profesor = document.querySelector('#txtprofesor').value;
    const Horario = document.querySelector('#txthorario').value;

    let newCourse = {
        "description": descripcion,
        "profesor": profesor,
        "Horario": Horario,
    }

    fetch('http://localhost:3000/api/Modulos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
    })

        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //Si el consumo fue correcto
            renderResult(true)
        })
        .catch((err) => {
            //Si hubo error
            renderResult(false)
        })
}

let renderResult = (result) => {
    const textResult = document.querySelector('#resultado');
    if (result) {
        textResult.textContent = 'Guardado exitosamente'
    } else {
        textResult.textContent = 'Ocurrio un erro al guardar'
    }

    //Optenemos el modal para ocultarlo

    let myModalE1 = document.getElementById('exampleModal');
    let modal = bootstrap.Modal.getInstance(myModalE1);
    modal.hide();

    //Limpiamos el body de la tabla

    const tableBody = document.querySelector('.tbody');
    tableBody.remove();

    // Volvemos a llamar al metodo que maqeuta la tabla que no muestre la actualizada

    drawTable();
}


