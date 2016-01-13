
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
var COLUMN_WIDTH = 99;
var headerHeight = 116-56;

d3.select("#heatmap")
	.style("height", ((ROW_HEIGHT * 54) + headerHeight) + "px");

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
			if(category == "utilities"){
			d3.selectAll(".navButton.active").classed("active",false)
			d3.select(this).classed("active",true)

    			d3.select(".subcontainer.utilities")
    				.style("border-top", "1px solid white")
    				.transition()
    				.style("height", "28px")
    				.style("margin-top","18px")
    				.style("padding-top", "13px")
    			d3.selectAll(".container .navButton:not(.utilities)")
    				.transition()
    				.style("border-color","#808080")
    				.style("color","#666666")
    				.style("background","#e6e6e6")
    			d3.select(".container .utilities")
    				.transition()
    				.style("border-color","#eb3f1c")
    				.style("color","#eb3f1c")
    				.style("background","#e6e6e6")
			}else {
				var utilities = ["gas","electric","sewage","solid","water"]
				if(utilities.indexOf(category) == -1){
					if( d3.select(".navButton.utilities").classed("active")){
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
		    		}
					d3.selectAll(".navButton.active").classed("active",false)
					d3.select(this).classed("active",true)

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
				.text(function(){ return column})
				.on("click", function(){
					d3.selectAll(".headerCell").classed("active",false)
					d3.select(this).classed("active",true)

					d3.selectAll(".blurbBox").remove()
					d3.selectAll(".connector").remove()
					var cat = d3.select(this).attr("class").replace("headerCell","").replace("active","").replace(/\s/g,"")
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
				.on("mouseover", function(d){ mouseover(this, d, column, category)})
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
		drawBlurbs(category, "spending", false)
		if(typeof(location) != "undefined"){
			stickyState({"state": location})
		}
		d3.selectAll(".garbage").remove()
		d3.selectAll(".blurbBox:not(.garbage)")
				.transition()
				.duration(400)
				.style("opacity",1)

	}, 200)
// })
	// promise2.then(function(result){
	// 	drawBlurbs(result.category, result.column)
	// })
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

function mouseover(cell, datum, column, category){
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
		case "foo":
			formatter = d3.format("");
			break;
	}
	d3.select(cell)
		.append("div")
		.attr("class","cellTooltip")
		.attr("width",COLUMN_WIDTH)
		.html("<div class = \"tooltipWrapper\">" + "<span class = \"tooltipValue\">" + formatter(value) + "</span> " + label + "</div>")
			// console.log(d3.selectAll(".hover")[0].length)
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
	$.ajax({
	    url: 'http://freegeoip.net/json/' + userip,
	    dataType: 'jsonp',
	    success: function(data){
	      	resolve(data.region_code)
	    },
        error: function(error){
    		console.log(error)
    		resolve("")
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

function drawBlurbs(category, column, resize){
	if(resize){
		d3.selectAll(".blurbBox").classed("garbage", true);
		d3.selectAll(".blurbText").classed("garbage", true);
		d3.selectAll(".connector").classed("garbage", true);
	}
	MINIBLURB_INDEX = 0;
	var numCols = (category == "ssi" || category == "ccdf" || category == "tanf") ? 6 : 7;

	var bs = blurbs[category][column]
	for (var i = 0; i < bs.length; i++){

		// blurb = bs[i]
		var blurbList = [];
		if(bs[i].top_left.state.indexOf(",") != -1){
			// console.log(bs[i])
		// var blurbPromise = new Promise(function(resolve, reject){
			var br_cols = bs[i].bottom_right.column.replace(/\s/g,"").split(",")
			var br_states = bs[i].bottom_right.state.replace(/\s/g,"").split(",")
			var tl_cols = bs[i].top_left.column.replace(/\s/g,"").split(",")
			var tl_states = bs[i].top_left.state.replace(/\s/g,"").split(",")
			var text = bs[i].text;
			var num = br_cols.length
			// console.log(num, br_cols)
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
				blurbList.push(b)
				// if( k == num-1){
				// 	console.log("foo")
				// 	resolve(blurbList)
				// }
			}

		// })
		// blurbPromise.then(function(result){
			// console.log(result, column)
			drawBlurb(blurbList, column, numCols)
		// })
			// console.log(blurbList, column)
			// drawBlurb(blurbList, column)
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
		// console.log("mb",mb)
		d3.select("#mb" + mb)
			.attr("data-ind","hidden")
			.transition()
			.style("width",0)
			.style("height",0)
			.style("left","111px")
			.style("top",0)

	}
	// d3.select(".minimap")
	// 	.append("div")
	// 	.style("background","red")
	// 	.style("width","10px")
	// 	.style("height","10px")
	// console.log("width", d3.select(".row").node().getBoundingClientRect().width)

	if(resize){
		d3.selectAll(".garbage")
			.transition()
			.duration(200)
			.style("opacity",0)
		setTimeout(function(){
		// drawBlurbs(category, "spending", false)
		// if(typeof(location) != "undefined"){
		// stickyState({"state": location})
		// }
		d3.selectAll(".garbage").remove()
		d3.selectAll(".blurbBox:not(.garbage)")
			.transition()
			.duration(400)
			.style("opacity",1)

		}, 200)
	}
}
function drawBlurb(blurbList, column, numCols){
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

		if(indChar == "a"){
			if(d3.select(".blurbText.index_" + indChar + ":not(.garbage)").node() == null){
				d3.select(".left.gutter").append("div")
					.attr("class", "blurbText index_" + indChar)
					.html(
						"<div class = blurbMarker>" + indChar + "</div>" +
						"<div class = innerText>" + blurb.text + "</div>"
						)
			}
		}else{
			if(d3.select(".blurbText.index_" + indChar + ":not(.garbage)").node() == null){
				d3.select(".right.gutter").append("div")
					.attr("class", "blurbText index_" + indChar)
					.html(
						"<div class = blurbMarker>" + indChar + "</div>" +
						"<div class = innerText>" + blurb.text + "</div>"
						)
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
			.style("position","absolute")
			.style("left",left + "px")
			.style("top", top + "px")
			.style("width", width + "px")
			.style("height", height + "px")
			.style("opacity",0)
			.style("border","4px solid #eb3f1c")

		blurbBox.append("div")
			.attr("class", "boxLabel")
			.style("position","absolute")
			.style("bottom","0px")
			.style("right","0px")
			.style("height",(ROW_HEIGHT-6) + "px")
			.text(indChar)
			// .style("")

		// d3.selectAll(".map").transition()

		var L = top_left.left - d3.select(".row").node().getBoundingClientRect().left
		var T = top - (headerHeight + ROW_HEIGHT + 10)
		d3.select("#mb" + MINIBLURB_INDEX)
			.attr("data-ind",indChar)
			.transition()
			.style("left", (L * (w/W) + 111) + "px")
			.style("top", (T * h/H) + "px")
			.style("width",(width * w/W) + "px")
			.style("height",(height * h/H) + "px")
		MINIBLURB_INDEX += 1;
			

		}
		if(centers.length == blurbList.length){
			console.log(centers)
			//for 2 blurbs

			var left = (centers[0]["x"] < centers[1]["x"]) ? 0 : 1
			var right = (left == 0) ? 1 : 0

			var top = (centers[0]["y"] < centers[1]["y"]) ? 0 : 1
			var bottom = (top == 0) ? 1 : 0


			console.log(left, right)
			console.log(top, bottom)

			console.log(centers)
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


		}else{
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

	

			// if(((centers[right]["x"] - centers[left]["x"]) - (centers[left]["width"]/2 + centers[right]["width"]/2) - 7) <= 0){
			// 	svg
			// 		.append("defs")
			// 			.append("clipPath")
			// 				.attr("id", "clip1")
			// 				.append("rect")
			// 				.attr("x",0)
			// 				.attr("y",centers[top]["height"]/2 + 7)
			// 				.attr("width", (centers[left]["width"]/2 + centers[right]["width"]/2) - 7)
			// 				.attr("height",0)
			// 				.transition()
			// 				.duration(1500)
			// 				.attr("height",(centers[bottom]["y"] - centers[top]["y"]) - (centers[bottom]["height"]/2 + centers[top]["height"]/2) - 7)


			// }else{
			// 	svg
			// 		.append("defs")
			// 			.append("clipPath")
			// 				.attr("id", "clip1")
			// 				.append("rect")
			// 				.attr("x",centers[left]["width"]/2 + 8)
			// 				.attr("y",0)
			// 				.attr("width",0)
			// 				.attr("height",(centers[bottom]["y"] - centers[top]["y"]))
			// 				.transition()
			// 				.duration(1500)
			// 				.attr("width", (centers[right]["x"] - centers[left]["x"]) - (centers[left]["width"]/2 + centers[right]["width"]/2) - 7)
			// }

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



$(window).scroll(function(e){ 
	var heatTop = d3.select("#heatmap").node().getBoundingClientRect().top
	var heatBottom = d3.select("#heatmap").node().getBoundingClientRect().bottom

	var leftTop = d3.select(".left.gutter").node().getBoundingClientRect().top
	var leftBottom = d3.select(".left.gutter").node().getBoundingClientRect().bottom

	var leftStick = d3.select("#heatmap").node().getBoundingClientRect().height - d3.select(".left.gutter").node().getBoundingClientRect().height
	var leftPositionFixed = (d3.select(".left.gutter").style("position") == "fixed")

	if (heatTop < 0 && !leftPositionFixed){
		$('.left.gutter').css({'position': 'fixed', 'top': '116px'}); 
	}
	if (heatTop > 0 && leftPositionFixed)
	{
		$('.left.gutter').css({'position': 'absolute', 'top': '116px'}); 
	}
	if (heatBottom <= leftBottom && leftTop <= 116){
		$('.left.gutter').css({'position': 'absolute', 'top': leftStick}); 
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
	if (heatBottom <= rightBottom && rightTop <= 116){
		$('.right.gutter').css({'position': 'absolute', 'top': rightStick}); 
	}



	$(".blurbBox")
		.each(function(){
			// console.log(this)
			var bottom = d3.select(this).node().getBoundingClientRect().bottom
			// console.log(bottom)
			if(bottom <= 0){
				var ind = d3.select(this).attr("class").replace("blurbBox","").replace(/\s/g,"")
				// d3.select(".blurbText." + ind + " .blurbMarker")
					// .style("background","blue")
			}
		})




});

$(window).resize(function(e){
	var category = d3.select(".navButton.active").attr("class").replace("navButton","").replace("active","").replace(/\s/g,"")
	var column = d3.select(".headerCell.active").attr("class").replace("headerCell","").replace("active","").replace(/\s/g,"")

	drawBlurbs(category, column, true)
})