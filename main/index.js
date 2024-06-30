///////////////////////////////////////////////////////////////////////////////////7
// document.getElementById('new-tab').addEventListener('click', () => {
//     const tabContent = document.querySelector('.tab-content');
//     const newTab = document.createElement('div');
//     newTab.className = 'tab';
//     newTab.textContent = 'Nueva Pestaña';
//     tabContent.appendChild(newTab);
// });
///////////////////////////////////////////////////////////////////////////////////7

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta de la base de datos
const dbPath = path.join(__dirname, 'database.db');

// Crear o abrir la base de datos
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');

        // Crear la tabla si no existe
        db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error al crear la tabla:', err.message);
            } else {
                console.log('Tabla "user" obtenida.');
            }
        });
    }
});

// Función para obtener el nombre del usuario con id 1
function getUserById(id, callback) {
    db.get('SELECT name FROM user WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err.message);
            callback(null);
        } else {
            callback(row ? row.name : null);
        }
    });
}

var user_name;

// Añadir un listener para el botón de nueva pestaña
document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('new-tab').addEventListener('click', () => {
    var user_id = 1;

    getUserById(user_id, (name) => {
        console.log(name)
        const tabContent = document.querySelector('.tab-content');
        const newTab = document.createElement('div');
        newTab.className = 'tab';
        newTab.textContent = name ? `Usuario: ${name}` : 'Usuario no encontrado';
        user_name = name ? `Usuario: ${name}` : 'Usuario no encontrado';
        
        const name_h1 = document.getElementById('user-name');
        name_h1.textContent = user_name;

        tabContent.appendChild(newTab);
    // });
    });
});



// Cerrar la base de datos cuando la ventana se cierra
window.addEventListener('beforeunload', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err.message);
        } else {
            console.log('Base de datos SQLite cerrada.');
        }
    });
});

