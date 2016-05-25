// 
var COLUMNS = {
	"higher": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"corrections": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"medicaid": ["spending","demographics","eligibility","takeup","spending-per"],
	"ssi": ["spending","demographics","eligibility","takeup","spending-per"],
	"tanf": ["spending","demographics","eligibility","takeup","spending-per"],
	"ccdf": ["spending","demographics","eligibility","takeup","units","spending-per-u"],	
	"housing": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"admin": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"resources": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"parks": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"electric": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"gas": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"sewage": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"waste": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"water": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"k12": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"fire": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"police": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"highway": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"transit": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"]
}

var HEADERS ={
	"spending": "<div class = \"innerHeader spending\">spending<br/>per capita</div>",
	"demographics": "<div class = \"innerHeader demographics\"><span>=</span>demographics</div>",
	"eligibility": "<div class = \"innerHeader eligibility\"><span>&times;</span>eligibility</div>",
	"takeup": "<div class = \"innerHeader takeup\"><span>&times;</span>take-up rate</div>",
	"units": "<div class = \"innerHeader units\"><span>&times;</span>unit per<br/>&nbsp;recipient</div>",
	"payroll": "<div class = \"innerHeader payroll\"><span>&times;(</span>payroll</div>",
	"nonpayroll": "<div class = \"innerHeader nonpayroll\"><span id = \"left\">+</span>non payroll<span id = \"right\">)</span></div>",
	"spending-per":"<div class = \"innerHeader recipient\"><span>&times;</span>spending per<br/>recipient</div>",
	"spending-per-u":"<div class = \"innerHeader recipient\"><span>&times;</span>spending per<br/>unit</div>"

}
ROW_HEIGHT = 32;
var COLUMN_WIDTH = 99;
var headerHeight = 116-56;
var LAST_HIGHLIGHT = Date.now()

d3.select("#heatmap")
	.style("height", ((ROW_HEIGHT * 54) + headerHeight) + "px");

var CHECKED = [];

