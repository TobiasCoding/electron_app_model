document.addEventListener('DOMContentLoaded', function() {
    var tabContainer = document.getElementById('tab-container');
    var tabs = tabContainer.querySelector('.tabs');
    var tabContents = tabContainer.querySelector('.tab-content');

    // Función para agregar una nueva pestaña
    document.getElementById('new-tab').addEventListener('click', function() {
        // Crear botón de la nueva pestaña
        var newTabButton = document.createElement('button');
        var tabCount = tabs.children.length + 1; // Contador de pestañas
        newTabButton.textContent = 'item ' + tabCount;
        newTabButton.setAttribute('data-tab-id', tabCount); // Atributo de datos para identificar la pestaña
        
        // Crear botón de cierre de la pestaña
        var closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.classList.add('close-button');
        newTabButton.appendChild(closeButton);
        
        tabs.insertBefore(newTabButton, tabs.lastElementChild);
        
        // Crear contenido de la nueva pestaña
        var newTabContent = document.createElement('div');
        newTabContent.classList.add('tab-content');
        tabContents.appendChild(newTabContent);
        
        // Evento para cambiar a la pestaña al hacer clic
        newTabButton.addEventListener('click', function() {
            // Ocultar todos los contenidos de las pestañas
            var allTabs = tabContents.children;
            for (var i = 0; i < allTabs.length; i++) {
                allTabs[i].style.display = 'none';
            }
            
            // Mostrar solo el contenido de la pestaña seleccionada
            newTabContent.style.display = 'block';

            // Cargar el contenido de item.html en el iframe de la pestaña seleccionada
            newTabContent.innerHTML = '';
            var itemFrame = document.createElement('iframe');
            itemFrame.src = 'item.html';
            itemFrame.style.width = '100%';
            itemFrame.style.height = '100%';
            itemFrame.onload = function() {
                // Enviar el nombre de la pestaña al cargar el iframe
                itemFrame.contentWindow.postMessage('item ' + newTabButton.getAttribute('data-tab-id'), '*');
            };
            newTabContent.appendChild(itemFrame);
        });
        
        // Evento para cerrar la pestaña
        closeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // Eliminar el botón y su contenido asociado
            tabs.removeChild(newTabButton);
            tabContents.removeChild(newTabContent);
        });
    });
});
