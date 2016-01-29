var libraryView = (function() {

	var _config;

	function init(config) {
		_config = config;
		initalizeHandlers();
		
		loadImages();
		
	}

	function initalizeHandlers() {
		input = document.getElementById("linkInput");
		button = document.getElementById("btnNewMovie");
		registerHandlersModule.addHandler(button, "click", inputHandler);
		var clearLib = document.getElementById("btnClearLib");
		registerHandlersModule.addHandler(clearLib, "click", clearHandler);

	}

	function inputHandler() { 
		value = input.value;

		// get the link 	
		var link = value;

		// get the linkID
		var linkID = validateInput(link);
		if (linkID !== -1) {
			managePlayerYT.initializePlayer(config, linkID);	
		} 
	}

	function clearHandler() {
		libraryManagement.clearRecords();
	}

	function validateInput(link) {
		return getYouTubeID(link);
	}

	function getYouTubeID(url) {
		var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match && match[2].length === 11) {
			return match[2];
		} else {
			return -1;
		}
	}

	/* Get the list of all movies in the library and display them */
	function loadImages() {
		var movies = libraryManagement.getMovies();
		var length = libraryManagement.getLibraryCount();

		for(var prop in movies) { 
			if(movies.hasOwnProperty(prop)) {
				
				var img = new Image();
				img.onload = function(event) {
					var thumb = event.currentTarget;

					libraryActions.createDropDownMenu(thumb);


				}
				img.src = movies[prop].thumb;
				img.id = prop;
			}
		}
	}







	// function thumbHandlerOut(event) {
	// 	manageThumbMenu(event.currentTarget.id);
	// }









	function removePlayer() {
		// // var player = document.getElementById("player");
		// // var player = document.querySelector("iFrame");
		// var elemlist = document.getElementsByTagName("iFrame");

		// log(elemlist);

		// if(elemlist.length > 0) {
		// 	var player = elemlist[0];
		// 	player.parent.removeChild(player);	
		// }
		

	}




	/* open the movie for the clicked element*/
	function openSource(event) {

	}

	function log(s) {
		console.log(s)
	}


	return {
		init: init
	}

}());