var s1_done	;

$(window).scroll(function(e){
	var y = window.scrollY
	if(y >= 1979 && !s1_done){
		s1_done = true
		step1();
	}
	if(y >= 1979){
		d3.select(".formula")
			.classed("fixed",true)
	}
	if(y < 1979){
		d3.select(".formula")
			.classed("fixed",false)
	}

});

function step1(){
	moveIn("#s1",3000,0)
	moveIn("#s2",3000,0)
	fadeIn(".s3",1000,3000)
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