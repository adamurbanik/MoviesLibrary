$(document).ready(function(){


		myApp.libraryManagement = (function() {

		var _moviesArr;
		var _moviesArrFavour;
		var _input;
		var _config;

		function init(config) {
			_config = config;
			initializeLibrary();
		}

		/* Load all the records from the storage */
		function initializeLibrary() {
			var result = [];
			_moviesArr = JSON.parse(localStorage.getItem("_movies")) || [];
			console.log(_moviesArr);
		}

		function createModel(videoData) {
			var videoId = videoData["video_id"] || videoData["videoID"];
			var model = {
				title: videoData["title"],
				date: new Date().toISOString(),
				dateNumber: Date.now(),
				thumb: videoData["thumb"],
				author: videoData["author"],
				favourite: videoData["favourite"] || false,
				videoID: videoId,
				favourCount: 0,
				viewingCount : videoData["viewingCount"] || 0,
				source: videoData["source"]
			};

			return {
				model: model
			}
		}

		function addToCollection(videoData) {
			var videoId = videoData["video_id"] || videoData["videoID"];
			if(getMovieByVideoId(videoId) !== -1) {
				increaseViewingTimes(videoId);
			}
			else {
				_moviesArr.push(createModel(videoData));
				updateStorage();
			}
		}

		function updateStorage() {
			localStorage.setItem("_movies", JSON.stringify(_moviesArr));
			myApp.libraryView.render();
			// document.body.dispatchEvent(new Event('collection:sync'));
		}

		function clearRecords() {
			_moviesArr = [];
			updateStorage();
		};

		function getLibraryCount() {
			if (typeof _moviesArr === "array") {
				return _moviesArr.length;
			}
			return 0;
		}

		function getFavouriteCount() {
			if (typeof _moviesArrFavour === "array") {
				return _moviesArrFavour.length;
			}
			return 0;
		}

		function getMovieByVideoId(videoID) {
			for (var i = 0; i < _moviesArr.length; i++) {
				if (_moviesArr[i].model.videoID == videoID) {
					return _moviesArr[i];
				}
			}
			return -1;
		}

		function markVideoAsFavour(videoId) {
			var vid = getMovieByVideoId(videoId);
			_moviesArr[_moviesArr.indexOf(vid)].model.favourite = true;
			_moviesArr[_moviesArr.indexOf(vid)].model.favourCount++;
			updateStorage();
		}

		function increaseViewingTimes(videoId) {
			var vid = getMovieByVideoId(videoId);
			_moviesArr[_moviesArr.indexOf(vid)].model.viewingCount++;
			updateStorage();
		}

		function deleteMovie(videoID) {
			var vid = getMovieByVideoId(videoID);
			_moviesArr.splice(vid, 1);
			updateStorage();
		}

		function getMovies() {
			return _moviesArr;
		}

		function getFavouriteMovies() {
			_moviesArrFavour = [];
			_moviesArr.forEach(function(element) {
				if(element.model.favourite) {
					_moviesArrFavour.push(element);
				}
			});
			return _moviesArrFavour;
		}

		/* option - sort option, 0 - newest, 1 - oldest
			favorite - favourite movies - true, otherwise - false	*/
		function sortMovies(favourite, sort) {
			var movies = [];

			if (favourite === 0) {
				movies = getMovies();
			}
			else if (favourite === 1) {
				movies = getFavouriteMovies();
				console.log('movies', movies)
			}
			return commonComponents.sortArray(movies, sort);
		}


		function log(s) {
			console.log(s)
		}



		return {
			init: init,
			getMovies: getMovies,
			getLibraryCount: getLibraryCount,
			clearRecords: clearRecords,
			deleteMovie: deleteMovie,
			getFavouriteMovies: getFavouriteMovies,
			getFavouriteCount: getFavouriteCount,
			sortMovies: sortMovies,
			addToCollection: addToCollection,
			markVideoAsFavour: markVideoAsFavour,
			increaseViewingTimes: increaseViewingTimes,
			getMovieByVideoId: getMovieByVideoId
		}

	}());

});

// other useful things

//paste in console in chrome
// for(var x in localStorage)console.log(x+"="+((localStorage[x].length * 2)/1024/1024).toFixed(2)+" MB");
