var libraryView = (function() {

	var _config, _input, _filter;

	function init(config) {
		_config = config;
		initalizeHandlers();
		
		loadImages(1);
		
	}

	function initalizeHandlers() {
		_input = document.getElementById("linkInput");
		button = document.getElementById("btnNewMovie");
		registerHandlersModule.addHandler(button, "click", inputHandler);
		var clearLib = document.getElementById("btnClearLib");
		registerHandlersModule.addHandler(clearLib, "click", clearHandler);
		_filter = document.getElementById("favouriteFilter");
		registerHandlersModule.addHandler(_filter, "click", filterHandler);
	}

	function inputHandler() { 
		value = _input.value;

		// get the link 	
		var link = value;

		// get the linkID
		var linkID = validateInput(link);
		if (linkID !== -1) {
			managePlayerYT.playVideo(_config, linkID);
			
		} 
		_input.value = "";
		
	}

	function clearHandler() {
		libraryManagement.clearRecords();
	}

	function filterHandler() {
		if (_filter.value === "Wszystkie filmy") {
			loadImages(1);
		}
		else if (_filter.value === "Ulubione") {
			loadImages(2);
		}

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
	function loadImages(option) {
		var player = document.getElementById("player");
		var thumbs = document.getElementById("thumbs");
		thumbs.parentNode.removeChild(thumbs);
		var thumbs = document.createElement("div");
		thumbs.id = "thumbs";
		player.parentNode.insertBefore(thumbs, player);


		var movies, length;
		if (option === 1) {
			movies = libraryManagement.getMovies();			
		}
		else if (option === 2) {
			movies = libraryManagement.getFavouriteMovies();
		}

		for(var prop in movies) { 
			if(movies.hasOwnProperty(prop)) {				
				createThumb(prop);
			}
		}
	}

	function createThumb(videoID) {
		var movies = libraryManagement.getMovies();
		var img = new Image();
		img.onload = function(event) {
			var thumb = event.currentTarget;

			libraryActions.createDropDownMenu(thumb);	
		}
		img.src = movies[videoID].thumb;
		img.id = videoID;
	}



	// update the view i.e. libraryView.Refresh - delete the thumb in the view plus delete the video player
	function updateView(linkID, activity) {
		if (activity === 1) {
			createThumb(linkID);
		}
		else if (activity === 2) {

		}
	}



	function log(s) {
		console.log(s);
	}


	return {
		init: init,
		updateView: updateView
	}

}());