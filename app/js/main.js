
var COLUMNS = {
	"higher": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"corrections": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"medicaid": ["spending","demographics","eligibility","takeup","spending-per"],
	"ssi": ["spending","demographics","eligibility","takeup","spending-per"],
	"tanf": ["spending","demographics","eligibility","takeup","spending-per"],
	"ccdf": ["spending","demographics","eligibility","takeup","units","spending-per"],	
	"housing": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"admin": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"resources": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"parks": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"utilities": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"k12": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"fire": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"police": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"highway": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"],
	"transit": ["spending","demographics","eligibility","takeup","units","payroll","nonpayroll"]
}
var ROW_HEIGHT = 32;
var headerHeight = 30;
var CHECKED = [];

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
			d3.selectAll(".navButton.active").classed("active",false)
			d3.select(this).classed("active",true)
			if(category == "utilities"){
    			d3.select(".subcontainer.utilities")
    				.style("border-top", "1px solid white")
    				.transition()
    				.style("height", "28px")
    				.style("margin-top","18px")
    				.style("padding-top", "13px")
			}else {
				var utilities = ["gas","electric","sewage","solid","water"]
				if(utilities.indexOf(category) == -1){
					hideSubcontainer();
				}
				return renderHeatmap(category)
			}
		})

}

function hideSubcontainer(){
	d3.select(".subcontainer.utilities")
		.style("border-top", "none")
		.transition()
		.style("height", "0")
		.style("margin-top","0")
		.style("padding-top", "0")
}
function renderHeatmap(category, location){
	console.log(location)
	d3.selectAll(".cell").classed("garbage", true);
	d3.selectAll(".row").classed("garbage", true);
	d3.selectAll(".header").classed("garbage", true);
	d3.selectAll(".blurbBox").classed("garbage", true);

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
				.text(function(){ return column})
				.on("click", function(){
					d3.selectAll(".blurbBox").remove()
					var cat = d3.select(this).attr("class").replace(" headerCell","")
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
						// .each("end",function(d){
						// 	// console.log(d)
						// 	var rank = (d[cat + "_rank"] == 99) ? 52:d[cat + "_rank"]
						// 	// console.log(rank/52)
						// 	if(rank/52 ==1){
						// 		drawBlurbs(category, column)
						// 	}
						// })
				drawBlurbs(category, column)
					// setTimeout(, 2000)
					
				})
		})

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
				.on("mouseover", function(d){ mouseover(d, column, category)})
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
		drawBlurbs(category, "spending")
		if(typeof(location != "undefined")){
			stickyState({"state": location})
		}
		d3.selectAll(".garbage").remove()
	}, 200)
}

function stickyState(state){
	var cell = d3.select(".stateCell." + state.state)
	var svg = cell.select("svg")
	var name = cell.text()
	var checked = svg.classed("checked")
	if(! checked){
		d3.select(cell.node().parentNode).select(".spending")
			.transition()
			.style("margin-left","-15px")
			.style("width","118px")
		
		// d3.select(cell.node().parentNode).select(".spending").select(".rankLabel")
		// 	.transition()
		// 	.style("margin-left","15px")

		svg.select("circle")
			.transition()
			.duration(500)
			.style("fill","#eb3f1c")

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
				if(Math.abs(cell_left-box_left) <= 10 && cell_top-box_top > 0 && box_height - (cell_top-box_top) > 10 ){
					return (parseInt(d3.select(this).style("left").replace("px","")) - 15) + "px";
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
			.style("width","103px")

		// d3.select(cell.node().parentNode).select(".spending").select(".rankLabel")
		// 	.transition()
		// 	.style("margin-left","0px")

		svg.select("circle")
			.transition()
			.duration(500)
			.style("fill","#666")
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
					return (parseInt(d3.select(this).style("left").replace("px","")) + 15) + "px";
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
					return (parseInt(d3.select(this).style("width").replace("px","")) - 15) + "px";
				}else{return d3.select(this).style("width")}				
			})

		var index = CHECKED.indexOf(name)
		CHECKED.splice(index,1)
	}
}

function mouseover(datum, column, category){
	var temp = d3.format(".3f")
	d3.select("#temp span").text(temp(datum[column + "_value"]))
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
	// var USER_STATE_CODE;
	// var onSuccess = function(location){
	//   location.subdivisions[0].iso_code
	//   resolve(location.subdivisions[0].iso_code);
	// };
	 
	// var onError = function(error){
	// 	console.log(error)
	//   resolve(false)
	// };
	// geoip2.city(onSuccess, onError);
	$.ajax({
	    url: 'http://freegeoip.net/json/' + userip,
	    dataType: 'jsonp',
	    success: function(data){
	      console.log("located")
	      // foo=data
	      resolve(data.region_code)
	    }
	});
})


drawMenu();
promise.then(function(result){
	renderHeatmap("housing", result);
})

// drawBlurbs("housing","spending")
d3.select(".navButton.higher").classed("active",true)

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

function drawBlurbs(category, column){
	var bs = blurbs[category][column]
	for (var i = 0; i < bs.length; i++){

		blurb = bs[i]

		if(blurb.top_left.state.indexOf(",") != -1){
			// console.log(blurb.top_left)

		}
		else{
			var topD = d3.select(".row." + blurb.top_left.state).datum()
			var bottomD = d3.select(".row." + blurb.bottom_right.state).datum()

			var top_rank = (topD[column + "_rank"] == 99) ? 52:topD[column + "_rank"]
			var bottom_rank = (bottomD[column + "_rank"] == 99) ? 52:bottomD[column + "_rank"]

			var top_left = d3.select(".row." + blurb.top_left.state + " ." + blurb.top_left.column + ":not(.garbage)").node().getBoundingClientRect()
			
			var bottom_right = d3.select(".row." + blurb.bottom_right.state + " ." + blurb.bottom_right.column + ":not(.garbage)").node().getBoundingClientRect()

			d3.select("#heatmap").append("div")
				.attr("class","blurbBox")
				.style("position","absolute")
				.style("left",(top_left.left-2) + "px")
				.style("top", ((top_rank * ROW_HEIGHT) + ROW_HEIGHT + headerHeight-10) + "px")
				.style("width", (bottom_right.left - top_left.left + 103) + "px")
				.style("height", (((bottom_rank * ROW_HEIGHT) + ROW_HEIGHT + headerHeight-10)
						 - ((top_rank * ROW_HEIGHT) + headerHeight-7)) + "px")
				.style("opacity",0)
				.style("border","4px solid #eb3f1c")
				.transition()
				.style("opacity",1)
		}
	}
}

// function drawBlurb()

function showMenu(parentCategory){
	var container = d3.select(".container." + parentCategory)
	hideSubcontainer();
	if(container.node() != null){
		d3.selectAll(".container")
			.transition()
			.style("height","0px")
			.style("margin-top","0px")

		container.node().parentNode.insertBefore(container.node(), d3.select("#containers :first-child").node())

		container
			.transition()
			.style("height","39px")
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

