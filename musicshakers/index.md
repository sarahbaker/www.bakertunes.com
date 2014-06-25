---
layout: section
category: musicshakers
post_date: true
weight: 1
title: Musicshakers
---

Part of my work is for [Music Shakers](http://www.musicshakers.com/), music and movement classes for pre-school children.

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