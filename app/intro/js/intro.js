var s1_done, s2_done, s3_done, s4_done, s5_done;

$(window).scroll(function(e){
	var y = window.scrollY
	console.log(y)
	if(y >= 1800 && !s1_done){
		s1_done = true
		step1();
	}
	else if(y >= 2700 && !s2_done){
		s2_done = true
		step1()
		step2()
	}
	else if(y >= 3400 && !s3_done){
		s3_done = true
		step3()
	}
	else if(y >= 4250 && !s4_done){
		s4_done = true
		step4()
	}
	else if(y >= 5100 && !s5_done){
		s5_done = true
		step5()
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
	moveIn("#s1",0,0)
	moveIn("#s2",0,0)
	fadeIn(".s3",0,0)

	moveIn("#s4",3000,0)
	moveIn("#s5",3000,0)
	fadeIn(".s6",1000,3000)
	grey(".grey2")
}
function step3(){
	moveIn("#s7",3000,0)
	moveIn("#s8",3000,0)
	fadeIn(".s9",1000,3000)
	grey(".grey3")
}
function step4(){
	moveIn("#s10",3000,0)
	moveIn("#s11",3000,0)
	fadeIn(".s12",1000,3000)
	grey(".grey4")
	white(".white4")
}
function step5(){
	moveIn("#s13",3000,0)
	moveIn("#s14",3000,0)
	fadeIn(".s15",1000,3000)
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
		})
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