function allElementsFromPoint(x, y) {
    var element, elements = [];
    var old_visibility = [];
    while (true) {
        element = document.elementFromPoint(x, y);
        if (!element || element === document.documentElement) {
            break;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }
    elements.reverse();
    return elements;
}

function drawMenu(){
	var menu = d3.select("#navMenu")
	// for(var category in COLUMNS){
	// 	menu.append("div")
	// 		.attr("class", "navButton " + category)
	// 		.datum({ "category" : category})
	// 		.text(category)
	// 		.on("click", function(d){
	// 			d3.selectAll(".navButton.active").classed("active",false)
	// 			d3.select(this).classed("active",true)
	// 			return renderHeatmap(d.category);
	// 		})
	// }
	d3.selectAll(".navButton")
		.on("click", function(){
			var category = d3.select(this).attr("class").replace("navButton","").replace("active","").replace(/\s/g,"")
			if(category == "utilities"){
			d3.selectAll(".navButton.active").classed("active",false)
			d3.select(this).classed("active",true)

    			d3.select(".subcontainer.utilities")
    				.style("overflow","visible")
    				// .style("border-top", "1px solid white")
    				.transition()
    				.style("height", "28px")
    				.style("margin-top","18px")
    				.style("padding-top", "13px")
    			// d3.selectAll(".container .navButton:not(.utilities)")
    				// .transition()
    				// .style("border-color","#808080")
    				// .style("color","#666666")
    				// .style("background","#e6e6e6")
    			// d3.select(".container .utilities")
    				.transition()
    				// .style("border-color","#eb3f1c")
    				// .style("color","#eb3f1c")
    				// .style("background","#e6e6e6")
				d3.selectAll(".navButton.active").classed("active",false)
				d3.select(".navButton.gas").classed("active",true)

    			return renderHeatmap("gas")


			}else {
				var utilities = ["gas","electric","sewage","waste","water"]
				if(utilities.indexOf(category) == -1){
					// if( d3.select(".navButton.utilities").classed("active")){
		    			d3.selectAll(".container .navButton:not(." + category + ")")
		    				.transition()
		    				.duration(400)
		    				.style("border-color","#fff")
		    				.style("color","#333")
		    				.style("background","#fff")
		    			d3.selectAll(".container .navButton." + category)
		    				.transition()
		    				.duration(400)
		    				.style("border-color","#eb3f1c")
		    				.style("color","#fff")
		    				.style("background","#eb3f1c")
		    			setTimeout(function(){
		    				$(".container .navButton").removeAttr('style');
		    			},500)
		    		// }
					d3.selectAll(".navButton.active").classed("active",false)
					d3.select(this).classed("active",true)

					hideSubcontainer();

				}else{
					d3.selectAll(".navButton.active").classed("active",false)
					d3.select(this).classed("active",true)

				}
				return renderHeatmap(category)
			}
		})

}

function hideSubcontainer(){
	d3.select(".subcontainer.utilities")
		.style("border-top", "none")
		.style("overflow","hidden")
		.transition()
		.style("height", "0")
		.style("margin-top","0")
		.style("padding-top", "0")
}
function renderHeatmap(category, userLocation){
	// var promise2 = new Promise(function(resolve, reject){
	d3.selectAll(".cell").classed("garbage", true);
	d3.selectAll(".row").classed("garbage", true);
	d3.selectAll(".header").classed("garbage", true);
	d3.selectAll(".blurbBox").classed("garbage", true);
	d3.selectAll(".blurbText").classed("garbage", true);
	d3.selectAll(".connector").classed("garbage", true);
	// d3.selectAll(".minimap").classed("garbage", true);



	d3.csv("data/" + category + ".csv", function(data){
		var heatmap = d3.select("#heatmap")
		var header = heatmap.append("div")
			.attr("class", "header")
		d3.selectAll(".headercell").remove();
		d3.selectAll(".stateCell").remove()


		// header.append("div")
		// 		.attr("class","state headerCell")
		// 		.text("state")
		COLUMNS[category].map(function(column){
			header.append("div")
				.attr("class",function(){ return column + " headerCell"})
				.classed("active", function(){ return column == "spending"})
				.html(function(){ return HEADERS[column]})
				.on("click", function(){
					d3.selectAll(".headerCell").classed("active",false)
					d3.select(this).classed("active",true)

					d3.selectAll(".blurbBox").remove()
					d3.selectAll(".connector").remove()
					d3.selectAll(".blurbText").remove()
					var cat = d3.select(this).attr("class").replace("headerCell","").replace("active","").replace(/\s/g,"")

					var isBlank = d3.select(".cell." + cat).classed("blankCell")
					if (isBlank){ return false}

					var duration = 1000;
					d3.selectAll(".row")
						.transition()
						.duration(duration)
						.delay(function(d){
							var rank = (d[cat + "_rank"] == 99) ? 52:d[cat + "_rank"]
							return rank/52 * duration
						})
						.style("top",function(d){
							var rank = (d[cat + "_rank"] == 99) ? 52:d[cat + "_rank"]
							return ((rank * ROW_HEIGHT) + headerHeight)  +"px"
						})

				drawBlurbs(category, column, false)
				d3.selectAll(".blurbBox")
					.transition()
					.duration(1000)
					.style("opacity",1)
			// resolve({"category":category, "column":column})

					// setTimeout(, 2000)
					
				})
				.on("mouseover", function(){
					var thisClass = d3.select(this).attr("class").replace("headerCell","").replace("active","").replace(/\s/g,"")
					var category = getCategory();
					var isBlank = d3.select(".cell." + thisClass).classed("blankCell")
					if (isBlank){ return false}

					var infoHeight = "80px";
					switch (category){
						case "medicaid":
							infoHeight = "180px"
							break;
						case "ssi":
							infoHeight = "90px"
							break;
					}

					var left = d3.select(this).node().getBoundingClientRect().left
					var info = HEADER_INFO[category][thisClass]

					d3.selectAll(".headerCell:not(." + thisClass + "):not(.inactive) .innerHeader")
						.transition()
						.style("opacity",.4)
						.transition()
						.style("color",function(){
							if(d3.select(this).classed("active")){
								return "#333"
							}else return "#666666"
						})
					d3.select(".headerCell." + thisClass + " .innerHeader")
						.transition()
						.style("opacity",1)
						.style("color","#eb3f1c")
					d3.selectAll(".headerCell:not(.inactive)." + thisClass + " span")
						.transition()
						.style("opacity",.4)
					d3.select("#navMenu")
						.transition()
						.style("margin-top","-" + infoHeight)
						.style("margin-bottom",infoHeight)
					// d3.selectAll(".headerArrow")
					// 	.style("opacity",1)
					d3.select("#info")
						.text(info)
						.style("left", left)
						.style("top","-" + infoHeight)
						.style("border-top","3px solid #eb3f1c")

				})
				.on("mouseout", function(){
					var thisClass = d3.select(this).attr("class").replace("headerCell","").replace("active","").replace(/\s/g,"")
					var isBlank = d3.select(".cell." + thisClass).classed("blankCell")
					if (isBlank){ return false}

					d3.selectAll(".headerCell:not(." + thisClass + ") .innerHeader")
						.transition()
						.style("opacity",1)
					d3.select(".headerCell." + thisClass + " .innerHeader")
						.transition()
						.style("color",function(){
							if(d3.select(this).classed("active")){
								return "#333"
							}else return "#666666"
						})
					d3.selectAll(".headerCell." + thisClass + " span")
						.transition()
						.style("opacity",1)
					d3.select("#navMenu")
						.transition()
						.style("margin-top","0px")
						.style("margin-bottom","0px")
					d3.select("#info")
						.text("")
						.style("height",0)
						.style("border-top","none")

				})
		})
		d3.selectAll(".headerCell")
				.append("div")
				.attr("class","headerArrow")
				.append("div")
				.attr("class","arrowDown")



		var row = heatmap.selectAll("row")
			.data(data)
			.enter()
			.append("div")
				.attr("class", function(d){
					return "row " + d.state 
				})
			.style("top", function(d){
				return ((d.spending_rank * ROW_HEIGHT) + headerHeight)  +"px"
			})
		row.append("div")
			// .classed("stateCell", true)
			.attr("class", function(d){
				return "stateCell " + d.state.toUpperCase()
			})

			.text(function(d){ return d.state})

		COLUMNS[category].map(function(column){
			row.append("div")
				.attr("class", function(d){
					return "cell " + column + " " + getCellClass(d, column, category)
				})
				.on("mouseover", function(d){ console.log(this, d, column); mouseover(this, d, column, category)})
				.on("mouseout", function(){ mouseout(this) })
				.append("div")
				.attr("class","rankLabel")
					.text(function(d){
						if(d[column + "_rank"] == ""){
							return "."
						}
						else if(d[column + "_rank"] == 99){
							return "Missing!"
						}else{ return d[column + "_rank"] }
					})
		})
//draw checkboxes
	var checkRadius = 9
	var svg = d3.selectAll(".stateCell")
		// .classed("whiteText", function(){
		// 	var parentRow = d3.select(d3.select(this).node().parentNode)
		// 	var spending = parentRow.select(".cell.spending");
		// 	if (spending.classed("decile-6") || spending.classed("decile-7") || spending.classed("decile-8") || spending.classed("decile-9") || spending.classed("decile-10") || spending.classed("decile-11")){
		// 		return true
		// 	}else{ return false }
		// })
		.append("svg")
			.attr("class","stateCheck")
		svg.append("circle")
				.attr("cx",checkRadius)
				.attr("cy",checkRadius+4)
				.attr("r",checkRadius)
		svg.classed("checked", function(){
				var state = d3.select(this.parentNode).text()
				if(CHECKED.indexOf(state) != -1){
					var dthis = d3.select(this)
					stickyState(dthis.datum())
					var path = dthis.select("path")
					path.attr("stroke-dashoffset", 0);
					dthis.node().appendChild(path.node())
					return true
				}else{return false}
			})
			.on("click",stickyState)
			.attr("width",checkRadius*2+4)
			.attr("height",checkRadius*2+4)
		.append("g")
			.attr("width",checkRadius*2)
			.attr("height",checkRadius*2)

	})

//delete old heatmap
	d3.selectAll(".garbage")
		.transition()
		.duration(200)
		.style("opacity",0)
	setTimeout(function(){
		if(typeof(userLocation) != "undefined"){
			var small_promise =  new Promise(function(resolve, reject){
				
				
				var test = drawBlurbs(category, "spending", false)	

				// if(test.length == 1){
				// 	resolve(test)	
				// }
				resolve(test)
				
			})
			small_promise.then(function(result){
				setTimeout(function(){
					stickyState({"state": userLocation})	
				}, 400)
				
				return false;
			})
			.then(function(result){
				d3.selectAll(".blurbBox:not(.garbage)")
					.transition()
					.duration(400)
					.style("opacity",1)
			})
			
		}else{ drawBlurbs(category, "spending", false) }
		d3.selectAll(".garbage").remove()
		d3.selectAll(".blurbBox:not(.garbage)")
				.transition()
				.duration(400)
				.style("opacity",1)
	d3.selectAll(".headerCell")
		.classed("inactive",function(){
			var thisClass = d3.select(this).attr("class").replace("headerCell","").replace("active","").replace(/\s/g,"")
			var isBlank = d3.select(".cell." + thisClass).classed("blankCell")
			return isBlank

		})
	}, 200)
// })
	// promise2.then(function(result){
	// 	drawBlurbs(result.category, result.column)
	// })
}

// $(document).ready(function(){
// 	console.log("jasipodf")
// 	showMenu("k12")
// })

function stickyState(state){
	var defaultState = (state.state == "") ? "DC" : state.state;

	var cell = d3.select(".stateCell." + defaultState)
	var svg = cell.select("svg")
	var name = cell.text()
	var checked = svg.classed("checked")
	if(! checked){
		d3.select(cell.node().parentNode).select(".spending")
			.transition()
			.style("margin-left","-15px")
			.style("width",(COLUMN_WIDTH + 15) + "px")
		
		// d3.select(cell.node().parentNode).select(".spending").select(".rankLabel")
		// 	.transition()
		// 	.style("margin-left","15px")

		svg.select("circle")
			.transition()
			.duration(500)
			.style("fill","#333")
			.style("opacity",1)

		var lineData = [ { "x": 6,   "y": 11},
						 { "x":9,  "y": 15},
						 { "x": 20,  "y": 5}];

		var lineFunction = d3.svg.line()
			.x(function(d) { return d.x; })
			.y(function(d) { return d.y; })
			.interpolate("linear");

	    svg.selectAll("path").remove()

	    var path = svg.append("path")
			.attr("d", lineFunction(lineData))
			.attr("stroke", "white")
			.attr("stroke-width", "3")
			.attr("fill", "none");

	    var totalLength = path.node().getTotalLength();

	    path
			.attr("stroke-dasharray", totalLength + " " + totalLength)
			.attr("stroke-dashoffset", totalLength)
			.transition()
			.duration(500)
			.ease("linear")
			.attr("stroke-dashoffset", 0);

			setTimeout(function(){ svg.classed("checked", true)}, 500)

		d3.selectAll(".blurbBox")
			.transition()
			.style("left",function(){
				var spending = d3.select(cell.node().parentNode).select(".spending")
				var cell_top =  spending.node().getBoundingClientRect().top
				var cell_left = spending.node().getBoundingClientRect().left
				var box_left = d3.select(this).node().getBoundingClientRect().left
				var box_top = d3.select(this).node().getBoundingClientRect().top
				var box_height = d3.select(this).node().getBoundingClientRect().height
				if(Math.abs(cell_left-box_left) <= 20 && cell_top-box_top > 0 && box_height - (cell_top-box_top) > 10 ){
					d3.select(this)
						.attr("data-checked", function(){
							return parseInt(d3.select(this).attr("data-checked")) + 1	
						})
					if(Math.abs(cell_left-box_left) <= 10){
						return (parseInt(d3.select(this).style("left").replace("px","")) - 15) + "px";
					}else{return d3.select(this).style("left")}
				}else{return d3.select(this).style("left")}
				
			})
			.style("width", function(){
				var spending = d3.select(cell.node().parentNode).select(".spending")
				var cell_top =  spending.node().getBoundingClientRect().top
				var cell_left = spending.node().getBoundingClientRect().left
				var box_left = d3.select(this).node().getBoundingClientRect().left
				var box_top = d3.select(this).node().getBoundingClientRect().top
				var box_height = d3.select(this).node().getBoundingClientRect().height
				if(Math.abs(cell_left-box_left) <= 10 && cell_top-box_top > 0 && box_height - (cell_top-box_top) > 10 ){
					return (parseInt(d3.select(this).style("width").replace("px","")) + 15) + "px";
				}else{return d3.select(this).style("width")}				
			})

			CHECKED.push(name)
	}else{
		d3.select(cell.node().parentNode).select(".spending")
			.transition()
			.style("margin-left","0px")
			.style("width",COLUMN_WIDTH + "px")

		// d3.select(cell.node().parentNode).select(".spending").select(".rankLabel")
		// 	.transition()
		// 	.style("margin-left","0px")

		svg.select("circle")
			.transition()
			.duration(500)
			.style("fill","#fff")
			.style("opacity",.45)
		var path = svg.select("path")
		
		var totalLength = path.node().getTotalLength();

		path      
	        .transition()
	        .duration(500)
	        .ease("linear")
	        .attr("stroke-dashoffset", totalLength);

		setTimeout(function(){ svg.classed("checked", false)}, 500)

		d3.selectAll(".blurbBox")
			.transition()
			.style("left",function(){
				var spending = d3.select(cell.node().parentNode).select(".spending")
				var cell_top =  spending.node().getBoundingClientRect().top
				var cell_left = spending.node().getBoundingClientRect().left
				var box_left = d3.select(this).node().getBoundingClientRect().left
				var box_top = d3.select(this).node().getBoundingClientRect().top
				var box_height = d3.select(this).node().getBoundingClientRect().height
				if(Math.abs(cell_left-box_left) <= 10 && cell_top-box_top > 0 && box_height - (cell_top-box_top) > 10 ){
					d3.select(this)
						.attr("data-checked", function(){
							return parseInt(d3.select(this).attr("data-checked") -1 )
						})
					if(d3.select(this).attr("data-checked") == 0){
						return (parseInt(d3.select(this).style("left").replace("px","")) + 15) + "px";
					}else{return d3.select(this).style("left")}
				}else{return d3.select(this).style("left")}
				
			})
			.style("width", function(){
				var spending = d3.select(cell.node().parentNode).select(".spending")
				var cell_top =  spending.node().getBoundingClientRect().top
				var cell_left = spending.node().getBoundingClientRect().left
				var box_left = d3.select(this).node().getBoundingClientRect().left
				var box_top = d3.select(this).node().getBoundingClientRect().top
				var box_height = d3.select(this).node().getBoundingClientRect().height
				if(Math.abs(cell_left-box_left) <= 10 && cell_top-box_top > 0 && box_height - (cell_top-box_top) > 10 ){
					if(d3.select(this).attr("data-checked") == 0){
						return (parseInt(d3.select(this).style("width").replace("px","")) - 15) + "px";
					}else{return d3.select(this).style("width")}
				}else{return d3.select(this).style("width")}				
			})

		var index = CHECKED.indexOf(name)
		CHECKED.splice(index,1)
		
	}
	return CHECKED
}

function mouseover(cell, datum, column, category){
	if(d3.select(cell).classed("blankCell")){
		return false;
	}
	d3.selectAll(".cellTooltip").remove()

	d3.select(cell)
		.classed("hover",true)
	var format = mouseoverText[category][column]["format"]
	var label = mouseoverText[category][column]["label"].replace("{{STATE}}", datum.state)
	var value = datum[column + "_value"]

	
	var formatter;
	switch (format){
		case "dollars":
			formatter = d3.format("$,.0f");
			break;
		case "percent":
			formatter = d3.format("%");
			break;
		case "number":
			formatter = d3.format(".3f");
			break;
		case "comma":
			formatter = d3.format(",.0f");
			break;
		case "small":
			formatter = d3.format(".2f");
			break;
		case "foo":
			formatter = d3.format("");
			break;
	}
	d3.select(cell)
		.append("div")
		.attr("class","cellTooltip")
		.attr("width",COLUMN_WIDTH)
		.html("<div class = \"tooltipWrapper\">" + "<span class = \"tooltipValue\">" + formatter(value) + "</span> " + label + "</div>")
}
function mouseout(cell){

	d3.select(cell)
		.classed("hover",false)
		.select(".cellTooltip")
		.remove()

}

function getCellClass(datum, column, category){
	if(datum[column + "_rank"] == ""){
		return "blankCell"
	}
	else if (datum[column + "_rank"] == 99){
		return "errorCell"
	}else{ return "decile-" + (Math.floor((datum[column + "_rank"]-1)/5)+1) }
}
var promise = new Promise(function(resolve, reject){
	// $.ajax({
	//     url: 'http://freegeoip.net/json/' + userip,
	//     dataType: 'jsonp',
	//     success: function(data){
	//       	resolve(data.region_code)
	//     },
 //        error: function(error){
 //        	console.log("error locating user")
 //    		resolve("")

 //    	},
 //    	timeout: 2000,
 //    	async: false
	// });
	resolve("")
})
function resizePhone(){
	var win = d3.select("body").node().getBoundingClientRect().width
	// d3.select("scrollArrow")
		// .style("")
	var wx = window.scrollX;
	d3.selectAll(".menuItem")
		.style("margin-left",(23+parseFloat(wx)) + "px")
	var arrow = d3.select("#heatmap")
		.append("div")
		.attr("class","scrollArrow")
		.style("position","fixed")
		.style("top","0px")
		.style("right","0px")
		.style("width","67px")
		.style("height","100%")
		.style("z-index",100)
		.style("background","none")
	arrow.append("div")
		.attr("class","arrowImg")
		.append("img")
		.attr("src","img/arrow.png")
		// .text(">")
	d3.selectAll(".catDescription")
		.style("width",(parseFloat(win)-46) + "px")
	d3.selectAll(".container")
		.style("width",(parseFloat(win)-46) + "px")
	d3.selectAll(".subcontainer")
		.style("width",(parseFloat(win)-46) + "px")

	d3.select(".navButton.ccdf")
		.text("CCDF")
	d3.select(".navButton.ssi")
		.text("SSI")
	d3.select(".navButton.tanf")
		.text("TANF")
	d3.select(".navButton.resources")
		.text("Resources")		
}


drawMenu();
var TABLET;
var PHONE;
promise.then(function(result){
	TABLET = d3.select(".gutter").style("display") == "none"
	PHONE = d3.select(".mobileTest").style("display") == "block"

	if (PHONE){
		resizePhone()
	}
	setTimeout(function(){
		renderHeatmap("k12", result);
	}, 200)
		

})
.then(function(result){
	showMenu("k12")
})


// drawBlurbs("housing","spending")
// d3.select(".navButton.higher").classed("active",true)

$(".styled-select").click(function () {
    var element = $(this).children("select")[0],
        worked = false;
    if(document.createEvent) { // all browsers
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false,false, false, false, 0, null);
        worked = element.dispatchEvent(e);
    } else if (element.fireEvent) { // ie
        worked = element.fireEvent("onmousedown");
    }
    if (!worked) { // unknown browser / error
        alert("It didn't worked in your browser.");
    }
});

