---
layout: section
category: publications
weight: 1
title: Publications
---


{% assign pages_list = site.pages %}
{% for weight in (0..10) %}
<section>
{% for node in pages_list %}
  {% if node.layout != 'section' %}
  {% if node.weight == weight %}
  {% if node.title != null %}
    {% if node.category == "publications" %}
  <article>
    <a class="section-list" href="{{ node.url }}">
      <h2>{{ node.title }} <small>({{ node.publication_type}})</small></h2>
    <img src="{{ node.image }}" title="{{ node.title }} resource" width="250" class="border"></a>
  </article>
    {% endif %}
  {% endif %}
  {% endif %}
  {% endif %}
{% endfor %}
{% endfor %}
</section>