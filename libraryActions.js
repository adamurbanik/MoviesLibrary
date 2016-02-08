$(document).ready(
	function(){
		myApp.libraryActions = (function() {

			var _config;

			function init(config) {
				_config = config;
				initializeThumbMenu();
			}

			/* When the user clicks on the thumb,
			toggle between hiding and showing the dropdown content */
			function manageThumbMenu(thumbID) {
				checkDropClassList();
				document.getElementById(thumbID + "_IDdiv").classList.toggle("show");
			}

			function initializeThumbMenu() {
				// Close the dropdown menu if the user clicks outside of it
				window.onclick = function(event) {
					if (!event.target.matches('.thumb')) {
						checkDropClassList();
					}
				}
			}

			function checkDropClassList() {
				var dropdowns = document.getElementsByClassName("dropdown-content");
				var i;
				for (i = 0; i < dropdowns.length; i++) {
					var openDropdown = dropdowns[i];
					if (openDropdown.classList.contains('show')) {
						openDropdown.classList.remove('show');
					}
				}
			}

			function createDropDownMenu(thumb, movie) {
				var div1 = document.createElement("div");
				div1.className = "dropdown";
				div1.classList.add("thumbs-el");

				thumb.className = "thumb";

				div1.appendChild(thumb);
				registerHandlersModule.addHandler(thumb, "click", thumbHandler);

				createParagraphElem(div1, "Tytuł: " + movie.model["title"]);
				createParagraphElem(div1, "Author: " + movie.model["author"]);
				createParagraphElem(div1, "Data: " + movie.model["date"] );
				createParagraphElem(div1, "Ulubiony: " + movie.model["favourite"]);
				createParagraphElem(div1, "Ilość polubień: " + movie.model["favourCount"]);
				createParagraphElem(div1, "Ilość odtworzeń: " + movie.model["viewingCount"]);

				var div2 = document.createElement("div");
				div2.id = thumb.id+"_IDdiv";
				div2.className = "dropdown-content";
				createLink(div2, "Odtwarzaj", movie.model.videoID, "1");
				createLink(div2, "Usuń", movie.model.videoID, "2");
				createLink(div2, "Dodaj do ulubionych", movie.model.videoID, "3");

				div1.appendChild(div2);

				document.getElementById(_config.thumbs).appendChild(div1);


			}

			function createParagraphElem(parentElement, text) {
				var p = document.createElement("p");
				var text = document.createTextNode(text);
				p.appendChild(text);
				parentElement.appendChild(p);
			}


			function thumbHandler(event) {
				manageThumbMenu(event.currentTarget.id);
			}


			function createLink(parentElement, text, id, href) {
				var a = document.createElement("a");
				a.href = "#"+href;
				a.id = id;
				var text = document.createTextNode(text);
				a.appendChild(text);
				registerHandlersModule.addHandler(a, "click", linkHandler);
				parentElement.appendChild(a);
			}

			function linkHandler(event) {

				var text = event.currentTarget.text;
				switch(text) {
					case "Odtwarzaj":
					playVideo(event.currentTarget.id);
					break;

					case "Usuń":
					deleteMovie(event.currentTarget.id)
					break;

					case "Dodaj do ulubionych":
					addFavourite(event.currentTarget.id);
					break;

				}

			}

			function playVideo(linkID) {
				// if ()

				myApp.managePlayerYT.playVideo(_config, linkID);
				// document.getElementById('player').setAttribute("class", "hide");



			}

			function deleteMovie(linkID) {
				deleteThumbMenu(linkID);
				myApp.libraryManagement.deleteMovie(linkID);
			}

			function addFavourite(linkID) {
				myApp.libraryManagement.markVideoAsFavour(linkID, true);
			}


			function deleteThumbMenu(linkID) {
				var img = document.getElementById(linkID);
				var dropdown = img.parentElement;
				dropdown.parentElement.removeChild(dropdown);
			}

			function log(s) {
				console.log(s)
			}

			return {
				init: init,
				createDropDownMenu: createDropDownMenu,
				thumbHandler: thumbHandler
			}


		}());
});