$(".styled-select select")
  .change(function(){
    showMenu($(".styled-select.nav select").val());
});

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
if (isFirefox){
  $(".styled-select select").css("pointer-events","visible");
}

function drawBlurbs(category, column, resize){
	if(resize){
		d3.selectAll(".blurbBox").classed("garbage", true);
		d3.selectAll(".blurbText").classed("garbage", true);
		d3.selectAll(".connector").classed("garbage", true);
	}
	d3.selectAll(".tabletBoxtext").remove();
	MINIBLURB_INDEX = 0;
	var numCols = (category == "ssi" || category == "ccdf" || category == "tanf") ? 6 : 7;

	var bs = blurbs[category][column]
	for (var i = 0; i < bs.length; i++){

		// blurb = bs[i]
		var blurbList = [];
		if(bs[i].top_left.state.indexOf(",") != -1){
		// var blurbPromise = new Promise(function(resolve, reject){
			var br_cols = bs[i].bottom_right.column.replace(/\s/g,"").toLowerCase().split(",")
			var br_states = bs[i].bottom_right.state.replace(/\s/g,"").split(",")
			var tl_cols = bs[i].top_left.column.replace(/\s/g,"").toLowerCase()	.split(",")
			var tl_states = bs[i].top_left.state.replace(/\s/g,"").split(",")
			var text = bs[i].text;
			var img = (bs[i].hasOwnProperty("image")) ? bs[i]["image"] : null;
			var num = br_cols.length
			for(var k = 0; k < num; k++){
				var b = {
					"bottom_right":{
						"column": br_cols[k],
						"state": br_states[k]
					},
					"top_left":{
						"column": tl_cols[k],
						"state": tl_states[k]
					},
					"text": text,
					"index": i
				}
				if(img != null) b["image"] = img
				blurbList.push(b)

			}

			drawBlurb(blurbList, column, numCols)
		}
		else{
			var b = bs[i]
			b["index"] = i
			blurbList.push(b)
			drawBlurb(blurbList, column, numCols)
		}
	}

	d3.selectAll(".map").transition()
		.style("width", ((numCols * COLUMN_WIDTH + 20) * 138 / (52 * ROW_HEIGHT)) + "px")
		.style("height", "138px")
	for(var mb = MINIBLURB_INDEX; mb < 5; mb++){
		d3.select("#mb" + mb)
			.attr("data-ind","hidden")
			.transition()
			.style("width",0)
			.style("height",0)
			.style("left","111px")
			.style("top",0)
		d3.select("#mbh" + mb)
			.attr("data-ind","hidden")
			.transition()
			.style("width",0)
			.style("height",0)
			.style("left","111px")
			.style("top",0)

	}

	if(resize){
		d3.selectAll(".garbage")
			.transition()
			.duration(200)
			.style("opacity",0)
		setTimeout(function(){
		drawBlurbs(category, "spending", false)
		if(typeof(userLocation) != "undefined"){
			stickyState({"state": userLocation})
		}
		d3.selectAll(".garbage").remove()
		d3.selectAll(".blurbBox:not(.garbage)")
			.transition()
			.duration(400)
			.style("opacity",1)
		d3.selectAll("svg.connector").forEach(function(obj){
			if(d3.selectAll("svg.connector")[0].length > 1){
				d3.select("#heatmap").node().insertBefore(obj[0], d3.select(".blurbBox").node())
			}
		})

		}, 200)

	}
	return bs;
}
function drawBlurb(blurbList, column, numCols){
	console.log(blurbList)
	var centers = []
	for (var j = 0; j < blurbList.length; j++){
		var blurb = blurbList[j]
		var topD = d3.select(".row." + blurb.top_left.state + ":not(.garbage)").datum()
		var bottomD = d3.select(".row." + blurb.bottom_right.state+ ":not(.garbage)").datum()

		var top_rank = (topD[column + "_rank"] == 99) ? 52:topD[column + "_rank"]
		var bottom_rank = (bottomD[column + "_rank"] == 99) ? 52:bottomD[column + "_rank"]

		var top_left = d3.select(".row." + blurb.top_left.state + " ." + blurb.top_left.column + ":not(.garbage)").node().getBoundingClientRect()
		var bottom_right = d3.select(".row." + blurb.bottom_right.state + " ." + blurb.bottom_right.column + ":not(.garbage)").node().getBoundingClientRect()
		var indChar = String.fromCharCode(97 + blurb.index)

		// var imgText = (blurb.hasOwnProperty("image")) ? "<div class = innerImg>" + blurb.image + "</div>" : ""


		if(indChar == "a"){
			if(d3.select(".blurbText.index_" + indChar + ":not(.garbage)").node() == null){
				var blurbObj = d3.select(".left.gutter").append("div")
					.attr("class", "blurbText index_" + indChar)
					.html(
						"<div class = blurbMarker>" + indChar + "</div>" +
						"<div class = innerText>" + blurb.text + "</div>"
						)
					.on("mouseover",function(){
						breathe("mini",indChar);
						breathe("blurb",indChar)
					})
					.on("click", function(){ scrollIn(indChar)})

					if(blurb.hasOwnProperty("image")){
						blurbObj.append("div")
							.attr("class","navButton blurbImageButton")
							.text("View Chart")
							.on("click", function(){ blurbImage(blurb.image)})
							// .html(blurb.image)
					}

			}
		}else{
			if(d3.select(".blurbText.index_" + indChar + ":not(.garbage)").node() == null){
				var blurbObj = d3.select(".right.gutter").append("div")
					.attr("class", "blurbText index_" + indChar)
					.html(
						"<div class = blurbMarker>" + indChar + "</div>" +
						"<div class = innerText>" + blurb.text + "</div>"
						)
					.on("mouseover",function(){
						breathe("mini",indChar);
						breathe("blurb",indChar)
					})
					.on("click", function(){ scrollIn(indChar)})

					if(blurb.hasOwnProperty("image")){
						blurbObj.append("div")
							.attr("class","navButton blurbImageButton")
							.text("View Chart")
							.on("click", function(){ blurbImage(blurb.image)})
					}
			}	
		}

		var W = (numCols * COLUMN_WIDTH + 20)
		var H = (52 * ROW_HEIGHT)
		var h = 138
		var w = h * W/ H

		var left = (top_left.left-2)
		var top = ((top_rank * ROW_HEIGHT) + ROW_HEIGHT + headerHeight-10)
		var width = (bottom_right.left - top_left.left + COLUMN_WIDTH)
		var height = (((bottom_rank * ROW_HEIGHT) + ROW_HEIGHT + headerHeight-10)
					 - ((top_rank * ROW_HEIGHT) + headerHeight-7))

		if(blurbList.length > 1){
			centers.push( {"x": left + width/2, "y" : top + height/2, "top": top, "left": left, "width": width, "height": height})
		}
		

		var blurbBox = d3.select("#heatmap").append("div")
			.attr("class","blurbBox index_" + indChar)
			.attr("data-checked",0)
			.style("position","absolute")
			.style("left",left + "px")
			.style("top", top + "px")
			.style("width", width + "px")
			.style("height", height + "px")
			.style("opacity",0)
			.style("border","4px solid #eb3f1c")
			.on("mousemove", function(){
				var x = event.clientX, y = event.clientY;
    			var elems = allElementsFromPoint(x, y);
    			elems.forEach(function(obj){
    				if (d3.select(obj).classed("cell")){
    					var category = getCategory();
						var column = d3.select(obj).attr("class").replace("cell","").replace("hover","").replace(/decile-\d*/g,"").replace(/\s/g,"")
						d3.selectAll(".cellTooltip").remove()
    					mouseover(obj, d3.select(obj).datum(), column, category)
    				}
    			})
			})
			.on("mouseout", function(){
				d3.selectAll(".cellTooltip").remove()
			})

		blurbBox.append("div")
			.attr("class", "boxLabel")
			.style("position","absolute")
			.style("bottom","0px")
			.style("right","0px")
			.style("height",(ROW_HEIGHT-6) + "px")
			.text(indChar)
			.on("mouseover",function(){
				if(TABLET && !PHONE){
					if(d3.select(".tab_" + indChar).node() == null){
						var left = d3.select(this).node().parentNode.getBoundingClientRect().left
						var right = d3.select("body").node().getBoundingClientRect().width - d3.select(this).node().parentNode.getBoundingClientRect().right

						var top = d3.select(d3.select(this).node().parentNode).style("top")
						var edge = d3.select("html").node().getBoundingClientRect().right
						var text = d3.select(".blurbText.index_" + indChar + " .innerText").text()
						var img = d3.select(".blurbText.index_" + indChar + " .blurbImageButton")
						// if(img.node() != null){}
						var tabBox;
						if(edge - left - 250 > 0){
							tabBox = d3.select("#heatmap")
								.append("div")
								.attr("class","tabletBoxtext left tab_" + indChar)
								.style("position","absolute")
								.style("left",left +"px")
								.style("top",top)
								.style("width","190px")
								.text(text)

								// console.log(img.node())
								if(img.node() != null){
									tabBox.node().appendChild(img.node())
								}



						}else{
							tabBox = d3.select("#heatmap")
								.append("div")
								.attr("class","tabletBoxtext right tab_" + indChar)
								.style("position","absolute")
								.style("right",right +"px")
								.style("top",top)
								.style("width","190px")
								.text(text)

								console.log(img.node())

						}
						tabBox.append("div")
							.attr("class","tabLabel")
							.text(indChar)
						tabBox.append("img")
							.attr("src","img/close.png")
							.attr("class","tabClose")
							.on("click", function(){
								d3.select(d3.select(this).node().parentNode).remove();
							})
					}
				}
				else if (PHONE){
					var text = d3.select(".blurbText.index_" + indChar + " .innerText").text()
					var win = d3.select("body").node().getBoundingClientRect().width
					var img = d3.select(".blurbText.index_" + indChar + " .blurbImageButton")

					var tabBox = d3.select("#heatmap")
								.append("div")
								.attr("class","tabletBoxtext left tab_" + indChar)
								// .style("position","fixed")
								// .style("top","0px")
								// .style("right","0px")
								.style("width",(parseFloat(win)-60) + "px")
								.text(text)
					tabBox.append("div")
							.attr("class","tabLabel")
							.text(indChar)
						tabBox.append("img")
							.attr("src","img/close.png")
							.attr("class","tabClose")
							.on("click", function(){
								d3.select(d3.select(this).node().parentNode).remove();
							})
					if(img.node() != null){
						tabBox.node().appendChild(img.node())
					}

				}
				breathe("text",indChar)
				breathe("mini",indChar)
			})
			// .on("mouseout",function(){
			// 	d3.selectAll(".tabletBoxtext").remove()
			// })
			.on("click", function(){ 
				if(!PHONE){
					scrollIn(indChar)
				}
			})
			// .style("")

		// d3.selectAll(".map").transition()
		if(blurb.top_left.column == "spending"){
			d3.selectAll(".cell.spending:not(.garbage)")
			.each(function(c){
				var rank = (c[column + "_rank"] == 99) ? 52:c[column + "_rank"]
				var t = ((rank * ROW_HEIGHT) + headerHeight)+30
				// var bb = d3.select(".row." + c.state + ":not(.garbage) .spending.cell").node().getBoundingClientRect()
				if(t > top && t < top + height){
					if(d3.select(".row." + c.state + ":not(.garbage) .stateCheck").classed("checked")){
						blurbBox.attr("data-checked", function(){
							return parseInt(blurbBox.attr("data-checked")) + 1
						})
						if(d3.select(".spending .headerArrow").node().getBoundingClientRect().left - blurbBox.node().getBoundingClientRect().left < 10){
							blurbBox.style("left",function(){
								return (parseInt(d3.select(this).style("left").replace("px","")) - 15) + "px"
							})
							blurbBox.style("width",function(){
								return (parseInt(d3.select(this).style("width").replace("px","")) + 15) + "px"
							})
						}
					}
				}
			})

		}
		var L = top_left.left - d3.select(".row").node().getBoundingClientRect().left
		var T = top - (headerHeight + ROW_HEIGHT + 10)
		d3.select("#mb" + MINIBLURB_INDEX)
			.attr("data-ind",indChar)
			.transition()
			.style("left", (L * (w/W) + 111) + "px")
			.style("top", (T * h/H) + "px")
			.style("width",(width * w/W) + "px")
			.style("height",(height * h/H) + "px")
		d3.select("#mbh" + MINIBLURB_INDEX)
			.attr("data-ind",indChar)
			.transition()
			.style("left", (L * (w/W) + 111) + "px")
			.style("top", (T * h/H) + "px")
			.style("width",(width * w/W) + "px")
			.style("height",(height * h/H) + "px")
		MINIBLURB_INDEX += 1;
			

		}
		if(centers.length == blurbList.length){
			//for 2 blurbs

			var left = (centers[0]["x"] < centers[1]["x"]) ? 0 : 1
			var right = (left == 0) ? 1 : 0

			var top = (centers[0]["y"] < centers[1]["y"]) ? 0 : 1
			var bottom = (top == 0) ? 1 : 0
			var svg
		if(centers[0].y == centers[1].y){
//horizontal connecting line
			svg = d3.select("#heatmap")
				.append("svg")
				.attr("class", "connector")
				.attr("width", centers[right]["x"] - centers[left]["x"])
				.attr("height", ROW_HEIGHT)
				.style("position","absolute")
				.style("left",centers[left]["x"])
				.style("top",centers[top]["y"] - ROW_HEIGHT/2)	

			svg
				.append("defs")
					.append("clipPath")
						.attr("id", "clip1")
						.append("rect")
						.attr("x",centers[left]["width"]/2 + 8)
						.attr("y",0)
						.attr("width",0)
						.attr("height",ROW_HEIGHT)
						.transition()
						.duration(1500)
						.attr("width", (centers[right]["x"] - centers[left]["x"]) - (centers[left]["width"]/2 + centers[right]["width"]/2) - 7)
			svg.append("line")
				.attr("x1", 0)
				.attr("x2", centers[right]["x"] - centers[left]["x"])
				.attr("y1", ROW_HEIGHT/2)
				.attr("y2", ROW_HEIGHT/2)
				.attr("class","connector connectorBg")
				.attr("stroke", "rgba(255,255,255,.5")
				.attr("stroke-width",20)
				.attr("clip-path", "url(#clip1)")


			svg.append("line")
				.attr("x1", 0)
				.attr("x2", centers[right]["x"] - centers[left]["x"])
				.attr("y1", ROW_HEIGHT/2)
				.attr("y2", ROW_HEIGHT/2)
				.attr("stroke", "#eb3f1c")
				.attr("stroke-width",10)
				.attr("stroke-linecap","round")
				.attr("stroke-dasharray","0,20")
				.attr("clip-path", "url(#clip1)")


		}
		else if(centers[0].x == centers[1].x || Math.abs(centers[0].x - centers[1].x) < 10){
//vertical connecting line
			svg = d3.select("#heatmap")
				.append("svg")
				.attr("class", "connector")
				.attr("height", centers[bottom]["y"] - centers[top]["y"])
				.attr("width", ROW_HEIGHT)
				.style("position","absolute")
				.style("left",centers[left]["x"]  - ROW_HEIGHT/2)
				.style("top",centers[top]["y"])	

			svg
				.append("defs")
					.append("clipPath")
						.attr("id", "clip1")
						.append("rect")
						.attr("y",centers[top]["height"]/2 + 8)
						.attr("x",0)
						.attr("width",ROW_HEIGHT)
						.attr("height",0)
						.transition()
						.duration(1500)
						.attr("height", (centers[bottom]["y"] - centers[top]["y"]) - (centers[bottom]["height"]/2 + centers[top]["height"]/2) - 7)
			svg.append("line")
				.attr("y1", 0)
				.attr("y2", centers[bottom]["y"] - centers[top]["y"])
				.attr("x1", ROW_HEIGHT/2)
				.attr("x2", ROW_HEIGHT/2)
				.attr("class","connector connectorBg")
				.attr("stroke", "rgba(255,255,255,.5")
				.attr("stroke-width",20)
				.attr("clip-path", "url(#clip1)")


			svg.append("line")
				.attr("y1", 0)
				.attr("y2", centers[bottom]["y"] - centers[top]["y"])
				.attr("x1", ROW_HEIGHT/2)
				.attr("x2", ROW_HEIGHT/2)
				.attr("stroke", "#eb3f1c")
				.attr("stroke-width",10)
				.attr("stroke-linecap","round")
				.attr("stroke-dasharray","0,20")
				.attr("clip-path", "url(#clip1)")


		}


		else{
			svg = d3.select("#heatmap")
				.append("svg")
				.attr("class", "connector")
				.attr("width", (centers[right]["x"] - centers[left]["x"]))
				.attr("height", (centers[bottom]["y"] - centers[top]["y"]))
				.style("position","absolute")
				.style("left",centers[left]["x"])
				.style("top",centers[top]["y"])
				var mask = svg
					.append("defs")
						.append("mask")
							.attr("id", "mask1")

							// .attr("fill","white")
							// .transition()
							// .duration(1500)
							// .attr("width", (centers[right]["x"] - centers[left]["x"]) - (centers[left]["width"]/2 + centers[right]["width"]/2) - 7)
				if( centers[right]["x"] - centers[left]["x"] <= (centers[bottom]["y"] - centers[top]["y"])){
//connecting line more vertical
					mask.append("rect")
						.attr("x",0)
						.attr("y",0)
						.attr("fill","white")
						.attr("width", centers[right]["x"] - centers[left]["x"])
						.attr("height",0)
						.transition()
						.duration(2500)
						.attr("height",(centers[bottom]["y"] - centers[top]["y"]))
				}else{
//connecting line more horizontal
					mask.append("rect")
						.attr("x",0)
						.attr("y",0)
						.attr("fill","white")
						.attr("width", 0)
						.attr("height",(centers[bottom]["y"] - centers[top]["y"]))
						.transition()
						.duration(2500)
						.attr("width", centers[right]["x"] - centers[left]["x"])

				}

				if(top == left){
				//upper left to lower right

					mask.append("rect")
							.attr("x",0)
							.attr("y",0)
							.attr("width",centers[left]["width"]/2 + 7)
							.attr("height",centers[left]["height"]/2 + 7)
					mask.append("rect")
							.attr("x", centers[right]["x"] - centers[left]["x"] - centers[right]["width"]/2)
							.attr("y",centers[bottom]["y"] - centers[top]["y"] - centers[bottom]["height"]/2)
							.attr("width",centers[right]["width"]/2 + 7)
							.attr("height",centers[right]["height"]/2 + 7)

					svg.append("line")
						.attr("x1", 0)
						.attr("x2", centers[right]["x"] - centers[left]["x"])
						.attr("y1", 0)
						.attr("y2", centers[bottom]["y"] - centers[top]["y"])
						.attr("class","connector connectorBg")
						.attr("stroke", "rgba(255,255,255,.5")
						.attr("stroke-width",20)
						.attr("mask", "url(#mask1)")

					svg.append("line")
						.attr("x1", 0)
						.attr("x2", centers[right]["x"] - centers[left]["x"])
						.attr("y1", 0)
						.attr("y2", centers[bottom]["y"] - centers[top]["y"])
						.attr("stroke", "#eb3f1c")
						.attr("stroke-width",10)
						.attr("stroke-linecap","round")
						.attr("stroke-dasharray","0,20")
						.attr("mask", "url(#mask1)")

				}else{
				//lower left to upper right
					mask.append("rect")
						.attr("x",0)
						.attr("y",centers[bottom]["y"] - centers[top]["y"] - centers[bottom]["height"]/2)
						.attr("width",centers[left]["width"]/2 + 7)
						.attr("height",centers[left]["height"]/2 + 7)
					mask.append("rect")
						.attr("x", centers[right]["x"] - centers[left]["x"] - centers[right]["width"]/2)
						.attr("y",0)
						.attr("width",centers[right]["width"]/2 + 7)
						.attr("height",centers[right]["height"]/2 + 7)


					svg.append("line")
						.attr("x1", 0)
						.attr("x2", centers[right]["x"] - centers[left]["x"])
						.attr("y1", centers[bottom]["y"] - centers[top]["y"])
						.attr("y2", 0)
						.attr("class","connector connectorBg")
						.attr("stroke", "rgba(255,255,255,.5")
						.attr("stroke-width",20)
						.attr("mask", "url(#mask1)")
					svg.append("line")
						.attr("x1", 0)
						.attr("x2", centers[right]["x"] - centers[left]["x"])
						.attr("y1", centers[bottom]["y"] - centers[top]["y"])
						.attr("y2", 0)
						.attr("class","connector connectorLine")
						.attr("stroke", "#eb3f1c")
						.attr("stroke-width",10)
						.attr("stroke-linecap","round")
						.attr("stroke-dasharray","0,20")
						.attr("mask", "url(#mask1)")


				}
				svg.on("mousemove", function(){
					var x = event.clientX, y = event.clientY,
	    			elements = allElementsFromPoint(x, y);
	    			elements.forEach(function(obj){
	    				if (d3.select(obj).classed("cell")){
	    					var category = getCategory();
							var column = d3.select(".headerCell.active").attr("class").replace("headerCell","").replace("active","").replace(/\s/g,"")
							d3.selectAll(".cellTooltip").remove()
	    					mouseover(obj, d3.select(obj).datum(), column, category)
	    				}
	    			})
				})



				// connector
					// .attr("clip-path", "url(.clipPath)")


	//    <line x1="40" x2="560" y1="100" y2="600" stroke="#5184AF" stroke-width="10" stroke-linecap="round" stroke-dasharray="0, 20"/>

				//for non vertical/horizontal, svg goes center->center



				//handle case for vertical stack


				//handle case for horizontal stack

			}
		}



}

