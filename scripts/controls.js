(function() {
  var player = document.querySelector('.player');
  var video = player.querySelector('.player-video').firstElementChild;
  var progress = player.querySelector('.progress');
  var progressFilled = player.querySelector('.filled-progress');
  var toggle = player.querySelector('.toggle-play');
  var skippers = player.querySelectorAll('[data-skip]');
  var ranges = player.querySelectorAll('.player-slider');

  var togglePlay = function() {
    var playState = video.paused ? 'play' : 'pause';
    video[playState](); 
  }
  
  var toggleMute = function() {
    var muteState = video.muted ? false : true;
    video.muted = muteState; 
  }
  
  var resetSpeed = function() {
    video.playbackRate = 1; 
  }

  var updateButton = function() {
    var togglePlayBtn = document.querySelector('.toggle-play');

    if (this.paused) {
      togglePlayBtn.innerHTML = '<svg class="" width="16" height="16" viewBox="0 0 16 16"><title>play</title><path d="M3 2l10 6-10 6z"></path></svg>';
    } else {
      togglePlayBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16"><title>pause</title><path d="M2 2h5v12H2zm7 0h5v12H9z"></path></svg>';
    }
  }

  var skip = function() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  var rangeUpdate = function() {
    video[this.name] = this.value;
  }

  var progressUpdate = function() {
    var percent = video.currentTime / video.duration * 100;
    progressFilled.style.flexBasis = percent + '%';
  }

  var scrub = function(e) {
    var scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = scrubTime;
  }

  // Event listeners

  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('click', toggleMute);
  video.addEventListener('click', resetSpeed);
  video.addEventListener('timeupdate', progressUpdate);

  toggle.addEventListener('click', togglePlay);
  skippers.forEach(function(button) {
    return button.addEventListener('click', skip);
  });
  ranges.forEach(function(range) {
    return range.addEventListener('change', rangeUpdate);
  });
  ranges.forEach(function(range) {
    return range.addEventListener('mousemove', rangeUpdate);
   });

  var mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', function(e) {
    return mousedown && scrub(e);
  });
  progress.addEventListener('mousedown', function() {
    return mousedown = true;
  });
  progress.addEventListener('mouseup', function() {
    return mousedown = false;
  });
})();