---
layout: section
category: musicshakers
post_date: true
weight: 1
title: Music Shakers
---
<aside class="inset right">[![Music Shaker](http://www.musicshakers.com/musicshakerslogo.jpg)](http://www.musicshakers.com/)</aside>

Part of my work is for [Music Shakers](http://www.musicshakers.com/), music and movement classes for pre-school children. Over the last 5 years I've worked on arranging and producing 5 albums of music for the Music Shakers classes, one for each of the terms. I'm currently working on number 6!

{% assign pages_list = site.pages %}

<section>
{% for node in pages_list %}
  {% if node.title != null %}
    {% if node.section == "musicshakers" %}
  <article>
    <a class="section-list" href="{{ node.url }}"><h3>{{ node.title }}
    ![{{ node.title }} album cover]({{ node.image }})</h3>
    </a>
  </article>
    {% endif %}
  {% endif %}
{% endfor %}
</section>