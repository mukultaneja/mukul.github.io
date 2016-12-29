function getColor() {
	var min = 0,
		max = 255,
		red = parseInt(Math.random() * max),
		green = parseInt(Math.random() * max),
		blue = parseInt(Math.random() * max);
	return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function lifeCycle() {
	var w = '100%',
		h = 300;

	var data = [{
		'year': 1991,
		'event': 'birth',
		'result': 'Life Cycle Begin',
		'formattedText': 'Came into this world :)'
	}, {
		'year': 2006,
		'event': 'Class 10th',
		'result': 'Got cleared with 79.67%',
		'formattedText': 'Class 10th'
	}, {
		'year': 2008,
		'event': 'Class 12th',
		'result': 'Got cleared with 72.67%',
		'formattedText': 'Class 12th'
	}, {
		'year': 2009,
		'event': 'Under Graduation Degree : B.Tech',
		'result': 'Started differnt phase of life',
		'formattedText': 'Started B.Tech'
	}, {
		'year': 2011,
		'event': 'Industry Certification : Red Hat Certified Engineer',
		'result': 'Passed RHCE Certification \n from RHEL on Linux',
		'formattedText': 'RHCE Certification'
	}, {
		'year': 2011,
		'event': 'Industry Certification : Red Hat Certified System Administrator',
		'result': 'Passed RHCSA Certification \n from RHEL on Linux',
		'formattedText': 'RHCSA Certification'
	}, {
		'year': 2013,
		'event': 'Under Graduation Degree : B.Tech Completed',
		'result': 'Got cleared with 69.53%',
		'formattedText': 'Completed B.Tech'
	}, {
		'year': 2013,
		'event': 'Company Name: Ollosoft',
		'result': 'Description: Job in Ollosoft\
				   \n Position:  Software Developer\
				   \n Period : Sep-2013\
				   \n Place: Jaipur\
				   \n Proficiency: PHP/ HTML/ CSS/ Jquery/ Databases',
		'formattedText': '@Ollosoft'
	}, {
		'year': 2014,
		'event': 'Company Name: In Time Tec',
		'result': 'Description : Job in In Time Tec\
				  \n Position: Software Developer\
				  \n Period: Apr-2014\
				  \n Place: Jaipur\
				  \n Proficiency: PHP/ HTML/ CSS/ Jquery/ Databases',
		'formattedText': '@In Time Tec'
	}, {
		'year': 2015,
		'event': 'Company Name: Gramener',
		'result': 'Description : Job in Gramener\
				  \n Position: Associate Data Specialist\
				  \n Period : Dec-2015\
				  \n Place: Bangalore\
				  \n Proficiency: Python/ D3.js/ Data Analysis',
		'formattedText': '@Gramener'
	}];

	var svg = d3.select('div.about-me-content')
		.append('svg')
		.attr("viewBox", "0 0 1160 280")
		.attr("preserveAspectRatio", "xMinYMin meet");;

	var g = svg.append('g')
		.attr('transform', 'translate(10, 200)');

	var circle = g.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('r', 35)
		.attr('cx', function(d, i) {
			return i * 118 + 38
		})
		.attr('cy', 310)
		.attr('fill', function(d, i) {
			return getColor()
		})
		.on('mouseover', function(event) {
			d3.select(this)
				.append('title')
				.text(function(d) {
					return d.event + ' \n ' + d.result;
				})
		});

	var eventText = g.selectAll('text.event')
		.data(data)
		.enter()
		.append('text')
		.classed('event', true)
		.attr('x', function(d, i) {
			return i * 118 + 30
		})
		.attr('y', 310)
		.text(function(d) {
			return d.year
		})

	var descriptionText = g.selectAll('text.description')
		.data(data)
		.enter()
		.append('text')
		.classed('description', true)
		.attr('x', function(d, i) {
			return i * 118 + 30
		})
		.attr('y', 410)
		.text(function(d) {
			return d.formattedText;
		})

	var line = g.append('line')
		.attr('x1', '0')
		.attr('y1', '0')
		.attr('x2', '0')
		.attr('y2', '0')
		.attr('stroke', 'black');

	line.transition()
		.delay(500)
		.ease('linear')
		.duration(28000)
		.attr('x2', w)
		.attr('y2', '0');

	circle.transition()
		.delay(function(d, i) {
			return i * 2500;
		})
		.duration(4500)
		.attr('cy', function(d, i) {
			return -35;
		})
		.attr('fill', function(d, i) {
			return getColor()
		})

	eventText.transition()
		.delay(function(d, i) {
			return i * 2500;
		})
		.duration(2500)
		.attr('y', function(d, i) {
			return 28;
		})
		.attr('x', function(d, i) {
			return i * 118 + 15;
		});

	descriptionText.transition()
		.delay(function(d, i) {
			return i * 2500;
		})
		.duration(4500)
		.attr('y', function(d, i) {
			return -100;
		})
		.attr('x', function(d, i) {
			return i * 120 - 10;
		})
		.each('end', function() {
			d3.select(this).transition()
				.duration(2500)
				.attr('y', -300);
		});
}

function skillsArcs() {
	var w = '100%',
		h = 580;

	var data = [{
		'skill': 'Python Language',
		'proficiency': 8
	}, {
		'skill': 'Data Visualization',
		'proficiency': 7
	}, {
		'skill': 'Web Development',
		'proficiency': 9
	}, {
		'skill': 'Alogrithms Learning',
		'proficiency': 7
	}, {
		'skill': 'Data Structures',
		'proficiency': 7
	}, {
		'skill': 'Sql & DataBases',
		'proficiency': 6
	}, {
		'skill': 'Ease for Linux OS',
		'proficiency': 7
	}]
	var svg = d3.select('div.skills')
		.append('svg')
		.attr("viewBox", "10 0 1140 580")
		.attr("preserveAspectRatio", "xMinYMin meet");

	var g = svg.append('g')
	var tau = 2 * Math.PI;

	var arc = d3.svg.arc()
		.innerRadius(45)
		.outerRadius(60)
		.startAngle(0);

	var innerGs = g.selectAll('g')
		.data(data)
		.enter()
		.append('g')
		.attr({
			'transform': function(d, i) {
				if (i <= 2)
					return 'translate(' + (180 + (i * 400)) + ', 100)'
				else if (i <= 5)
					return 'translate(' + (180 + ((i - 3) * 400)) + ', 300)'
				else
					return 'translate(' + (180 + ((i - 6) * 400)) + ', 500)'
			}
		});

	innerGs.each(function(d, i) {
		var g = d3.select(this);
		g.append('text')
			.attr('x', -50)
			.attr('y', -80)
			.text(function(d) {
				return d.skill
			})
		g.append('text')
			.attr('x', -15)
			.attr('y', 0)
			.text(function(d) {
				return d.proficiency + ' / ' + 10
			})
		var background = g.append('path')
			.datum({
				endAngle: tau
			})
			.style("fill", "#ddd")
			.classed('background', true)
			.attr("d", arc);
		var foreground = g.append("path")
			.datum({
				endAngle: (d.proficiency / 10) * tau
			})
			.style("fill", "orange")
			.classed('foreground', true)
			.attr("d", arc);
	});
}

function contactMe() {
	var w = 1140,
		h = 580,
		data = [{
			'x': 100,
			'y': 100,
			'r': 45
		}, {
			'x': 20,
			'y': 20,
			'r': 45
		}, {
			'x': 40,
			'y': 40,
			'r': 45
		}, {
			'x': 60,
			'y': 60,
			'r': 45
		}, {
			'x': 80,
			'y': 80,
			'r': 45
		}, {
			'x': 100,
			'y': 100,
			'r': 45
		}, {
			'x': 120,
			'y': 120,
			'r': 45
		}],
		links = [{
			'source': 0,
			'target': 1
		}, {
			'source': 0,
			'target': 2
		}, {
			'source': 0,
			'target': 3
		}, {
			'source': 0,
			'target': 4
		}, {
			'source': 0,
			'target': 5
		}, {
			'source': 0,
			'target': 6
		}];

	var svg = d3.select('div.contact-me')
		.append('svg')
		.attr("viewBox", "-30 -20 1340 680")
		.attr("preserveAspectRatio", "xMinYMin meet");;

	var force = d3.layout.force()
		.size([w, h])
		.charge(-1250)
		.nodes(data)
		.links(links)
		.on('tick', tick);

	force.linkDistance(350);

	var drag = force.drag()
		.on("dragstart", dragstart);

	var link = svg.selectAll('.link')
		.data(links)
		.enter().append('line')
		.attr('class', 'link')
		.attr('stroke', 'black');

	var storeImages = ['images/facebook-icon.png',
		'images/linkedin-icon.png',
		'images/mail-icon.png',
		'images/twitter-icon.png',
		'images/github-icon.png',
		'images/hacker-earth-icon.png'
	];

	var patternIds = ['facebook', 'linkedin', 'gmail', 'twitter', 'github', 'hacker-earth']

	var defs = svg.append('defs');

	var pattern = defs.selectAll('pattern')
		.data(data)
		.enter()
		.append('pattern')
		.attr('id', function(d, i) {
			return patternIds[i];
		})
		.attr('x', 0)
		.attr('y', 0)
		.attr('patternUnits', 'userSpaceOnUse')
		.attr('height', 1)
		.attr('width', 1)

	var mediaImages = pattern.append('image')
		.data(data)
		.attr('x', 0)
		.attr('y', 0)
		//.attr('xlink:href', function(d, i){ return storeImages[i]; })

	var node = svg.selectAll('.node')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'node')
		// .attr('fill', function(d, i) {
		// 	if (i == 0)
		// 		return 'silver';
		// })
		// .attr('fill', function(d, i){
		// 	return 'url(#' + patternIds[i] + ')';
		// })
		.call(drag);

	node.select('use')
		.data(data)
		.enter()
		.append('use')
		.attr("xlink:href", function(d, i) {
			return '#' + patternIds[i];
		})

	function tick() {
		node.attr('cx', function(d) {
				return d.x;
			})
			.attr('cy', function(d) {
				return d.y;
			})
			.attr('r', function(d) {
				return d.r
			});

		link.attr('x1', function(d) {
				return d.source.x;
			})
			.attr('y1', function(d) {
				return d.source.y;
			})
			.attr('x2', function(d) {
				return d.target.x;
			})
			.attr('y2', function(d) {
				return d.target.y;
			});

	};

	force.start();

	function dragstart(d) {
		d3.select(this).classed("fixed", d.fixed = true);
	}
}