$(document).ready(
	function(){

		window.myApp.libraryView = (function() {

		var _config, _input, _filterFav, _filterSort;

		function init(config) {
			_config = config;
			initalizeHandlers();
			displayThumbs();
		}

		function initalizeHandlers() {
			_input = document.getElementById("linkInput");
			button = document.getElementById("btnNewMovie");
			registerHandlersModule.addHandler(button, "click", inputHandler);
			var clearLib = document.getElementById("btnClearLib");
			registerHandlersModule.addHandler(clearLib, "click", clearHandler);
			_filterFav = document.getElementById("favouriteFilter");
			registerHandlersModule.addHandler(_filterFav, "click", filterFavHandler);
			_filterSort = document.getElementById("sortFilter");
			registerHandlersModule.addHandler(_filterSort, "click", filterSortHandler);
		}

		function inputHandler() { 
			value = _input.value;

			var link = value;

			var linkID = validateInput(link);
			if (linkID !== -1) {
				managePlayerYT.playVideo(_config, linkID);
				
			} 
			_input.value = "";
			
		}

		function clearHandler() {
			libraryManagement.clearRecords();
		}

		function filterFavHandler() {
			displayThumbs();
		}

		function filterSortHandler() {
			displayThumbs();
		} 

		function displayThumbs() {
			if (_filterSort.selectedIndex === 0) {
				sortMovies(1);
			}
			if(_filterSort.selectedIndex === 1) {
				sortMovies(1);
			}
			else if (_filterSort.selectedIndex === 2) {
				sortMovies(2);
			}
		}

		/* 1 - sort by the oldest, 2 - the newest */
		function getSortedArray(obj, sort) {
			var arr = [];
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)) {
					arr.push({
						'key': prop,
						'value': obj[prop] 
					});
				}
			}

			if(sort === 1) {
				arr.sort(function(a, b) {
					return a.value.dateNumber - b.value.dateNumber;
				});
			}
			else if(sort === 2) {
				arr.sort(function(a, b) {
					return a.value.dateNumber + b.value.dateNumber;
				});
			} 
			return arr;
		}

		function sortMovies(option) {
			var movies = {};
			if (_filterFav.selectedIndex === 0) {
				movies = myApp.libraryManagement.getMovies();
			}
			else if (_filterFav.selectedIndex === 1) {
				movies = myApp.libraryManagement.getFavouriteMovies();
			}

			var moviesArr = getSortedArray(movies, option);

			loadImages(moviesArr);

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


		var imgNo, imgLoaded;

		/* Get the list of all movies in the library and display them */
		function loadImages(movies) {
			var player = document.getElementById("player");
			var thumbs = document.getElementById("thumbs");
			thumbs.parentNode.removeChild(thumbs);
			var thumbs = document.createElement("div");
			thumbs.id = "thumbs";
			thumbs.setAttribute("class", "nav nav-tabs nav-stacked");

			player.parentNode.insertBefore(thumbs, player);

			// do the pagination here 

			imgNo = movies.length;
			imgLoaded = 0;

			if (movies instanceof Array) {
				for(var i = 0; i < movies.length; i++) {
					createThumb(movies[i].value);
				}
			}
			else {
				for(var prop in movies) { 
					if(movies.hasOwnProperty(prop)) {				
						createThumb(movies[prop]);
					}
				}
			}


		}

		function createThumb(movie) {
			var img = new Image();
			img.onload = function(event) {
				var thumb = event.currentTarget;
				myApp.libraryActions.createDropDownMenu(thumb, movie);
				imgLoaded++;

				if (imgLoaded === imgNo) {
					myApp.libraryPagination.init();
				}
			}
			img.src = movie.thumb;
			img.id = movie.videoID;
		}

		function updateView(linkID) {
			_filterFav.selectedIndex = 0;
			loadImages(libraryManagement.getMovies());
		}




		function log(s) {
			console.log(s);
		}


		return {
			init: init,
			updateView: updateView
		}

	}());
});