// Crea una funcion denominada getUsuario
// obtiene el usuario a partir del input con id "usuario"
// usando fetch para hacer una peticion GET a http://localhost:8000/user/id
function getUser() {
    const usuario = document.getElementById("user_id").value;
    fetch(`http://localhost:8000/users/${usuario}`)
        .then(response => response.json())
        .then(data => {
            //La respuesta tiene el formato { "users":["id":1,"name":"nombre"] }
            const resultadoDiv = document.getElementById("resultado");
            let userStr = "";
            console.log(data);
            data.users.forEach(element => {
                userStr = userStr + `ID: ${element.id} <br> Nombre: ${element.nombre} <br> `;
            });
            resultadoDiv.innerHTML = userStr
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Crea una funcion denominada getUsuario
// obtiene el usuario a partir del input con id "usuario"
// usando fetch para hacer una peticion GET a http://localhost:8000/user/id
function getUserSQLmodel() {
    const usuario = document.getElementById("user_id").value;
    fetch(`http://localhost:8000/user_sqlmodel/${usuario}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //La respuesta tiene el formato { "user":{"id":1,"name":"nombre"} }
            const resultadoDiv = document.getElementById("resultado");
            let userStr = "";
            data.user.forEach(element => {
                userStr = userStr + `ID: ${element.id} <br> Nombre: ${element.nombre} <br> `;
            });
            resultadoDiv.innerHTML = userStr
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


async function login() {
    await sendLoginRequest("/login");
}

async function loginSafe() {
    await sendLoginRequest("/loginvalidado");
}

// Funcion sendLoginRequest que envía al backend el usuario y contraseña 
// introducidos en los inputs con id="username" y id="password" respectivamente, 
// y muestra la respuesta en un div con id="result"
async function sendLoginRequest(endpoint) {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Cargando...";

    try {
        const response = await fetch(`http://localhost:8000${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Error en el login");
        }

        resultDiv.style.color = "green";
        resultDiv.innerHTML = `Bienvenida ${data.user}`;

    } catch (error) {
        resultDiv.style.color = "red";
        resultDiv.innerHTML = error.message;
    }
}