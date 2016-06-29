
var eventsDataset = [
	[2004, '8th 89%', 1],
	[2005, '15', 2],
	[2006, '10th 79.67%', 4],
	[2007, '17', 5],
	[2008, '12th 72.67%', 5],
	[2009, 'Engg. Sem 1', 5],
	[2010, '20', 6],
	[2011, 'RHCE Certification', 7],
	[2011, 'RHCSA Certification', 7],
	[2012, '22', 7],
	[2013, 'Graduated 69.57%', 6],
	[2013, 'First Job @Ollosoft Technologies', 7],
	[2014, 'Job @In Time Tec', 8],
	[2015, 'Job @Gramener', 9],
	[2016, '@Gramener', 9],
]

var domains = [ 2004, 2005, 2006, 2007, 2008, 2009, 
				2010, 2011, 2012, 2013, 2014, 2015,
				2016
			]

function getDataSet(){
	var dataset = [];
	var events = [];
	var i = 15;
	var j = 250;
	var count = 0;
	var l = eventsDataset.length;
	
	while (count < l){
		events.push({ 'year' : eventsDataset[count][0],
					  'event' : eventsDataset[count][1],
					  'progress' : eventsDataset[count][2]
					});
		count += 1;
	}

	for (event in events){
		currentEvent = events[event];
		lastEvent = events[event - 1];
		if (event == 0) {
			dataset.push([i, j, currentEvent.event, event]);
		}else {
			if (currentEvent.progress > lastEvent.progress) {
				if (currentEvent.progress > 5) {
					j -= 30;
				}else if (currentEvent.progress == 5) {
					j -= 20;
				}else {
					j -= 10;
				}
			}else if (currentEvent.progress == lastEvent.progress) {
				j = j;
			}else {
				if (currentEvent.progress > 5) {
					j += 10;
				}else if (currentEvent.progress == 5) {
					j += 20;
				}else {
					j += 30;
				}
			}
			if (currentEvent.year == lastEvent.year){
				i += 10;
				dataset.push([i, j, currentEvent.event, event]);
				i -= 10;
			}else if (currentEvent.year > lastEvent.year){
				i += 92;
				dataset.push([i, j, currentEvent.event, event]);
			}
		}
	}

	return dataset;
}

var height = '600px';
var width = '100%';

var xScale = d3.scale.linear()
				.domain([d3.min(domains, function(d){ return d }),
						 d3.max(domains, function(d){ return d })
						])
				.range([0, 1100]);

var svgElement = d3.select('#about-me-text')
				.append('svg')
				.attr('height', height)
				.attr('width', width)
				.style('padding', '0px');

var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom');

var cirlces = svgElement.selectAll('circle')
				.data(getDataSet())
				.enter()
				.append('circle')
				.attr('cx', function(d){
					return d[0];
				})
				.attr('cy', function(d){
					return d[1] + 400;
				})
				.attr('r', 10);

var textElements = svgElement.selectAll('text')
				.data(getDataSet())
				.enter()
				.append('text')
				.attr('x', function(d){
					return d[0] - 15;
				})
				.attr('y', function(d){
					return d[1] + 400;
				})
				.text(function(d){
					return d[2];
				});

cirlces.transition()
			.delay(1500)
			.attr('cy', function(d){ return d[1] - 10 })
			.attr('fill', 'black')
			.duration(1000);

textElements.transition()
			.delay(1500)
			.attr('y', function(d){ 
				if (d[3] % 2 == 0){
					return d[1] + 40 
				}else {
					return d[1] - 50
				}
			})
			.attr('fill', 'black')
			.duration(1000);

svgElement.append('g')
			.attr("class", "axis")
			.attr("transform", "translate(15, 400)")
			.call(xAxis)
