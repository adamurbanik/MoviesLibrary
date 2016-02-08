$(document).ready(
  function(){

    myApp.managePlayerVimeo = (function() {

      var _vimPlayer, _script;





      function initScript(videoID, callback) {
        _script = document.createElement("script");
        _script.type = "text/javascript";
        firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(_script, firstScriptTag);
      }

      function initializePlayer(config, videoID) {
        if (typeof _script === "undefined") {
          initScript();
        }
        setScriptSrc(videoID, showThumbs);


        _vimPlayer = document.createElement("iframe");
        _vimPlayer.src = "http://player.vimeo.com/video/" + videoID + "?api=1&player_id=playerVimeo";
         _vimPlayer.width = config.width;
         _vimPlayer.height = config.height;
         _vimPlayer.frameborder="0";
         _vimPlayer.setAttribute("webkitAllowFullScreen","");
         _vimPlayer.setAttribute("mozallowfullscreen","");
         _vimPlayer.setAttribute("allowFullScreen","");
         _vimPlayer.id = "playerVimeo";

         var playerYT = document.getElementById("player");
         playerYT.parentElement.insertBefore(_vimPlayer, playerYT);

         registerHandlersModule.addHandler(_vimPlayer, "ready", vimPlayerHandler);
      }

      function setScriptSrc(videoID, callback) {
        var url = "http://vimeo.com/api/v2/video/" + videoID + ".json?callback=" + callback;
        _script.src = url;
      }

      function vimPlayerHandler(e) {
        commonComponents.log(e);
      }

      function playVideo(config, videoID) {
        if (typeof _vimPlayer === "undefined") {
          initializePlayer(config, videoID);
        }
        showPlayer();
        loadVideoById(videoID);
      }

      function loadVideoById(videoID) {
        _vimPlayer.src="http://player.vimeo.com/video/" +videoID+ "?api=1&player_id=playerVimeo";
      }

      function showPlayer() {
        if (_vimPlayer.classList.contains("playerHide")) {
          _vimPlayer.classList.remove("playerHide");
        }
        _vimPlayer.classList.add("playerShow");
      }

      function hidePlayer() {
        if (_vimPlayer.classList.contains("playerShow")) {
          _vimPlayer.classList.remove("playerShow");
        }
        _vimPlayer.classList.add("playerHide");
      }


      return {
        playVideo: playVideo,
        showPlayer: showPlayer,
        hidePlayer: hidePlayer,
        initializePlayer: initializePlayer,
        loadVideoById: loadVideoById
      }


    }());
});
