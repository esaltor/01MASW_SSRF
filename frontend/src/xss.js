// Funcion que envia los datos del formulario al backend utilizando fetch
// el endpoint es localhost:8000/asistencia y el metodo es POST
// El body de la peticion es un JSON con los campos nombre y comentario

function enviarAsistencia() {
    const nombre = document.getElementById("name").value;
    const comentario = document.getElementById("comment").value;
    // Crear un objeto con los datos del formulario
    const data = {
        nombre: nombre,
        comentario: comentario
    };
    // Enviar los datos al backend utilizando fetch
    fetch("http://localhost:8000/asistencia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)  
    })
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                console.log("Asistencia enviada correctamente:", data);
            });
        } else {
            console.error("Error en la respuesta del servidor");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function obtenerAsistencias() {
    fetch('http://localhost:8000/asistencias')
        .then(response => response.json())
        .then(data => {
            const asistenciasList = document.getElementById('asistenciasList');
            asistenciasList.innerHTML = ''; // Limpiar el contenido previo
            data.asistencias.forEach(asistencia => {
                // Crear nuevos elementos para cada asistencia y agregar a la tabla
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const commentCell = document.createElement('td');
                nameCell.textContent = asistencia.nombre;
                commentCell.textContent = asistencia.comentario;
                row.appendChild(nameCell);
                row.appendChild(commentCell);
                asistenciasList.appendChild(row);   
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
