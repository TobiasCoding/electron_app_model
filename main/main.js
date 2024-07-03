const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");


let mainWindow;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html")); // puede que al compilarse esto del __dirname genere conflictos
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("navigate", (event, arg) => {
  if (mainWindow) {
    mainWindow
      .loadFile(path.join(path.dirname(__dirname), arg))
      .then(() => {
        mainWindow.webContents.send("load-section", arg);
      })
      .catch((error) => {
        console.error("Error loading file:", error);
      });
  }
});

require('./db_handler.js');
