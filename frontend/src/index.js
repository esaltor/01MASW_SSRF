// Funcion get_carteles que obtiene los carteles desde el backend
// usando fetch y los muestra en la consola. El endpoint es localhost:8000/cartelesv1
function get_carteles() {
  fetch("http://localhost:8000/cartelesv1")
    .then((response) => response.json())
    .then((data) => {
      console.log("Carteles obtenidos desde el backend:", data);
        // Mostrar los carteles en el div con id "carteles-list"
        const cartelesList = document.getElementById('carteles-list');
        cartelesList.innerHTML = '';
        data.carteles.forEach(cartel => {
            const cartelDiv = document.createElement('div');
            cartelDiv.className = 'card mb-2';
            cartelDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${cartel}</h5>
                    <p class="card-text">${cartel}</p>
                </div>
            `;
            //Agregar click para solicitar el cartel
            cartelDiv.onclick = () => solicitar_cartel(cartel);
            cartelesList.appendChild(cartelDiv);
        });
    })
    .catch((error) => {
      console.error("Error al obtener los carteles:", error);
    });
}

// Usando fetch solicita un cartel al servidor a partir de su nombre
function solicitar_cartel(nombre_cartel) {
    fetch(`http://localhost:8000/carteles/`, {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name: nombre_cartel })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        response.blob().then(myBlob => {
            const objectURL = URL.createObjectURL(myBlob);
            console.log('objectURL:', objectURL);
            // Mostrar la imagen en el div con id="cartel"
            const cartelDiv = document.getElementById('cartel');
            cartelDiv.innerHTML = `<h3>${nombre_cartel}</h3><img src="${objectURL}" alt="${nombre_cartel}" class="img-fluid"/>`;
        });
    })
    .then(data => {
        //La respuesta del servidor es un fichero que se tiene que mostrar en id="cartel"
        const cartelDiv = document.getElementById('cartel');
        //cartelDiv.innerHTML = `<h3>${data.message}</h3><img src="${data.url}" alt="${nombre_cartel}" class="img-fluid"/>`;
        console.log('Respuesta del servidor:', data.message);
    })
    .catch(error => {
        console.error('Error al solicitar el cartel:', error);
    });
}