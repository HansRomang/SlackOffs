
//document will wait to run until javascript is ready
$(document).ready();

//establishing variables
var walmartPrice = "6";
var otherPrice = "6";
var difference = "";

//function to get cursor to automatically go to Search input field of form
function setFocus() {
	var input = document.getElementById("searchBar");
	input.focus();
	console.log("ran setFocus");
}

// gets cursor to return to Search input field
setFocus();

//function to call walmart API
function walmartDisplay(search) {

	var walmartItem = search;
	console.log(walmartItem);

	var queryURL = "https://api.walmartlabs.com/v1/search?apiKey={yjrkwv9phtddy72qkfxg4v33}&lsPublisherId={romanghans}&query=" + walmartItem + "&categoryId=3944&sort=price&order=asc";
	//linking our search term "walmartItem" into our queryURL

	$.ajax({
		// Access-Control-Allow-Origin: to eliminate cross origin request blocked error
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);
		var walmartDiv = $("<div class='walmartDiv'");

		var walmartPrice = response.salesPrice; //remove var to fix scope

		var walmartPriceText = $("<p>").text(walmartPrice);

		walmartDiv.append(walmartPriceText);


	});

	//repeat code for other API here

};

//when search button is clicked- calls both APIs, compares prices, etc
$(".button").on("click", function (event) {

	event.preventDefault();
	
	var walmartInput = $("#searchBar").val().trim();
	
	//clear search field after clicking submit button to prepare for next search
	$("#searchBar").empty();

	//call walmart API with walmartDisplay(walmartInput);

	//call other API with otherVendorDisplay(otherInput);

	//if walmart price is less
	if (walmartPrice < otherPrice) {
		difference = parseFloat(otherPrice) - parseFloat(walmartPrice);
		var comparisonDiv = $("<div>");
		comparisonDiv.addClass("comparisonDiv")
		var comparisonText = $("<p>").text("The Walmart price is $" + difference.toFixed(2) + " cheaper than other store.");
		$(".comparison-area").append(comparisonText);
	}
	//if other store price is less
	else if (otherPrice < walmartPrice) {
		difference = parseFloat(walmartPrice) - parseFloat(otherPrice);
		console.log("The other store price is " + difference + " cheaper than Walmart.");
		var comparisonDiv = $("<div>");
		comparisonDiv.addClass("comparisonDiv")
		var comparisonText = $("<p>").text("The other store price is $" + difference.toFixed(2) + " cheaper than Walmart.");
		$(".comparison-area").append(comparisonText);
	}
	//if they are the same price at both sites
	else {
		var comparisonDiv = $("<div>");
		comparisonDiv.addClass("comparisonDiv")
		var comparisonText = $("<p>").text("The price is the same at both sites.");
		$(".comparison-area").append(comparisonText);
	}

});