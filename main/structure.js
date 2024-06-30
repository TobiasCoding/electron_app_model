const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function() {
    var contenidoDiv = document.getElementById('top-bar');
    var topBarHTML = `
        <div class="top-bar">
            <button class="dropbtn responsive">Home</button>
            <div class="dropdown">
                <button class="dropbtn responsive">Sección 1</button>
                <div class="dropdown-content">
                    <a href="#" class="dropdown-link">Subsección 1</a>
                    <a href="#" class="dropdown-link">Subsección 2</a>
                    <a href="#" class="dropdown-link">Subsección 3</a>
                </div>
            </div>
        </div>
    `;
    contenidoDiv.innerHTML = topBarHTML;

    // Añadir listeners a los enlaces de navegación después de añadir el HTML dinámicamente
    document.querySelectorAll('.dropbtn, .dropdown-content a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.stopPropagation(); // Detener la propagación del evento
            const section = event.target.textContent.trim();
            try {
                navigateToSection(section);
                localStorage.setItem('currentSection', section); // Guardar sección en localStorage
    
                // Guardar todas las variables globales en localStorage
                saveGlobalVariablesToLocalStorage();
            } catch (error) {
                console.error('Error navigating to section:', error);
            }
        });
    });    

    // Función para guardar todas las variables globales en localStorage
    function saveGlobalVariablesToLocalStorage() {
        for (let key in window) {
            if (window.hasOwnProperty(key)){// && !isExcludedVariable(key)) {
                localStorage.setItem(key, JSON.stringify(window[key]));
            }
        }
    }

    // Función para excluir variables que no deben guardarse en localStorage
    function isExcludedVariable(variableName) {
        // Aquí puedes añadir nombres de variables que no deseas guardar
        return variableName.startsWith('_') || variableName === 'localStorage' || variableName === 'sessionStorage';
        // Ejemplo: Excluir variables que comienzan con '_' y otros casos específicos
    }
});

// Función para navegar a la sección indicada por nombre
function navigateToSection(section) {
    let sectionId = '';
    let route = '';

    console.log(section)

    switch (section) {
        case 'Home':
            sectionId = 'home-section';
            route = 'main/index.html';
            break;
        case 'Subsección 1':
            sectionId = 'section1-section';
            route = 'section1/sec1.html';
            break;
        // Añadir más casos para otras secciones si es necesario
        default:
            console.error('Unknown section:', section);
            return;
    }

    ipcRenderer.send('navigate', route); // Ajustar la ruta según sea necesario

    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazarse suavemente al inicio de la sección
    } else {
        console.error('Section element not found:', sectionId);
    }
}
