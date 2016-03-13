'use strict';
// var play = require('play').Play;

Player.factory('MusicFactory', function($rootScope){

  var audio = document.createElement('audio');
  // audio.controls = true;
  var isPlaying = false;
  var currentSong;
  var currentList;
  var progress = 0;

  var MusicFactory = {};

  MusicFactory.preview = function(song){
    MusicFactory.start(song, null, true);
  }

  MusicFactory.start = function(song, list, preivew){
    var key;
    if(!preivew) key = 'thispath';
    else key = 'preview_url';

    audio.pause();
    console.log('starting: ', song, 'key is:', key, typeof key);
    audio.src = song[key];
    audio.load();
    audio.play();
    currentSong = song;
    if(!!list){
      currentList = list;
    }
    isPlaying = true;
  };

  MusicFactory.getCurrentSong = function(){
    return currentSong;
  };

  MusicFactory.getIsPlaying = function(){
    return isPlaying;
  }

  MusicFactory.pause = function(){
    audio.pause();
    isPlaying = false;
  };

  MusicFactory.resume = function(){
    audio.play();
    isPlaying = true;
  };

  MusicFactory.getProgress = function () {
    return progress;
  };

  MusicFactory.setProgress = function(fraction){
    var sec = audio.duration * fraction;
    audio.currentTime = sec;
  };

  function mod (num, m) { return ((num % m) + m) % m; };

  function skip (interval) {
    var index = currentList.indexOf(currentSong);
    index = mod(index + interval, currentList.length);
    MusicFactory.start(currentList[index], currentList);
  }

  MusicFactory.next = function () {
    skip(1);
  };

  MusicFactory.previous = function () {
    skip(-1);
  };


  audio.addEventListener('timeupdate', function(){
    progress = audio.currentTime/audio.duration;
    $rootScope.$evalAsync();
  });
  audio.addEventListener('ended', function(){
    console.log(currentSong, currentList);
    MusicFactory.next();
    $rootScope.$evalAsync();
  })
  return MusicFactory;
});

Player.directive('scrubberClick', ['MusicFactory', function(MusicFactory){
  return{
    restrict: 'A',
    link: function(scope, element){
      element.on('click', function(event){
        console.log(element)
        var newProgress = (event.clientX - element[0].offsetLeft)/element[0].clientWidth;
        MusicFactory.setProgress(newProgress);
      });
    }
  }
}])
