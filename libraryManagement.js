$(document).ready(function(){


		myApp.libraryManagement = (function() {

		var _movies;
		var _input;
		var _config;
		var _favourMovies;

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

		/* Add new movie into library. If the movie for the given videoID doesnt exist
		new object is created. Otherwise existing objects needs only updating */
		function updateMovie(videoID, favourite, videoData) {
			if (_movies.hasOwnProperty(videoID)) {
				_movies[videoID].favourite = favourite;

			}
			else {
				var imageSource = "http://img.youtube.com/vi/"+videoID+"/1.jpg";
				var nowISOString = new Date().toISOString();
				var now = Date.now();

				var author = videoData["author"];
				var title = videoData["title"];
				var videoID = videoData["video_id"];

				_movies[videoID] = {
					title: title,
					date: nowISOString,
					dateNumber: now,
					thumb: imageSource,
					author: author,
					favourite: false,
					videoID: videoID

				}
				// myApp.libraryView.updateView(videoID);
			}
			myApp.libraryView.render();
			updateStorage();
		}

		function updateStorage() {
			localStorage.setItem("_movies", JSON.stringify(_movies));
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

		function getFavouriteCount() {
			if (_favourMovies !== null) {
				return Object.keys(_movies).length;
			}
			return 0;
		}

		function deleteMovie(linkID) {
			// find in the library movie by linkID
			delete _movies[linkID];
			--_movies["length"];
			updateStorage();
		}

		function getMovies() {
			return _movies;
		}

		function getFavouriteMovies() {
			_favourMovies = {};
			for(var prop in _movies) {
				if (_movies.hasOwnProperty(prop)) {
					if (_movies[prop].favourite) {
						_favourMovies[prop] = _movies[prop];
					}
				}
			}
			return _favourMovies;
		}

		/* option - sort option, 0 - newest, 1 - oldest
			favorite - favourite movies - true, otherwise - false	*/
		function sortMovies(favourite, option) {
			var movies = {};
			if (!favourite) {
				movies = getMovies();
			}
			else if (favourite) {
				movies = getFavouriteMovies();
			}

			var moviesArr = commonComponents.getSortedArray(movies, option);
			return moviesArr;
		}


		function log(s) {
			console.log(s)
		}



		function validateIfExists() {};
		function updateRecord() {};
		function getRecord() {};












		return {
			init: init,
			updateMovie: updateMovie,
			getMovies: getMovies,
			getLibraryCount: getLibraryCount,
			clearRecords: clearRecords,
			deleteMovie: deleteMovie,
			getFavouriteMovies: getFavouriteMovies,
			getFavouriteCount: getFavouriteCount,
			sortMovies: sortMovies
		}







	}());

});

// other useful things

//paste in console in chrome
// for(var x in localStorage)console.log(x+"="+((localStorage[x].length * 2)/1024/1024).toFixed(2)+" MB");