function showMenu(parentCategory){
	d3.select(".catDescription")
		.html(CAT_DESCRIPTIONS[parentCategory])

	var container = d3.select(".container." + parentCategory)
	d3.selectAll(".openContainer").classed("openContainer",false)
	container.classed("openContainer",true)
	hideSubcontainer();
	if(container.node() != null){
		d3.selectAll(".container")
			.transition()
			.style("height","0px")
			.style("margin-top","0px")

		container.node().parentNode.insertBefore(container.node(), d3.select("#containers :first-child").node())

		container
			.transition()
			.style("height","41px")
			.style("margin-top","60px")

		var category;
		switch (parentCategory){
			case "environment":
				category = "housing";
				break;
			case "safety":
				category = "corrections";
				break;
			case "transportation":
				category = "highway";
				break;
			case "social":
				category = "ccdf";
				break;

		}
		d3.selectAll(".navButton.active").classed("active",false)
		d3.select(".navButton." + category).classed("active",true)
		renderHeatmap(category)

		d3.selectAll(".container .navButton:not(." + category + ")")
			.transition()
			.duration(400)
			.style("border-color","#fff")
			.style("color","#333")
			.style("background","#fff")
		d3.selectAll(".container .navButton." + category)
			.transition()
			.duration(400)
			.style("border-color","#eb3f1c")
			.style("color","#fff")
			.style("background","#eb3f1c")
		setTimeout(function(){
			$(".container .navButton").removeAttr('style');
		},500)
		// drawBlurbs(category, "spending")

	}
	else{
		renderHeatmap(parentCategory)
		// drawBlurbs(parentCategory, "spending")
		d3.selectAll(".container")
			.transition()
			.style("height","0px")
			.style("margin-top","0px")
	}
}

