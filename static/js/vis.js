function skillsArcs() {
	var w = '100%',
		h = 580;

	var data = [{
		'skill': 'Python',
		'proficiency': 9
	}, {
		'skill': 'Data Visualization',
		'proficiency': 8
	}, {
		'skill': 'Web Development',
		'proficiency': 9
	}, {
		'skill': 'Algorithms',
		'proficiency': 8
	}, {
		'skill': 'Data Structures',
		'proficiency': 8
	}, {
		'skill': 'Sql & Databases',
		'proficiency': 7
	}, {
		'skill': 'Linux',
		'proficiency': 8
	}]

	var svg = d3.select('div.skills')
		.select('svg')
		.attr("viewBox", "100 0 1080 600")
		.attr("preserveAspectRatio", "xMinYMin meet");

	svg.selectAll('*').remove();
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
					return 'translate(' + (180 + (i * 420)) + ', 100)'
				else if (i <= 5)
					return 'translate(' + (180 + ((i - 3) * 420)) + ', 300)'
				else
					return 'translate(' + (180 + ((i - 6) * 420)) + ', 500)'
			}
		});

	innerGs.each(function(d, i) {
		var g = d3.select(this);
		g.append('text')
			.attr('x', function(d) {
				return d.skill.length * (-4.5);
			})
			.attr('y', -80)
			.text(function(d) {
				return d.skill
			})
			.style('font-size', '14px')
		g.append('text')
			.attr('x', -20)
			.attr('y', 3)
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
				endAngle: 0 //(d.proficiency / 10) * tau
			})
			.style("fill", "orange")
			.classed('foreground', true)
			.attr("d", arc);

		foreground.transition()
			.duration(3000)
			.attrTween("d", arcTween((d.proficiency / 10) * tau));

		function arcTween(newAngle) {
			return function(d) {
				var interpolate = d3.interpolate(d.endAngle, newAngle);
				return function(t) {
					d.endAngle = interpolate(t);
					return arc(d);
				};
			}
		};

	});
}