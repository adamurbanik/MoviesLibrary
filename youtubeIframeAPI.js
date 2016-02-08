$(document).ready(
	function(){

		myApp.managePlayerYT = (function () {
		// 2. This code loads the IFrame Player API code asynchronously.
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var _playerOptions, _player, _iFrame;

		function createPlayerOptions(config, videoID) {
			_playerOptions = {};
			_playerOptions.height = config.height;
			_playerOptions.width= config.width;
			_playerOptions.videoId = videoID;
			_playerOptions.events = {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		}

		function getPlayerOptions() {
			return _playerOptions;
		}

		function getPlayer() {
			return _player;
		}

		function createYTPlayer() {
			_player = new YT.Player('player', _playerOptions);
		}

		function initializePlayer(config, videoID) {
			createPlayerOptions(config, videoID);
			createYTPlayer();
		}

		// 3. This function creates an <iframe> (and YouTube player)
		//    after the API code downloads.
		function onYouTubeIframeAPIReady() {}

		// 4. The API will call this function when the video player is ready.
		function onPlayerReady(event) {
			event.target.playVideo();
			_iFrame = document.querySelector("iFrame");
		}

		// 5. The API calls this function when the player's state changes.
		//    The function indicates that when playing a video (state=1),
		//    the player should play for six seconds and then stop.
		function onPlayerStateChange(event) {
			if (event.data == YT.PlayerState.PLAYING) {
				setTimeout(stopVideo, 6000);
				myApp.libraryManagement.addToCollection(event.target.getVideoData());
			}

		}

		function playVideo(config, linkID) {
			if (typeof _iFrame === "undefined") {
				initializePlayer(config, linkID);
			}
			else {
				_player.loadVideoById(linkID);
			}
		}

		function stopVideo() {
			_player.stopVideo();
		}

		function playCustomVideo(linkID) {
			_iFrame.src = "http://www.youtube.com/embed/" + linkID + "?autoplay=1"
			frameborder="0";
		}


		function log(s) {
			console.log(s)
		}

		return {
			createPlayerOptions: createPlayerOptions,
			getPlayerOptions: getPlayerOptions,
			createYTPlayer: createYTPlayer,
			getPlayer: getPlayer,
			initializePlayer: initializePlayer,
			playVideo: playVideo,
			playCustomVideo: playCustomVideo

		}

	}());
});
