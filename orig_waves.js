
  let alpha = "abcdefghi".split("");

  const margin = {top: 25, bottom: 0, left: 0, right: 0};
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
        arr.push({day: i, value: jz.num.randBetween(0, 100)}) //5, 130
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
    .attr('y', (height / 2))
    .attr('font-family', 'consolas')
    .attr('font-size', '2.5rem')
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')


  d3.select('svg').append("svg:a")
    .attr("xlink:href", "#aboutMe")
    .attr("target", "_self")
    .append('text')
      .attr('class', 'heywelcome')
      .html("About Me & Projects")
      .attr('x', (width / 2) )
      .attr('y', (height / 1.8))
      .attr('font-family', 'consolas')
      .attr('font-size', '1.1rem')
      .attr('fill', 'black')
      .attr('text-decoration', 'underline')
      .attr('text-anchor', 'middle')
      .on('mouseover', function(d) {
        d3.select(this).attr('font-weight', '900')
        d3.select(this).attr('font-size', '1.3rem')
      })
      .on('mouseout', function(d) {
        d3.select(this).attr('font-weight', '0')
        d3.select(this).attr('font-size', '1.1rem')
      })