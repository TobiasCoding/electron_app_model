const { ipcMain } = require('electron');
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
        db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            lastname TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error al crear la tabla:', err.message);
            } else {
                console.log('Tabla "items" obtenida.');
            }
        });
    }
});

// Función para obtener el nombre y apellido del usuario con id 1
function getItemById(id, callback) {
    db.get('SELECT name, lastname FROM items WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err.message);
            callback(null);
        } else {
            callback(row);
        }
    });
}

// Evento para manejar la consulta desde el renderer
ipcMain.handle('get-item', async (event, id) => {
    return new Promise((resolve, reject) => {
        getItemById(id, (item) => {
            if (item) {
                resolve(item);
            } else {
                reject(new Error('Item no encontrado'));
            }
        });
    });
});

// Cerrar la base de datos cuando la ventana se cierra
app.on('window-all-closed', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err.message);
        } else {
            console.log('Base de datos SQLite cerrada.');
        }
    });
});
