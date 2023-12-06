$(document).ready(function() {
	var expDiv = $("<div/>", {class: "expDiv"});
	expDiv.css("display", "none");
	$("body").append(expDiv);
	$(".helperbox").mouseenter(function() {
		var offset = $(this).offset();
		var width = parseInt($(this).css("width"));
		var height = parseInt($(this).css("height"));

		expDiv.html($(this).attr("text")); 
		expDiv.css("left", (offset.left + width + 15) + "px");
		expDiv.css("top", (offset.top - height/2) + "px");
		expDiv.css("display", "inline-block");
	})
	.mouseleave(function() {
		expDiv.css("display", "none");
	});
});