document.addEventListener('DOMContentLoaded', function() {
    // Función para agregar una nueva item
    document.getElementById('new-tab').addEventListener('click', function() {
        var tabContainer = document.querySelector('.tabs');
        var tabContents = document.querySelector('.tab-content');
        
        // Verificar que tabContents no sea null antes de proceder
        if (!tabContents) {
            console.error('Elemento .tab-contents no encontrado');
            return;
        }
        
        // Crear el botón de la nueva item
        var newTabButton = document.createElement('button');
        newTabButton.textContent = 'item ' + (tabContainer.childElementCount);
        
        // Crear el botón de cierre de la item
        var closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.classList.add('close-button');
        newTabButton.appendChild(closeButton);
        
        tabContainer.insertBefore(newTabButton, tabContainer.lastElementChild);
        
        // Crear el contenido de la nueva item
        var newTabContent = document.createElement('div');
        newTabContent.classList.add('tab-content');
        tabContents.appendChild(newTabContent);
        
        // Evento para cambiar de item al hacer clic
        newTabButton.addEventListener('click', function() {
            // Ocultar todos los contenidos de las items
            var allTabs = tabContents.children;
            for (var i = 0; i < allTabs.length; i++) {
                allTabs[i].style.display = 'none';
            }
            
            // Mostrar solo el contenido de la item seleccionada
            newTabContent.style.display = 'block';
        });
        
        // Evento para cerrar la item
        closeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // Eliminar el botón y su contenido asociado
            tabContainer.removeChild(newTabButton);
            tabContents.removeChild(newTabContent);
        });
        
        // Cargar contenido de item.html en la nueva item
        fetch('item.html')
            .then(response => response.text())
            .then(data => {
                newTabContent.innerHTML = data;
                
                // Cargar el nombre del ítem desde item.js
                fetch('item.js')
                    .then(response => response.text())
                    .then(scriptData => {
                        // Ejecutar el script para obtener el nombre del ítem
                        var scriptElement = document.createElement('script');
                        scriptElement.textContent = scriptData;
                        newTabContent.appendChild(scriptElement);
                    })
                    .catch(error => {
                        console.error('Error fetching item.js', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching item.html', error);
            });
    });
});