
  let alpha = "abcdefg".split("");

  const margin = {top: 15, bottom: 0, left: 0, right: 0};
  const width = window.innerWidth - margin.right - margin.left - 20;
  const height = window.innerHeight - margin.top - margin.bottom;


  const svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.bottom + margin.top)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


  let y_wrapper = d3.scaleBand()
      .rangeRound([0, height])
      .domain(alpha);

  let y = d3.scaleLinear()
      .rangeRound([y_wrapper.bandwidth(), 0])
      .domain([0, 100]);

  let x = d3.scaleLinear()
      .range([0, width])
      .domain([1, 100]);

  let area = d3.area()
      .x(function(d) { return x(d.day); })
      .y1(function(d) { return y(d.value * 2); })
      .y0(y(0))
      .curve(d3.curveCatmullRom.alpha(0.5));

  drawChart(makeData());

  d3.interval(function(){
    drawChart(makeData());    
  }, 90);

  function drawChart(data){

    let area_path = svg.selectAll(".area")
        .data(data, function(d){ return d.id; });

    area_path
      .transition()
      .duration(380)
      .attr("d", function(d){ return area(d.data); });

    area_path.enter().append("path")
        .attr("class", "area")
        .attr("transform", function(d) { return "translate(0, " + y_wrapper(d.id) + ")"; })
        .attr("d", function(d){ return area(d.data); })

  }

  function makeData(){
    return alpha.map(function(letter){
      let arr = [];
      for (let i = 1; i <= 100; i++){
        let zeroNum = d3.randomUniform(0, 10)()
        zeroNum < 3 ? 
          arr.push({day: i, value: 150}) :
          arr.push({day: i, value: jz.num.randBetween(0, 10)})
      }
      return {
        id: letter,
        data: arr
      }
    });
  }

  d3.select('svg').append('text')
    .attr('class', 'oceanTitle')
    .html('Jared Wilber')
    .attr('x', (width / 2))
    .attr('y', (height / 2) + margin.top)
    .attr('font-family', 'consolas')
    .attr('fill', 'black')
    .attr('font-size', '6rem')
    .attr('text-anchor', 'middle')
    .on('mouseover', function(d) {
        d3.select(this).attr('font-weight', '0')
        d3.select(this).transition().attr('font-size', '5.1rem')
      })
      .on('mouseout', function(d) {
        d3.select(this).attr('font-weight', '0')
        d3.select(this).transition().attr('font-size', '5rem')
      })

  // d3.select('svg').append("svg:a")
  //   .attr("xlink:href", "#aboutMe")
  //   .attr("target", "_self")
  //   .append('text')
  //     .html('(Scroll down)')
  //     .attr('x', (width / 2))
  //     .attr('y', (height / 1.8))
  //     .attr('font-family', 'consolas')
  //     // .attr('font-weight', 'bold')
  //     .attr('fill', 'black')
  //     .attr('text-decoration', 'underline')
  //     .attr('font-size', '1.1rem')
  //     .attr('text-anchor', 'middle')
  //     .attr('class', 'underlinee') 
  //     .on('mouseover', function(d) {
  //       d3.select(this).attr('font-weight', '900')
  //       d3.select(this).attr('font-size', '1.3rem')
  //     })
  //     .on('mouseout', function(d) {
  //       d3.select(this).attr('font-weight', '0')
  //       d3.select(this).attr('font-size', '1.1rem')
  //     })
    

  // d3.select('.heywelcome')
  //     .transition()
  //     .delay(3500)
  //     .attr('visibility', 'visible')

  // svg.append('text')
  //   .attr('class', 'oceanTitle')
  //   .html('Jared Wilber')
  //   .attr('x', (width / 3) - (margin.left + margin.right))
  //   .attr('y', (height / 2) + 100)
  // d3.select('svg').append("foreignObject")
  //   .attr("x", width / 2)
  //   .attr("y", height / 1.5)
  //   .attr('width', width / 2)
  //   .append("xhtml:body")
  //   .html("<a id='top' class='scroll' href='#bottom'>Bottom</a>")

  // svg.append("foreignObject")
  //   .attr("x", width / 4)
  //   .attr("y", height / 3)
  //   .attr('width', width / 2)
  //   .append("xhtml:body")
  //   .html("<p style='font-family:consolas;font-size:1.3rem;font-weight:bold;'>Hello! I’m a recent graduate of UC Berkeley interested in data science, open-source software, and information design. <br><br>I’m currently a data scientist at Neudesic. Previously, I was on the data science team at Classy.org. Feel free to reach out to me via <a href='mailto:jdwlbr@gmail.com'>email</a>, <a href='https://twitter.com/jdwlbr'>Twitter</a>, or <a href='https://github.com/jwilber'>GitHub</a>.<br><br>You can see what I’ve been working on below.</p>")
 
//   enterView({
//   selector: stepSel.nodes(),
//   offset: 0.5,
//   enter: el => {
//     const index = +d3.select(el).attr('data-index');
//     updateChart(index);
//   },
//   exit: el => {
//     let index = +d3.select(el).attr('data-index');
//     index = Math.max(0, index - 1);
//     updateChart(index);
//   }
// });