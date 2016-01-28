var s1_done, s2_done;

$(window).scroll(function(e){
	var y = window.scrollY
	console.log(y)
	if(y >= 1979 && !s1_done){
		s1_done = true
		step1();
	}
	else if(y >= 2777 && !s2_done){
		s2_done = true
		step2()
	}
	if(y >= 2155){
		fix();
	}
	if(y < 2155){
		d3.select(".formula")
			.classed("fixed",false)
	}

});

function fix(){
	var left = d3.select(".formula").node().getBoundingClientRect().left
	d3.select(".formula")
		.classed("fixed",true)
		.style("left",left + "px")
}

function step1(){
	moveIn("#s1",3000,0)
	moveIn("#s2",3000,0)
	fadeIn(".s3",1000,3000)
}
function step2(){
	moveIn("#s4",3000,0)
	moveIn("#s5",3000,0)
	fadeIn(".s6",1000,3000)
	grey(".grey2")
}
function moveIn(elem, duration, delay){
	d3.select(elem)
			.style("opacity",1)

		.transition()
		.duration(duration)
		.delay(delay)
		.style("left","0px")
		.style("top","0px")
		.style("font-size","18px")
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
		.duration(2000)
		.style("opacity",.3)
}