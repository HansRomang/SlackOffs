$(function(){
	var count;

$("#call").on("click", function (){
	event.preventDefault();
	$("#walmartItemInfo").empty()
	$("#more").addClass("d-none")
	search = $("#search").val()
	count = 1
	walmartCall(search, count)
	ebayCall(search, count)
	
})

$("#more").on("click", function(){
	search = $("#search").val()
	walmartCall(search, count)
})




function walmartCall(){
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
									style: "width: 250px;"
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
							name.append("$" + response.items[i].salePrice + " <s>" + msrp +"</s>")
							cardBody.append(name)
							

						 
								
									var name = $("<h5>")
									name.attr("class", "card-title")
									name.append("UPC: " + response.items[i].upc)
									cardBody.append(name)
							
						 

							card.append(image)
							card.append(cardBody)


							$("#walmartItemInfo").append(card)
							

					}
					$("#more").removeClass("d-none")
					count += 0;

					

			})

	
}


	

})