function scrollIn(ind){
	var blurbs = $(".blurbBox.index_" + ind)
	if(blurbs.length == 1){
		$('html, body').animate({
        	scrollTop: blurbs.offset().top - 10
    	}, 1000);
	}else{
		tops = []
		blurbs.map(function(ind, obj){
			tops.push({"top":this.getBoundingClientRect().top, "obj": obj})
		})
		tops.sort(function(a,b){ return a.top > b.top})
		$('html, body').animate({
        	scrollTop: $(tops[0].obj).offset().top -10
    	}, 1000);
		
	}
}

function blurbImage(img){
	// console.log(img)
	// var w = window.innerWidth;
	// var h = window.innerHeight;
	// var image = d3.select("#hiddenWindow")
	// 	.append("img")
	// 	.attr("src", "img/blurbs/"+img)
	// 	// .style("visibility","hidden")
	// 	// .style("max-width","100%")
	// 	// .style("max-height","100%")
	// 	// .style("width",w*.5)
	// var w = image.node().getBoundingClientRect.width
	// var h = image.node().getBoundingClientRect.height
var image = new Image();
image.onload = function() {
  // console.log(this.width + 'x' + this.height);
  var w = this.width;
  var h = this.height;
  var W = window.innerWidth;
  var H = window.innerHeight;
  if(w > W){
  	tmp = W * .9
  	h = h * (W *.9)/w
  	w = tmp 
  }
  else if(h > H){
  	tmp = H * .9
  	w = w * (H *.9)/h
  	h = tmp 
  }
  d3.select("body")
  	.append("div")
  	.attr("class","blurbImgBG")
  	.style("width", W)
  	.style("height", H)
  	.style("opacity",0)
  	.transition()
  	.style("opacity",.6)

	d3.select("#blurbImgWindow")
		.append("img")
		.attr("src", "img/blurbs/"+img)
	// img		
		.style("max-width","100%")
		.style("max-height","100%")

	d3.select("#blurbImgWindow")
		.transition()
		.style("width",w + "px")
		.style("height",h + "px")
		.style("left",(W-w)*.5)
		.style("top",(H-h)*.5)

	d3.select("#blurbImgWindow")
		.append("img")
			.attr("src","img/close.png")
			.attr("class","imgClose")
			.on("click", clearImg)
}
	
image.src = "img/blurbs/"+img;

}

