var libraryManagement = (function() {

	var _movies;
	var _input;
	var _config;

	function init(config) {
		_config = config;
		initializeLibrary();
	}

	/* Load all the records from the storage */
	function initializeLibrary() {
		_movies = JSON.parse(localStorage.getItem("_movies"));
		if (_movies === null) {
			_movies = {};	
		}
		log(getLibraryCount());
	}

	/* Add new movie into library */
	function addMovie(linkID, title) {
		var imageSource = "http://img.youtube.com/vi/"+linkID+"/1.jpg"; 
		var date = Date();
		
		_movies[linkID] = {
			title: title,
			date: date,
			thumb: imageSource
		}
		localStorage.setItem("_movies", JSON.stringify(_movies));
	}

	function getMovies() {
		return _movies;
	}

	function clearRecords() {
		_movies = {};
		localStorage.clear();
	};

	function getLibraryCount() {
		if (_movies !== null) {
			return Object.keys(_movies).length;
		}
		return 0;
		
	}

	function log(s) {
		console.log(s)
	}


	
	function validateIfExists() {};
	function updateRecord() {};
	function getRecord() {};
	function deleteRecord() {};










	return {
		init: init,
		addMovie: addMovie,
		getMovies: getMovies,
		getLibraryCount: getLibraryCount,
		clearRecords: clearRecords
	}







}());



// other useful things

//paste in console in chrome
// for(var x in localStorage)console.log(x+"="+((localStorage[x].length * 2)/1024/1024).toFixed(2)+" MB");
