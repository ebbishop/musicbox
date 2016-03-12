'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const express = require('express');
const expressApp = require('express')();
const middleware=  require('./server/middleware');
const routes = require('./server')
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function onListening(port){
  console.log('listening on port', port)
}

function createWindow () {
  var port = 1985;
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 600, height: 500});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Set up express app:
  expressApp.use(logger('dev'));
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  // expressApp.use('/', routes);

  var server = http.createServer(expressApp);
  server.listen(port);
  server.on('error', console.error);
  server.on('listen', console.log);
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});


