// var s1_done, s2_done, s3_done, s4_done, s5_done;

// $(window).scroll(function(e){
// 	var y = window.scrollY
// 	console.log(y)
// 	if(y >= 2400 && !s1_done){
// 		s1_done = true
// 		step1();
// 	}
// 	else if(y >= 3470 && !s2_done && ELEMS.length == 2){
// 		s2_done = true
// 		step2()
// 	}
// 	else if(y >= 4200 && !s3_done && ELEMS.length == 4){
// 		s3_done = true
// 		step3()
// 	}
// 	else if(y >= 5116 && !s4_done && ELEMS.length == 6){
// 		s4_done = true
// 		step4()
// 	}
// 	else if(y >= 5952 && !s5_done && ELEMS.length == 8){
// 		s5_done = true
// 		step5()
// 	}
// 	if(y >= 2700){
// 		fix();
// 	}
// 	if(y < 2700){
// 		d3.select(".formula")
// 			.classed("fixed",false)
// 	}

// });

function fix(){
	var left = parseFloat(d3.select("#rightEdge").node().getBoundingClientRect().right) + 50 - 100
	d3.select(".formula")
		// .classed("fixed",true)
		.style("margin-top","0px")
		.style("top","20px")
		.style("position","fixed")
		.style("left",left + "px")
}
var ELEMS = [];
var DURATION = 2000
var SHORT_DURATION = 1000
var DELAY = 2000

function drawLine(x1,y1,x2,y2,duration,delay){
	// d3.selectAll(".formulaLine").remove()
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
	drawLine("200","295","140","355",DURATION,0)
	drawLine("230","295","290","355",DURATION,0)
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
	drawLine("470","295","530","355",DURATION,0)
	drawLine("440","295","380","355",DURATION,0)
	moveIn("#s13",DURATION,0)
	moveIn("#s14",DURATION,0)
	fadeIn(".s15",SHORT_DURATION,DELAY)
	grey(".grey5")
	// white(".white4")
}
function step6(){
	white(".grey2")
	white(".grey3")
	white(".grey4")
	white(".grey5")
}
function step7(){
	var lag = 200
	var n = 3
/////////////////////////////
	d3.select(".a1")
		.classed("anim", true)
		.style("border-bottom","none")
		.transition()
		.duration(3000)
		.style("top","813px")
		.style("color","#333")
		.style("left","-527px")
		.style("font-size","16px")
	d3.select(".f10 #l1.s9")
		.classed("anim", true)
		.classed("blueText", true)
		.transition()
		.delay(lag)
		.duration(3000)
		.style("top","388px")
		.style("left","-280px")
		.style("color","#333")
	d3.select(".f7 #l1.s9")
		.classed("anim", true)
		.classed("blueText", true)
		.transition()
		.delay(lag*2)
		.duration(3000)
		.style("top","376px")
		.style("left","-323px")
		.style("color","#333")
	d3.select("#l1.s6")
		.classed("anim", true)
		.classed("blueText", true)
		.transition()
		.delay(lag*3)
		.duration(3000)
		.style("top","540px")
		.style("left","-40px")
		.style("color","#333")
	d3.select(".f3 .s12")
		.classed("anim", true)
		.classed("bord", true)
		.style("border-bottom","none")
		.transition()
		.delay(lag*4)
		.duration(3000)
		.style("top","600px")
		.style("left","-180px")
		.style("color","#333")
		.style("font-size","16px")
	d3.select(".f6-2")
		.classed("anim", true)
		.classed("bord", true)
		.style("border-bottom","none")
		.transition()
		.delay(lag*5)
		.duration(3000)
		.style("top","474px")
		.style("left","-255px")
		.style("color","#333")
		.style("font-size","16px")
	d3.select(".s15.f9-2")
		.classed("anim", true)
		.classed("bord", true)
		.style("border-bottom","none")
		.transition()
		.delay(lag*6)
		.duration(3000)
		.style("top","474px")
		.style("left","-43px")
		.style("color","#333")
		.style("font-size","16px")
		.each('end', function () {
			d3.selectAll(".anim.blueText")
				.style("opacity",0)
				.style("top","0px")
				.style("left","0px")
				.style("color","#1696d2") 	
				.transition()
				.style("opacity",1)
			d3.selectAll(".anim.bord")
				.style("opacity",0)
				.style("top","0px")
				.style("left","0px")
				.style("color","#1696d2")
				.transition()
				.style("opacity",1)
			d3.select(".a1")
				.style("opacity",0)
				.style("top","0px")
				.style("left","0px")
				.style("color","#fff")
				.style("font-size","26px")
				.style("border-bottom","1px solid #fff")
				.transition()
				.style("opacity",1)
			d3.selectAll(".anim.bord")
				.style("opacity",0)
				.style("top","0px")
				.style("left","0px")
				.style("color","#fff")
				.style("font-size","18px")
				.style("border-bottom","1px solid #fff")
				.transition()
				.style("opacity",1)
			d3.selectAll(".innerHeader")
				.transition()
				.style("opacity",1)
		});





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