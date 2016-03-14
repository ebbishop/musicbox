'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var express = require('express');
var expressApp = require('express')();
var middleware=  require('./server/middleware');
var routes = require('./server');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var http = require('http');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function onListening(port){
  console.log('listening on port', port);
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


// mainWindow.on('app-command', function(e, cmd) {
//   // Navigate the window back when the user hits their mouse back button
//   if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
//     mainWindow.webContents.goBack();
//   }
// });