function clearImg(obj){
		d3.selectAll(".blurbImgBG").remove()
	d3.selectAll("#blurbImgWindow")
		.transition()
		.style("width",0)
		.style("height",0)
		.style("left",0)
		.style("top",0)
		.each("end", function(){ d3.select(this).selectAll("img").remove()})

}

function breathe(type, ind){
	var diff = Date.now() - LAST_HIGHLIGHT;
	if(diff < 1000 && diff > 10){
//don't breathe if animation happened recently, not counting multiple concurrent calls to breathe
		// LAST_HIGHLIGHT = Date.now()
		return false;
	}
	LAST_HIGHLIGHT = Date.now()
	if(type == "text"){
		d3.select(".blurbText.index_" + ind + " .blurbMarker")
			.style("box-shadow", "0px 0px 0px #eb3f1c")
			.transition()
			.duration(1000)
			.style("width","28px")
			.style("height","33px")
			.style("box-shadow", "0px 0px 3px #eb3f1c")
			.transition()
			.style("width","24px")
			.style("height","29px")
			.style("box-shadow", "0px 0px 0px #eb3f1c")
	}
	else if(type == "mini"){
		d3.selectAll(".miniblurb[data-ind=" + ind + "]")
			.style("border","0px solid #eb3f1c")
			.style("box-shadow", "0px 0px 0px #eb3f1c")
			.transition()
			.duration(1000)
			.style("border-width","1px")
			.style("box-shadow", "0px 0px 3px #eb3f1c")
			.transition()
			.style("border-width","0px")
			.style("box-shadow", "0px 0px 0px #eb3f1c")
			// .style("left",function(){ return (parseFloat(d3.select(this).style("left").replace("px",""))+2) + "px"})

	}
	else if(type == "blurb"){
		d3.selectAll(".blurbBox.index_" + ind)
			.style("box-shadow", "0px 0px 0px #eb3f1c")
			.transition()
			.duration(1000)
			.style("margin-left","-4px")
			.style("margin-top","-4px")
			.style("border-width","8px")
			.style("box-shadow", "0px 0px 3px #eb3f1c")

			.transition()
			.style("margin-left","0px")
			.style("margin-top","0px")
			.style("border-width","4px")
			.style("box-shadow", 	"0px 0px 0px #eb3f1c")

	}
}

