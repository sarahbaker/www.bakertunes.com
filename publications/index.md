---
layout: section
category: publications
weight: 1
title: Publications
---


{% assign pages_list = site.pages %}
{% assign i = 0 %}
<section class="section-list publications-list">
  <div class="row">
  {% for weight in (0..10) %}
  {% for node in pages_list %}
    {% if node.layout != 'section' %}
    {% if node.weight == weight %}
    {% if node.title != null %}
      {% if node.category == "publications" %}
        {% assign mod2 = i | modulo: 2 %}
        {% assign mod3 = i | modulo: 3 %}
        <article class="col-md-4 col-sm-6 equal-height list-item">
          <div class="inner">
            <a class="list-item-link" href="{{ node.url }}">
              <h2>{{ node.title }}</h2>
            </a>
            <p>({{ node.publication_type}})</p>
            <div class="img-container">
              <img src="{{ node.image }}" title="{{ node.title }} resource" class="img-thumbnail img-responsive" />
            </div>
          </div>
        </article>
        {% if mod2 == 1 %}<div class="clearfix visible-sm-block"></div>{% endif %}
        {% if mod3 == 2 %}<div class="clearfix visible-md-block visible-lg-block"></div>{% endif %}
        {% assign i = i | plus:1 %}
      {% endif %}
    {% endif %}
    {% endif %}
    {% endif %}
  {% endfor %}
  {% endfor %}
  </div>
</section>
