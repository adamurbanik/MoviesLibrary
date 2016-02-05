$(document).ready(
	function(){

		myApp.libraryView = (function() {

		var _config, _input, _filterFav, _filterSort, _paginType;

		function init(config) {
			_config = config;
			initalizeHandlers();
			render();
		}

		function initalizeHandlers() {
			_input = document.getElementById("linkInput");
			button = document.getElementById("btnNewMovie");
			registerHandlersModule.addHandler(button, "click", inputHandler);

			var clearLib = document.getElementById("btnClearLib");
			registerHandlersModule.addHandler(clearLib, "click", clearHandler);

			_filterFav = document.getElementById("favouriteFilter");
			registerHandlersModule.addHandler(_filterFav, "change", render);

			_filterSort = document.getElementById("sortFilter");
			registerHandlersModule.addHandler(_filterSort, "change", render);

			_paginType = document.getElementById("paginType");
			registerHandlersModule.addHandler(_paginType, "change", render);

			_paginNumber = document.getElementById("paginNumber");
			registerHandlersModule.addHandler(_paginNumber, "change", render);

			registerHandlersModule.addHandler(document.body, "collection:sync", render);
		}

		function inputHandler() {
			value = _input.value;

			var link = value;

			var linkID = validateInput(link);
			if (linkID !== -1) {
				myApp.managePlayerYT.playVideo(_config, linkID);
			}
			_input.value = "";
		}

		function clearHandler() {
			myApp.libraryManagement.clearRecords();
		}

		function getPaginNumber() {
			var paginOption = _paginNumber.options.selectedIndex;
			var paginNo = _paginNumber[paginOption].value;
			return paginNo;
		}

		function getPaginType() {
			return paginType.selectedIndex;
		}

		function displayThumbs() {
				var movies = myApp.libraryManagement.sortMovies(_filterFav.selectedIndex, _filterSort.selectedIndex)
				loadImages(movies);
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

		/* remove existing thumbs element and create empty one*/
		function prepareThumbs() {
			var player = document.getElementById("player");
			var thumbs = document.getElementById("thumbs");
			thumbs.parentNode.removeChild(thumbs);
			var thumbs = document.createElement("div");
			thumbs.id = "thumbs";
			thumbs.setAttribute("class", "nav nav-tabs nav-stacked");
			player.parentNode.insertBefore(thumbs, player);
		}



		var imgNo, imgLoaded;

		/* Get the list of all movies in the library and display them */
		function loadImages(movies) {
			prepareThumbs();
			createThumbs(movies);
		}

		function createThumbs(movies) {
			imgNo = movies.length;
			imgLoaded = 0;

			if(movies instanceof Array) {
				movies.forEach(function(movie) {
					createThumb(movie);
				});
			}
		}


		function createThumb(movie) {
			var img = new Image();
			img.onload = function(event) {
				var thumb = event.currentTarget;
				myApp.libraryActions.createDropDownMenu(thumb, movie);
				imgLoaded++;

				if (imgLoaded === imgNo) {
					myApp.libraryPagination.init(getPaginType(), getPaginNumber());
				}
			}
			img.src = movie.model.thumb;
			img.id = movie.model.videoID;
		}

		function updateView(linkID) {
			_filterFav.selectedIndex = 0;
			render();
		}

		function render() {
			myApp.libraryPagination.removePagination();
			displayThumbs();
		}


		function log(s) {
			console.log(s);
		}


		return {
			init: init,
			render: render
		}

	}());
});
