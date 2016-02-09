var commonComponents = (function() {

	/* Function overwrites given obj1 with values of obj2 as long as the property is the same */
	function overwrite(obj1, obj2) {
		for (var prop in obj1) {
			if (obj2.hasOwnProperty(prop)) {
				obj1[prop] = obj2[prop];
			}
		}
		return obj1;
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
		return sortArray(arr, sort);
	}

	function sortArray(arr, sort) {
		if(sort === 0) {
			arr.sort(function(a, b) {
				return a.model.dateNumber - b.model.dateNumber;
			});
		}
		else if(sort === 1) {
			arr.sort(function(a, b) {
				return a.model.dateNumber + b.model.dateNumber;
			});
		}
		return arr;
	}

	/* Show player 1, Hide player 2*/
	function updateVideoPlayer(playerName) {
		var ytplayer = document.getElementById("player");
		var vimplayer =  document.getElementById("playerVimeo");

		if (playerName === "youtube") {
			showPlayer(ytplayer);
			hidePlayer(vimplayer);
		}
		else if (playerName === "vimeo") {
			showPlayer(vimplayer);
			hidePlayer(ytplayer);
		}
	}

	function showPlayer(player) {
		if (player.classList.contains("playerHide")) {
			player.classList.remove("playerHide");
		}
		player.classList.add("playerShow");
	}

	function hidePlayer(player) {
		if (player.classList.contains("playerShow")) {
			player.classList.remove("playerShow");
		}
		player.classList.add("playerHide");
	}

	function calculateDimensions(config, img) {
    var maxWidth = config.thumbWidth;
    var maxHeight = config.thumbHeight;
    var ratio = 0;
    var width = img.width;
    var height = img.height;
    var positionX = 0;
    var positionY = 0;

    if (width > maxWidth) {
      ratio = maxWidth / width;
      height = height * ratio;
      width = width * ratio;
    }
    if (height > maxHeight) {
      ratio = maxHeight / height;
      width = width * ratio;
      height = height * ratio;
    }

    positionY = (maxHeight - height) / 2;
    positionX = (maxWidth - width) / 2;

    var dimensionsObj = {
      "width" : width,
      "height" : height,
      "positionY" : positionY,
      "positionX" : positionX
    };

    return dimensionsObj;

  }

	function log(s) {
		console.log(s)
	}



	return {
		overwrite: overwrite,
		getSortedArray: getSortedArray,
		sortArray: sortArray,
		showPlayer: showPlayer,
		hidePlayer: hidePlayer,
		updateVideoPlayer: updateVideoPlayer,
		calculateDimensions: calculateDimensions,
		log: log
	}

}());
