'use strict';
// var play = require('play').Play;

Player.factory('MusicFactory', function($rootScope){

  var audio = document.createElement('audio');
  // audio.controls = true;
  var playing = false;
  var currentSong;
  var progress = 0;

  var MusicFactory = {};

  MusicFactory.preview = function(song){
    MusicFactory.start(song, true);
  }

  MusicFactory.start = function(song, preivew){
    var key;
    if(!preivew) key = 'thispath';
    else key = 'preview_url';

    audio.pause();
    console.log('starting: ', song, 'key is:', key, typeof key);
    audio.src = song[key];
    console.log(audio);
    audio.load();
    audio.play();
    currentSong = song;
    playing = true;
  };

  MusicFactory.getCurrentSong = function(){
    return currentSong;
  }

  MusicFactory.pause = function(){
    audio.pause();
    playing = false;
  };

  MusicFactory.resume = function(){
    audio.play();
    playing = true;
  };

  MusicFactory.getProgress = function () {
    return progress;
  };

  MusicFactory.setProgress = function(fraction){
    var sec = audio.duration * fraction;
    audio.currentTime = sec;
  };

  audio.addEventListener('timeupdate', function(){
    progress = audio.currentTime/audio.duration;
    $rootScope.$evalAsync();
  });

  return MusicFactory;
});

