// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const fs = require('fs')

const processing = require('./processing')
const createDirs = require('./processing/create-directories')

const models = {
  demo: require('./image-models/demo')

}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      experimentalFeatures: true,
    },
    titleBarStyle: 'hiddenInset',
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3000')

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('models', models)
  })


  const menuTemplate = [
    {
      label: 'App',
      submenu: [
        {
          role: 'about'
        }
      ]
    },

    {
      label: 'File',
      submenu: [
        {
          label: 'Open Files',
          accelerator: 'CmdOrCtrl+O',
          click () {
            openFile()
          },
        },
        {
          label: 'Choose Folder',
          accelerator: 'CmdOrCtrl+Shift+O',
          click () {
            openFolder()
          },
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://github.com/martin-banks/image-un-embiggener') }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(menuTemplate)

  Menu.setApplicationMenu(menu)


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// Open file function
function openFile () {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: [ 'openFile' ],
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown'] },
    ]
  })
  // ! stop everything if no files are returned
  if (!files) return

  console.log({ files })
  const file = files[0]
  const fileContent = fs
    .readFileSync(file)
    .toString()

  console.log({ fileContent })

  // Send file content to the client renderer
  mainWindow.webContents.send('new-file', fileContent)
}


async function openFolder () {
  const folder = dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  })[0]

  if (!folder) return
  console.log({ folder })

  mainWindow.webContents.send('chosen-folder', folder)
  mainWindow.webContents.send('status', 'Files found')

}



ipcMain.on('start', async (e, content) => {
  const { folder, fileList } = content
  console.log({ fileList })
  try {
    await createDirs({
      model: models.demo,
      folder,
      mainWindow,
    })
    mainWindow.webContents.send('log', `Creating folderstructure`)

    await processing({
      fileList,
      path: folder,
      mainWindow,
      model: models.demo,
    })

    mainWindow.webContents.send('status', 'Processing complete')

    setTimeout(() => {
      mainWindow.webContents.send('status', 'Innactive')
      mainWindow.webContents.send('found-images', {})
    }, 5000)

  } catch (err) {
    mainWindow.webContents.send('status', `---ERROR---\n${err}`)
   throw err
 }
})






