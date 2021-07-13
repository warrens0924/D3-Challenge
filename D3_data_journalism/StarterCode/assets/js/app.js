
var xValue = d =>d.poverty;
var yValue = d =>d.healthcare;
var xlabel = "in poverty(%)";
var ylabel = "healthcare(%)";
var svgWidth = 960;
var svgHeight = 600;

// margin variable
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 50
};

// width and height variable 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG 
//var svg = d3
//.select("#scatter")
//.append("svg")
//.attr("width", svgWidth)
//.attr("height", svgHeight);

// Append an SVG group and move it with transform
//var chartGroup = svg.append("g")
//.attr("transform", `translate(${margin.left}, ${margin.top})`);
const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr('class', 'chart');

// import data from csv
d3.csv("assets/data/data.csv").then(function (data) {
    console.log(data);

    data.forEach(function (data) {
        console.log(data);

        data.poverty = + data.poverty;
        data.healthcare = + data.healthcare
    });
    // x and y scales for the plot
    var x = d3.scaleLinear()
        .domain(d3.extent(data, xValue)).nice()
        .range([0, width]);

        var y = d3.scaleLinear()
        .domain(d3.extent(data, yValue)).nice()
        .range([height, 0]);
    // x and y axis
    //var xAxis = d3.axisBottom(xScale);
    // var yAxis = d3.axisLeft(yScale);

    // append axes to the chart
    // chartGroup.append("g")
    //.attr("transform", `translate(0, ${height})`)
    // .call(xAxis);

    // chartGroup.append("g")
    // .call(yAxis);

    var xAxisG = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', width / 2)
        .attr('y', 65)
        .text(xLabel);

    var yAxisG = svg.append("g")
        .call(d3.axisLeft(y))
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', -height / 2)
        .attr('y', -60)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yLabel);

    // create circles
    var circlesGroup = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => {return x(d.poverty);})
        .attr("cy", d => {return y(d.healthcare);})
        .attr("r", 8)
        .attr("fill", "blue")
        .attr('class', 'stateCircle');

    //circle labels
    svg.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("dy", "0.35em")
        .attr("x", d => { return x(d.poverty); })
        .attr("y", d => { return y(d.healthcare); })
        .text(d => { return d.abbr; })
        .attr('class', 'stateText')
        .attr("font-size", "10px");
    // Initialize tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .html(function (d) {
            return `${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}<br>`;
        });
    // Create tooltip in the chart
    svg.call(toolTip);
    // Create event listeners to display and hide the tooltip
    circlesGroup.on("mouseover", function (data) {
        toolTip.show(data, this);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });
});


