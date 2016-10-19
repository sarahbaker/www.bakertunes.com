---
layout: section
category: musicshakers
weight: 1
title: Music Shakers
---
<aside class="inset right"><a href="http://www.musicshakers.com/" title="Music Shakers site"><img src="http://www.musicshakers.com/musicshakerslogo.jpg" title="Music Shakers logo"></a></aside>

Part of my work is for [Music Shakers](http://www.musicshakers.com/), music and movement classes for pre-school children. Over the last 5 years I've worked on arranging and producing 5 albums of music for the Music Shakers classes, one for each of the terms. I'm currently working on number 6!

{% assign pages_list = site.pages %}

<section>
{% for node in pages_list %}
  {% if node.layout != 'section' %}
  {% if node.title != null %}
    {% if node.category == "musicshakers" %}
  <article>
    <a class="section-list" href="{{ node.url }}"><h3>{{ node.title }}
    <img src="{{ node.image }}" title="{{ node.title }} album cover" width="250"></h3>
    </a>
  </article>
    {% endif %}
  {% endif %}
  {% endif %}
{% endfor %}
</section>