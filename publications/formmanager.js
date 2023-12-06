var controllers = {};
var controlleds = {};
var elements = [];
var minMaxElements = [];
var minDict = {};
var maxDict = {};

$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};

function isFloat(str) {
	return !isNaN(str);
}

function findElement(name) {
	var el = $("#"+name);
	if (el.length > 0)
		return el.eq(0);
	el = $("[name='" + name +"']");
	if (el.length > 0)
		return el.eq(0);
	el = $("[value='" + name +"']");
	if (el.length > 0)
		return el.eq(0);
	return null;
}

function checkElement(name) {
	var el = findElement(name);
	var list = controlleds[name];
	var v = true;
	for (var i = 0; i < list.length; i++)
	{
		var controller = findElement(list[i]);
		if (!controller.is(":checked")) {
			v = false;
			break;
		}
	}
	el.prop("disabled", !v);
}

function setRules(data) {

	for (var i = 0; i < data["controllers"].length; i++)
		controllers[data["controllers"][i]] = [];
	
	for (var i = 0; i < data["controlleds"].length; i++) 
		controlleds[data["controlleds"][i]] = [];

	elements = data["controlleds"];

	var disables = data["disables"];
	for (var controller in disables) {
	    if (disables.hasOwnProperty(controller)) {
	        var list = disables[controller];
	        for (var i = 0; i < list.length; i++) {
	        	controllers[controller].push(list[i]);
	    		controlleds[list[i]].push(controller);
	    	}
	    }
	}

	for (var i = 0; i < data["controllers"].length; i++) {
		var el = findElement(data["controllers"][i]);
		findElement(data["controllers"][i]).on('change', function() {
			for (var j = 0; j < elements.length; j++)
				checkElement(elements[j]);
		});
	}

	var numCheck = data["numberCheck"] ? data["numberCheck"] : [];
	for (var i = 0; i < numCheck.length; i++) {
		var el = findElement(numCheck[i]);
		el.on("change", function() {
			var e = $(this);
			if (!isFloat(e.val()))
				e.val(e.attr("defVal"));
		});
	}

	var minMaxOne = data["minMaxOne"] ? data["minMaxOne"] : [];
	for (var i = 0; i < minMaxOne.length; i++) {
		var el = findElement(minMaxOne[i]);
		el.on("change", function() {
			var e = $(this);
			if (e.hasAttr("minVal") && parseFloat(e.val()) < e.attr("minVal"))
				e.val(e.attr("minVal"));
		});
	}

	minMaxElements = data["minMaxElements"];

	for (var i = 0; i < minMaxElements.length; i++) {
		var el = findElement(minMaxElements[i]);
		el.attr("mm-rule", minMaxElements[i]);
		el.on("change", function() {
			var at = $(this).attr("mm-rule");
			if (minDict.hasOwnProperty(at)) {
				var maxEl = findElement(minDict[at]);
				if (parseFloat($(this).val()) > parseFloat(maxEl.val()))
					maxEl.val($(this).val());
				maxEl.attr("min", $(this).val());
			}
			else {
				var minEl = findElement(maxDict[at]);
				if (parseFloat($(this).val()) < parseFloat(minEl.val()))
					minEl.val($(this).val());
				minEl.attr("max", $(this).val());
			}
		});
	}

	var minMaxRel = data["minmax"];
	for (var i = 0; i < minMaxRel.length; i++) {
		minDict[minMaxRel[i][0]] = minMaxRel[i][1];
		maxDict[minMaxRel[i][1]] = minMaxRel[i][0];
	}

	for (var j = 0; j < elements.length; j++)
		checkElement(elements[j]);
}