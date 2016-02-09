$(document).ready(
  function(){

    myApp.managePlayerVimeo = (function() {

      var _vimPlayer, _script, _playerYT;

      function initScript(url) {
        var _script = document.createElement('script');
        _script.setAttribute('type', 'text/javascript');
        _script.setAttribute('src', url);

        firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(_script, firstScriptTag);
      }

      function initPlayer(config) {
        _vimPlayer = document.getElementById("playerVimeo");
        _vimPlayer.width = config.width;
        _vimPlayer.height = config.height;
        _vimPlayer.frameborder="0";
        _vimPlayer.setAttribute("webkitAllowFullScreen","");
        _vimPlayer.setAttribute("mozallowfullscreen","");
        _vimPlayer.setAttribute("allowFullScreen","");
        _playerYT = document.getElementById("player");
        _playerYT.parentElement.insertBefore(_playerYT, _vimPlayer);

      }

      function initializeJSONCallback() {
        window["getData"] = function(videos) {
          videos.forEach(function(video) {
            console.log(video);
            var videoData = {
              videoID: video["id"],
              title: video["title"],
              thumb: video["thumbnail_medium"],
              author: video["author"],
              source: "vimeo"
            };
            myApp.libraryManagement.addToCollection(videoData);
          });
        }
      }

      function playVideo(config, videoID) {
        var url = "http://vimeo.com/api/v2/video/" + videoID + ".json?callback=" + "getData";

        if (typeof _script === "undefined") {
            initScript(url);
            initializeJSONCallback();
        }
        if (typeof _vimPlayer === "undefined") {
          initPlayer(config, videoID);
        }
        loadVideoById(videoID);
        commonComponents.updateVideoPlayer("vimeo");

      }

      function loadVideoById(videoID) {
        _vimPlayer.src = "http://player.vimeo.com/video/" + videoID + "?api=1&player_id=playerVimeo";
      }


      return {
        playVideo: playVideo,
        loadVideoById: loadVideoById
      }


    }());
});
