var s1_done, s2_done, s3_done, s4_done, s5_done;

$(window).scroll(function(e){
	var y = window.scrollY
	console.log(y)
	if(y >= 1800 && !s1_done){
		s1_done = true
		step1();
	}
	else if(y >= 2700 && !s2_done && ELEMS.length == 2){
		s2_done = true
		step2()
	}
	else if(y >= 3400 && !s3_done && ELEMS.length == 4){
		s3_done = true
		step3()
	}
	else if(y >= 4250 && !s4_done && ELEMS.length == 6){
		s4_done = true
		step4()
	}
	else if(y >= 5100 && !s5_done && ELEMS.length == 8){
		s5_done = true
		step5()
	}
	if(y >= 2155){
		fix();
	}
	if(y < 2755){
		d3.select(".formula")
			.classed("fixed",false)
	}

});

function fix(){
	var left = d3.select(".formula").node().getBoundingClientRect().left
	d3.select(".formula")
		.classed("fixed",true)
		.style("left",left + "px")
	// if(d3.select(".formulaLines").node() == null){
	// 	d3.select(".formula")
	// 		.append("svg")
	// 		.attr("class","formulaLines")
	// 		.attr("width",555)
	// 		.attr("height",476)
	// }
}
var ELEMS = [];
var DURATION = 30
var SHORT_DURATION = 10
var DELAY = 30

function drawLine(x1,y1,x2,y2,duration,delay){
	// d3.selectAll(".formulaLine").remove()
	console.log("asdf")
	d3.select(".formulaLines")
		.append("line")
		.attr("class","formulaLine")
		.attr("x1",x1)
		.attr("y1",y1)
		.attr("x2",x1)
		.attr("y2",y1)
		.transition()
			.delay(delay)
			.duration(duration)
			.attr("x2",x2)
			.attr("y2",y2)
}

function step1(){
	// ELEMS = []
	drawLine("260","80","190","120",DURATION,0)
	drawLine("290","80","360","120",DURATION,0)
	moveIn("#s1",DURATION,0)
	// console.log(bar)
	moveIn("#s2",DURATION,0)
	fadeIn(".s3",SHORT_DURATION,DELAY)
	console.log(ELEMS.length)
}
function step2(){
	// var bar = moveIn("#s1",0,0)
	// moveIn("#s2",0,0)
	// fadeIn(".s3",0,0)
	// if(ELEMS.length == 2){
		drawLine("160","185","120","225",DURATION,0)
		drawLine("190","185","230","225",DURATION,0)
		moveIn("#s4",DURATION,0)
		moveIn("#s5",DURATION,0)
		fadeIn(".s6",SHORT_DURATION,DELAY)
		grey(".grey2")
	// }
}
function step3(){
	moveIn("#s7",DURATION,0)
	moveIn("#s8",DURATION,0)
	fadeIn(".s9",SHORT_DURATION,DELAY)
	grey(".grey3")
}
function step4(){
	drawLine("370","185","330","225",DURATION,0)
	drawLine("400","185","440","225",DURATION,0)
	moveIn("#s10",DURATION,0)
	moveIn("#s11",DURATION,0)
	fadeIn(".s12",SHORT_DURATION,DELAY)
	grey(".grey4")
	white(".white4")
}
function step5(){
	moveIn("#s13",DURATION,0)
	moveIn("#s14",DURATION,0)
	fadeIn(".s15",SHORT_DURATION,DELAY)
	grey(".grey5")
	// white(".white4")
}
function moveIn(elem, duration, delay){
	d3.select(elem)
		.style("opacity",.5)
		.transition()
		.duration(duration)
		.delay(delay)
		.style("left","0px")
		.style("top","0px")
		.style("font-size","18px")
		.style("opacity",1)
		.each('end', function () {
			// console.log(this)
			ELEMS.push(this)
			// foo = this
			// return this
		})
		// console.log(foo)
		// if(typeof(foo) != "undefined"){
			// console.log(foo)
			// return foo
		// }
}
function fadeIn(elem, duration, delay){
	d3.selectAll(elem)
		.transition()
		.duration(duration)
		.delay(delay)
		.style("opacity",1)
}
function grey(elem){
	d3.selectAll(elem)
		.transition()
		.duration(1500)
		.style("opacity",.3)
}
function white(elem){
	d3.selectAll(elem)
		.transition()
		.duration(2000)
		.style("opacity",1)
}