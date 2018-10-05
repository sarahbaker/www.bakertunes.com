---
layout: section
category: pianomusic
image: /public/images/piano-score.jpg
weight: 1
title: Piano Music
permalink: /pianomusic/
---

I've loved composing since I got my first Casio keyboard for Christmas when I was eight. Through my piano teaching and arranging work I have loads of opportunities to hear new pieces and enjoy seeing pupils experimenting with different styles.

I have noticed that composers such as Einaudi and Yiruma are writing music that seems to appeal to many young musicians. Several of my teenage pupils really enjoy playing their music and will come to lessons having discovered new pieces which they want to learn. 

I was inspired to write some short pieces for piano in a similar style for my own, slightly older pupils.

My intention was to keep the pieces within a fairly small range and to use the broken chord accompaniment style that gives the works a flowing quality. As I started to work on new ideas, I quickly discovered that the pieces seemed to take on a life of their own and I simply went with the flow! I love the way that ideas and images seem to come to mind as the melodic shape and harmonies find their voice.

Please feel free to download the scores for these and share.

You will also see some improvisations that I've done when, on that rare occasion, I discover free time to enjoy playing.

{% assign sorted_pianomusic = site.pianomusic | sort: 'date' %}
{% assign sorted_pianomusic_rev = sorted_pianomusic | reverse %}

<section class="row">
{% for node in sorted_pianomusic_rev %}
  {% if node.layout == 'page' %}
  {% if node.title != null %}
  <article class="col-sm-6 col-lg-4 match-height">
  <a class="section-list" href="{{ node.url }}"><h3>{{ node.title }}</h3>{% if node.image %}
    <img src="{{ node.image }}" title="{{ node.title }}" class="img-thumbnail img-responsive">{% endif %}</a>

  {% if forloop.first %}
  {{ node.excerpt }}
  {% endif %}
  {% if node.tags %}
  <div class="tags">
  {% for tag in node.tags %}
  <small><span class="badge">{{ tag }}</span></small>
  {% endfor %}
  </div>
  {% endif %}

  </article>
  {% endif %}
  {% endif %}
  {% endfor %}
</section>
