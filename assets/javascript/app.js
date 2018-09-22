var eBayPrice
var eBayApiReturned = false;
var walmartPrice
var walmartApiReturned = false;
$(function () {
	var count;

	$("#call").on("click", function () {
		event.preventDefault();
		$("#comparisons").empty();
		$("#walmartItemInfo").empty()
		$("#more").addClass("d-none")
		search = $("#search").val()
		count = 1
		walmartCall(search, count)
	})






	function walmartCall() {
		$.ajax({
			url: `http://api.walmartlabs.com/v1/search?`,
			method: "GET",
			data: {
				"query": search
				, "format": "json"
				, "apiKey": "p3dsfmf2vhm67rj2ed4xhhaa"
				, "start": count
				, "numItems": 1

				// , "$where": "deptname=''"
			}
			// http://api.walmartlabs.com/v1/search?&%24q=phone&%24apiKey=p3dsfmf2vhm67rj2ed4xhhaa&%24format=json

		}).then(function (response) {
			console.log(response);

			for (i = 0; i < response.items.length; i++) {
				var card = $("<div>")
				card.attr({
					class: "card d-inline-block m-2",
					style: "width: 100%; margin: 0;"
				})

				var image = $("<img>")
				image.attr({
					src: response.items[i].mediumImage,
					class: "card-img-top"
				})

				var cardBody = $("<div>")
				cardBody.attr("class", "card-body")

				var name = $("<h5>")
				name.attr("class", "card-title")
				name.append(response.items[i].name)
				cardBody.append(name)

				msrp = "$" + response.items[i].msrp


				if (msrp === "$undefined")
					msrp = ""

				var name = $("<h5>")
				name.attr("class", "card-title")
				name.append("$" + response.items[i].salePrice + " <s>" + msrp + "</s>")
				cardBody.append(name)




				var name = $("<h5>")
				name.attr("class", "card-title")
				name.append("UPC: " + response.items[i].upc)
				cardBody.append(name)



				card.append(image)
				card.append(cardBody)


				$("#walmartItemInfo").append(card)


			}
		



		})


	}




})


//Firebase
var search = document.getElementById("search");

var call = document.getElementById(call);

function submitClick() {

	var firebaseRef = firebaseRef.database().ref();

	var messageText = search.value;

	firebaseRef.push().set(messageText);

}

$("#more").on("click", function () {
	search = $("#search").val()
	walmartCall(search, count)
})

// Parse the response and build an HTML table to display search results
function _cb_findItemsByKeywords(root) {
	console.log(root);
	var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
	var html = [];
	html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
	for (var i = 0; i < items.length; ++i) {
		var item = items[i];
		var title = item.title;
		var price = item.sellingStatus[0].currentPrice[0]['__value__'];
		eBayPrice = item.sellingStatus[0].currentPrice[0]['__value__'];
		eBayApiReturned = true;
		var pic = item.galleryURL;
		var viewitem = item.viewItemURL;
		if (null != title && null != viewitem) {
			html.push('<img class="row" id="ebayItemPhoto" src="' + pic + '" border="0">' +
				'<a class="row" href="' + viewitem + '" target="_blank">' + title + '</a><p class="row">' + "$" + price + '</p>');
		}
	}
	html.push('</tbody></table>');
	document.getElementById("ebayItemInfo").innerHTML = html.join("");

	comparePrices();

}  // End _cb_findItemsByKeywords() function
// Create a JavaScript array of the item filters you want to use in your request
var filterarray = [
	{
		"name": "MaxPrice",
		"value": "25",
		"paramName": "Currency",
		"paramValue": "USD"
	},
	{
		"name": "FreeShippingOnly",
		"value": "true",
		"paramName": "",
		"paramValue": ""
	},
	{
		"name": "ListingType",
		"value": ["AuctionWithBIN", "FixedPrice"],
		"paramName": "",
		"paramValue": ""
	},
];
// Construct the request
// Replace MyAppID with your Production AppID
$("#call").on("click", function () {
	var url = "http://svcs.ebay.com/services/search/FindingService/v1";
	url += "?OPERATION-NAME=findItemsByKeywords";
	url += "&SERVICE-VERSION=1.0.0";
	url += "&SECURITY-APPNAME=connorwi-Comparis-PRD-6d56b4536-bfcbdb11";
	url += "&GLOBAL-ID=EBAY-US";
	url += "&RESPONSE-DATA-FORMAT=JSON";
	url += "&callback=_cb_findItemsByKeywords";
	url += "&REST-PAYLOAD";
	url += "&keywords=" + $("#search").val();
	url += "&paginationInput.entriesPerPage=1";
	// Submit the request
	s = document.createElement('script'); // create script element
	s.src = url;
	document.body.appendChild(s);

})






function comparePrices() {
	if (walmartApiReturned === false || eBayApiReturned === false) {
		return
	}
	var comparison = $("<p>")
	if (walmartPrice < eBayPrice) {
		comparison.text("Walmart is cheaper")
	}

	else {
		comparison.text("eBay is cheaper")
	}
	$("#comparisons").append(comparison);
	walmartPrice = null;
	eBayPrice = null;
	walmartApiReturned = false;
	eBayApiReturned = false;
	console.log()
};