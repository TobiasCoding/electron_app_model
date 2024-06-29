const { ipcRenderer } = require('electron');

// Añadir listeners a los enlaces de navegación
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        const section = event.target.textContent.trim();
        if (section === 'Home') {
            ipcRenderer.send('navigate', 'index.html');
        }
        if (section === 'Sección 1') {
            ipcRenderer.send('navigate', 'section1.html');
        }
        // Puedes agregar más condiciones para otras secciones
    });
});


