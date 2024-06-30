const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true, // Esto activa el modo de pantalla completa
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));  // puede que al compilarse esto del __dirname genere conflictos
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


ipcMain.on('navigate', (event, arg) => {
    if (mainWindow) {
        mainWindow.loadFile(path.join(path.dirname(__dirname), arg)).then(() => {
            mainWindow.webContents.send('load-section', arg);
        }).catch((error) => {
            console.error('Error loading file:', error);
        });
    }
});