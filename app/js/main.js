
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
var ROW_HEIGHT = 20;
var headerHeight = 30;

function drawMenu(){
	var menu = d3.select("#navMenu")
	for(var category in COLUMNS){
		menu.append("div")
			.attr("class", "navButton " + category)
			.datum({ "category" : category})
			.text(category)
			.on("click", function(d){
				d3.selectAll(".navButton.active").classed("active",false)
				d3.select(this).classed("active",true)
				return renderHeatmap(d.category);
			})
	}

}
function renderHeatmap(category){
	d3.selectAll(".cell").remove();
	d3.selectAll(".headercell").remove();
	d3.csv("data/" + category + ".csv", function(data){
		var heatmap = d3.select("#heatmap")
		var header = heatmap.append("div")
			.attr("class", "header")
		header.append("div")
				.attr("class","state headerCell")
				.text("state")
		COLUMNS[category].map(function(column){
			header.append("div")
				.attr("class",function(){ return column + " headerCell"})
				.text(function(){ return column})
				.on("click", function(){
					var category = d3.select(this).attr("class").replace(" headerCell","")
					var duration = 1000;
					d3.selectAll(".row")
						.transition()
						.duration(duration)
						.delay(function(d){
							var rank = (d[category + "_rank"] == 99) ? 52:d[category + "_rank"]
							return rank/52 * duration
						})
						.style("top",function(d){
							var rank = (d[category + "_rank"] == 99) ? 52:d[category + "_rank"]
							return ((rank * ROW_HEIGHT) + headerHeight)  +"px"
						})
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
			.classed("cell state", true)
			.text(function(d){ return d.state})
		COLUMNS[category].map(function(column){
			row.append("div")
				.attr("class", function(d){
					return "cell " + column + " " + getCellClass(d, column, category)
				})
				.text(function(d){
					if(d[column + "_rank"] == ""){
						return "."
					}
					else if(d[column + "_rank"] == 99){
						return "Missing!"
					}else{ return d[column + "_rank"] }
				})
				.on("mouseover", function(d){ mouseover(d, column, category)})
		})

	})
}

function mouseover(datum, column, category){
	console.log(datum[column + "_value"])
	var temp = d3.format(".3f")
	d3.select("#temp span").text(temp(datum[column + "_value"]))
}

function getCellClass(datum, column, category){
	if(datum[column + "_rank"] == ""){
		return "blankCell"
	}
	else if (datum[column + "_rank"] == 99){
		return "errorCell"
	}else{ return "decile-" + (Math.floor(datum[column + "_rank"]/5)+1) }
}


drawMenu();
renderHeatmap("higher");
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
    doStuff($(".styled-select.foo select").val());
});

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
if (isFirefox){
  $(".styled-select select").css("pointer-events","visible");
}

function doStuff(value){
    console.log(value);
}

