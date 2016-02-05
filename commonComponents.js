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





	return {
		overwrite: overwrite,
		getSortedArray: getSortedArray,
		sortArray: sortArray
	}

}());
