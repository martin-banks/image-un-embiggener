module.exports = function (fns) {
  return [
    {
      label: 'App',
      submenu: [
        {
          role: 'about'
        },
        {
          role: 'quit',
          label: 'Quit',
        },
      ]
    },
  
    {
      label: 'File',
      submenu: [
        // {
        //   label: 'Open Files',
        //   accelerator: 'CmdOrCtrl+O',
        //   click () {
        //     fns.openFile()
        //   },
        // },
        {
          label: 'Choose Folder',
          accelerator: 'CmdOrCtrl+Shift+O',
          click () {
            fns.openFolder()
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
}
