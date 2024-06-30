// Escuchar mensaje del padre al cargar el contenido
window.addEventListener('message', function(event) {
    // Validar que el mensaje provenga de un origen seguro (mismo origen)
    if (event.origin !== window.location.origin) return;

    // Extraer el nombre del item desde el mensaje
    var itemName = event.data;
    renderizarNombreItem(itemName); // Llamar a la función para renderizar el nombre del item
});

// Función para renderizar el nombre del item en el HTML
function renderizarNombreItem(nombreItem) {
    document.getElementById('item-name').textContent = nombreItem;
}

// Función para renderizar el contenido del item en el HTML
function renderizarContenidoItem(contenido) {
    document.getElementById('item-content').textContent = contenido;
}
