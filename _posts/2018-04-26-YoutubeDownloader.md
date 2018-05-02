---
layout: post
title:  "YoutubeDownloader"
date:   2018-04-26
description: " - An automated service to download multiple youtube videos at a time."
lang: "en"
author: "Mukul Taneja"
fb: '<div class="fb-like" data-href="https://mukultaneja.github.io/2018/04/26/YoutubeDownloader.html" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>'
linkedin: '<script src="//platform.linkedin.com/in.js" type="text/javascript"> lang: en_US</script>
<script type="IN/Share" data-url="https://mukultaneja.github.io/2018/04/26/YoutubeDownloader.html"></script>'
twitter: '<a class="twitter-share-button"
  href="https://twitter.com/intent/tweet?text=https://mukultaneja.github.io/2018/04/26/YoutubeDownloader.html"
  data-size="large" target="_blank">
Tweet</a>'
---
The Internet is a new friend for this generation. There is no doubt it is making people's life easier day by day. It has put the world at a very small compass and allowed people to stay connected with each other irrespective of the places where they are living. It gives leverages to people to learn new things, make communities and share their knowledge/ideas with each other. It also helps businesses to improve/grow and eventually get new opportunities in their respective domains.

Youtube is a tool which is a side effect of the Internet. It is a free platform which allows people to share digital contents with the world in a second. Nowadays each and every industry uses this tool to reach out to their target audience. Where Youtube provides a free podium to people to come up and show their talent, at the same time it provides the free audience to appraise this new talent and consume the new content as well. The entertainment industry is booming every day with this tool where new talent is coming and sharing their content freely with the world.

<br />
#### About
<hr />

YoutubeDownloader is a tool which helps people to consume digital content respective to their interest. It is an automated service to download multiple youtube videos at a time.

YoutubeDownloader is written in Python. It uses Asynchronous Python Multiprocessing at its heart which facilitates user to download more than one video at a time.

YoutubeDownloader must use a configuration file. It supports a YAML / JSON format of a configuration file. This configuration file gives structure and usability to the service. It defines what videos/playlists need to be downloaded and how they are going to be stored.

<br />
#### Configuration Syntax
<hr />
YoutubeDownloader supports YAML / JSON configuration formats. YoutubeDownloader prefers YAML more than JSON. Below is the snippet of sample configurations in YAML / JSON format.

<pre>
<code>
settings:
  process: 2
download:
  mostlyinsane:
    dirname: '../mostlyinsane'
    videos: 
      - 'https://www.youtube.com/watch?v=vcKPjDUc5EQ'
  trippling:
    dirname: 'trippling'
    playlists: 'https://www.youtube.com/watch?list=PLTB0eCoUXEraZe3d7fJRdB-znE5D0cMZ7'
  official-ceogiri:
    dirname: 'official-ceogiri'
    playlists:
    	- 'https://www.youtube.com/watch?list=PLTB0eCoUXEraZe3d7fJRdB-znE5D0cMZ7'
</code>
</pre>
<pre>
<code>
{
	"settings": {
		"process": 5
	},
	"download": {
		"mostlyinsane": {
			"dirname": "../mostlyinsane",
			"videos": [
				"https://www.youtube.com/watch?v=vcKPjDUc5EQ"
			]

		},
		"trippling": {
			"dirname": "trippling",
			"playlists": "https://www.youtube.com/watch?list=PLTB0eCoUXEraZe3d7fJRdB-znE5D0cMZ7"

		},
		"official-ceogiri": {
			"dirname": "official-ceogiri",
			"playlists": [
				"https://www.youtube.com/watch?list=PLTB0eCoUXEraZe3d7fJRdB-znE5D0cMZ7"
			]

		}
	}
}
</code>
</pre>

settings defines service level variables.

process to force YoutubeDownloader to use Asynchronous Python Multiprocessing and tells how many processes should be deployed to download videos/playlists at a time.
download defines what videos/playlists to download. It tags dirnames with videos/playlists internally and store the downloaded videos/playlists in the respective directory.

dirname relative / absolute directory path to store videos in.
videos single / array of youtube videos link to download.
playlists single / array of youtube playlists link to download.

<br />
#### Install
<hr />

This is a pure-Python package built for Python 2.6+ and Python 3.0+. To set up:

<pre>
 <code>
 sudo pip install ytdownloader
 </code>
</pre>

<br />
#### Usage
<hr />

<pre>
<code>
ytdownloader --version    // latest version of ytdownloader
</code>
</pre>

<pre>
<code>
ytdownloader --about      // about text for ytdownloader
</code>
</pre>

<pre>
<code>
// start the ytdownloader and search config file in current directory
ytdownloader
</code>
</pre>

<pre>
<code>
// start the ytdownloader and use docs/config.yaml as config file
ytdownloader docs/config.yaml
</code>
</pre>

<br />
#### Resources
<hr />

I have hosted this project on GitHub. I have launched this [tool](https://github.com/mukultaneja/YoutubeDownloader) as an open source software and I would be more than happy if I get contributions/suggestions from the community.