d3.selectAll(".miniBlurb_hover")
	.on("mouseover", function(){
		var ind = d3.select(this).attr("data-ind")
		breathe("text", ind)
		breathe("blurb",ind)
		d3.selectAll(".miniBlurb[data-ind=" +  ind + "]")
			.style("background","#808080")
	})
	.on("mouseout", function(){
		d3.selectAll(".miniBlurb")
			.style("background","#eb3f1c")
	})
	.on("click", function(){
		var ind = d3.select(this).attr("data-ind")
		scrollIn(ind)

	})


function getCategory(){
	var menuItem = d3.select("#navMenu select").node().value
	var singles = ["medicaid","admin","higher","k12",""]
	if (singles.indexOf(menuItem) != -1){ return menuItem}
	else{
		var category = d3.select(".navButton.active").attr("class").replace("navButton","").replace("active","").replace(/\s/g,"")
		return category
	}
}

var s1_done, s2_done, s3_done, s4_done, s5_done, s6_done, s7_done;

var lastScrollTop = $(this).scrollTop();

$(window).scroll(function(e){


   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       // downscroll code
       d3.select(".slideHeader")
       		.transition()
       		.style("top","-70px")
   } else {
   		d3.select(".slideHeader")
       		.transition()
       		.style("top","0px")
      // upscroll code
   }
   lastScrollTop = st;
	var y = window.scrollY
	if(y >= 2700 && !s1_done){
		console.log("running")
		s1_done = true
		step1();
		function wait(){
			if (ELEMS.length != 2){
				setTimeout(wait,3000);
			} else {
				step2()
				wait2()
			}
		}
		function wait2(){
			if (ELEMS.length != 4){
				setTimeout(wait2,3000);
			} else {
				step3()
				wait3()
			}

		}
		function wait3(){
			if (ELEMS.length != 6){
				setTimeout(wait3,3000);
			} else {
				step4()
				wait4()
			}
		}
		function wait4(){
			if (ELEMS.length != 8){
				setTimeout(wait4,3000);
			} else {
				step5()
				wait5()
			}
		}
		function wait5(){
			if (ELEMS.length != 10){
				setTimeout(wait5,3000);
			} else {
				step6()
				// wait5()
			}
		}
		wait()
	}
	// else if(y >= 2900 && !s2_done && ELEMS.length == 2){
	// 	s2_done = true
	// 	function steps(callback){
	// 		step2()
	// 		if(!s3_done && ELEMS.length == 4){
	// 			callback()
	// 		}
	// 	}
	// 	steps(step3)
	// 	// step2()
	// 	// step3()
	// 	// step4()
	// }
	// else if(y >= 2900 && !s3_done && ELEMS.length == 4){
	// 	s3_done = true
	// 	step3()
	// }
	// else if(y >= 2900 && !s4_done && ELEMS.length == 6){
	// 	s4_done = true
	// 	step4()
	// }
	// else if(y >= 2900 && !s5_done && ELEMS.length == 8){
	// 	s5_done = true
	// 	step5()
	// }
	// else if(y >= 2900 && !s6_done && ELEMS.length == 10){
	// 	s6_done = true
	// 	step6()
	// }
	// else if(y >= 3300 && !s7_done && ELEMS.length == 10){
	// 	s7_done = true
	// 	step7()
	// }

	// if(y >= 2700 && y<= 3450){
	// 	fix();
	// }
	// if(y > 3450){
	// 	d3.select(".twocolumn.formula")
	// 		.style("position","inherit")
	// 		.style("margin-top","455px")
	// 		.style("margin-right","50px")
	// 		.style("left","0px")
	// }
	if(y < 2700){
		// d3.select(".formula")
		// 	.style("margin-top","-4893px")
		// 	.style("top","0px")
		// 	.style("margin-right","50px")
		// 	.style("position","inherit")
			// .style("left",left + "px")
		d3.select(".h1spacing")
			.style("display","block")
	}else{
		d3.select(".h1spacing")
			.style("display","none")
	}




	if(TABLET && !PHONE){
		return false;
	}else if(PHONE){
		var wx = window.scrollX;
		d3.selectAll(".menuItem")
			.style("margin-left",(23+parseFloat(wx)) + "px")
		if(d3.select(".headerArrow").node().getBoundingClientRect().top + 10 <= d3.select(".arrowImg").node().getBoundingClientRect().top && d3.select("#heatmap").node().getBoundingClientRect().bottom + 10 >= d3.select(".arrowImg").node().getBoundingClientRect().bottom){
			d3.select(".arrowImg img")
				.transition()
				.style("opacity",1)
		}else{
			d3.select(".arrowImg img")
				.transition()
				.style("opacity",0)
		}
		return false;
	}
	var heatTop = d3.select("#heatmap").node().getBoundingClientRect().top
	var heatBottom = d3.select("#heatmap").node().getBoundingClientRect().bottom

	var leftTop = d3.select(".left.gutter").node().getBoundingClientRect().top
	var leftBottom = d3.select(".left.gutter").node().getBoundingClientRect().bottom

	var leftStick = d3.select("#heatmap").node().getBoundingClientRect().height - d3.select(".left.gutter").node().getBoundingClientRect().height
	var leftPositionFixed = (d3.select(".left.gutter").style("position") == "fixed")
	if (heatTop < 0 && !leftPositionFixed){
		$('.left.gutter').css({'position': 'fixed', 'top': '116px'}); 
	}
	if (heatBottom <= leftBottom+1 && leftTop <= 116){
		$('.left.gutter').css({'position': 'absolute', 'top': leftStick}); 
	}
	if (heatTop > 0 && leftPositionFixed)
	{
		$('.left.gutter').css({'position': 'absolute', 'top': '116px'}); 
	}


	var heatTop = d3.select("#heatmap").node().getBoundingClientRect().top
	var heatBottom = d3.select("#heatmap").node().getBoundingClientRect().bottom

	var rightTop = d3.select(".right.gutter").node().getBoundingClientRect().top
	var rightBottom = d3.select(".right.gutter").node().getBoundingClientRect().bottom

	var rightStick = d3.select("#heatmap").node().getBoundingClientRect().height - d3.select(".right.gutter").node().getBoundingClientRect().height
	var rightPositionFixed = (d3.select(".right.gutter").style("position") == "fixed")
	
	if (heatTop < 0 && !rightPositionFixed){
		$('.right.gutter').css({'position': 'fixed', 'top': '116px'}); 
	}
	if (heatTop > 0 && rightPositionFixed)
	{
		$('.right.gutter').css({'position': 'absolute', 'top': '116px'}); 
	}
	if (heatBottom <= rightBottom+1 && rightTop <= 116){
		$('.right.gutter').css({'position': 'absolute', 'top': rightStick}); 
	}



	$(".blurbBox")
		.each(function(){
			var bottom = d3.select(this).node().getBoundingClientRect().bottom
			if(bottom <= 0){
				var ind = d3.select(this).attr("class").replace("blurbBox","").replace(/\s/g,"")
				// d3.select(".blurbText." + ind + " .blurbMarker")
					// .style("background","blue")
			}
		})




});

$(window).resize(function(e){
	TABLET = d3.select(".gutter").style("display") == "none"
	PHONE = d3.select(".mobileTest").style("display") == "block"
	// if(PHONE){
	// 	resizePhone();
	// }
	var category = getCategory();
	var column = d3.select(".headerCell.active").attr("class").replace("headerCell","").replace("active","").replace(/\s/g,"")
	if(! PHONE){
		drawBlurbs(category, column, true)
	}
})

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        clearImg();
    }
});

d3.selectAll("#skip")
    .on("click", function(){
        $("html, body").animate({ scrollTop: 5030 }, 1000);
    })
