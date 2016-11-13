---
layout: section
category: publications
weight: 1
title: Publications
---


{% assign pages_list = site.pages %}
<section class="row">
{% for weight in (0..10) %}
{% for node in pages_list %}
  {% if node.layout != 'section' %}
  {% if node.weight == weight %}
  {% if node.title != null %}
    {% if node.category == "publications" %}
  <article class="col-md-4 col-sm-6">
    <a class="section-list" href="{{ node.url }}">
      <h2>{{ node.title }} <small>({{ node.publication_type}})</small></h2>
    <img src="{{ node.image }}" title="{{ node.title }} resource" class="img-responsive"></a>
  </article>
    {% endif %}
  {% endif %}
  {% endif %}
  {% endif %}
{% endfor %}
{% endfor %}
</section>