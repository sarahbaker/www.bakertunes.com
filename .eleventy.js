const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-es');
const htmlmin = require('html-minifier');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const _ = require('lodash');

module.exports = function (eleventyConfig) {
  // // RSS Plugin
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  // Return active path attributes
  eleventyConfig.addShortcode('activepath', function (itemUrl, currentUrl) {
    if (itemUrl == '/' && itemUrl !== currentUrl) {
      return '';
    }
    if (currentUrl && currentUrl.includes(itemUrl)) {
      return ' data-current="current item" class="current"';
    }
    return '';
  });

  // Minify CSS
  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter('jsmin', function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  eleventyConfig.addFilter('categoryFilter', function(collection, category) {
    if (!category) return collection;
      const filtered = collection.filter(item => item.data.category == category)
      return filtered;
  });

  // Check a string starts with a character.
  eleventyConfig.addFilter('starts_with', function(str, prefix, not = false) {
    return _.startsWith(str, prefix) !== not;
  });

  // Get all pages with a URL
  eleventyConfig.addCollection('withUrl', (collection) => {
    return collection.getAll().filter(function (item) {
      return item.url;
    });

    return sortByOrder(team);
  });

  // Sort footer menu items by 'order' field
  eleventyConfig.addCollection('footerNav', (collection) => {
    var nav = collection.getFilteredByTag('#footer');
    return sortByOrder(nav);
  });

  // Sort footer secondary menu items by 'order' field
  eleventyConfig.addCollection('footerSecondaryNav', (collection) => {
    var nav = collection.getFilteredByTag('#footersecondary');
    return sortByOrder(nav);
  });

  // Sort main menu items by 'order' field
  eleventyConfig.addCollection('mainNav', (collection) => {
    var nav = collection.getFilteredByTag('#nav');
    return sortByOrder(nav);
  });

  // Sort Teaching items by 'order' field
  eleventyConfig.addCollection('teach', (collection) => {
    var nav = collection.getFilteredByTag('#teaching');
    return sortByOrder(nav);
  });

  // Sort Teaching promo items by 'order' field
  eleventyConfig.addCollection('teachPromo', (collection) => {
    var nav = collection.getFilteredByTag('#teaching-promo');
    return sortByOrder(nav);
  });

  // Sort primary pages by 'order' field
  eleventyConfig.addCollection('primaryNav', (collection) => {
    var nav = collection.getFilteredByTag('#primary');
    return sortByOrder(nav);
  });

  // Sort primary pages by 'order' field
  eleventyConfig.addCollection('composerIndex', (collection) => {
    var items = collection.getFilteredByTag('#composerindex');
    return sortByOrder(items);
  });

  // Sort Soul Song pieces by 'order' field
  eleventyConfig.addCollection('soulSongs', (collection) => {
    var nav = collection.getFilteredByTag('#soulsong');
    return sortByOrder(nav);
  });

  eleventyConfig.addCollection('pianoMusic', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "pianomusic");
    return sortByDate(items);
  });

  eleventyConfig.addCollection('pianoMusicEasy', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "pianomusic" && item.data.tags.includes("Easy Piano"));
    return sortByDate(items);
  });

  eleventyConfig.addCollection('pianoMusicIntermediate', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "pianomusic" && item.data.tags.includes("Intermediate Piano"));
    return sortByDate(items);
  });

  eleventyConfig.addCollection('pianoMusicAdvanced', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "pianomusic" && item.data.tags.includes("Advanced Piano"));
    return sortByDate(items);
  });

  eleventyConfig.addCollection('incidentalMusic', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "incidentalmusic");
    return sortByTitle(items);
  });

  eleventyConfig.addCollection('publicationsList', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "publications");
    return sortByTitle(items);
  });

  eleventyConfig.addCollection('publicationsPromoted', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "publications" && item.data.promoted);
    return sortByOrder(items);
  });

  eleventyConfig.addCollection('songs', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "songs");
    return sortByTitle(items);
  });

  eleventyConfig.addCollection('musicShakers', (collection) => {
    var items = collection.getAll().filter(item => item.data.category == "musicshakers");
    return sortByTitle(items);
  });

  function sortByOrder(collection) {
    return collection.sort((a, b) => {
      if (a.data.order < b.data.order) return -1;
      else if (a.data.order > b.data.order) return 1;
      else return 0;
    });
  }

  function sortByDate(collection) {
    return collection.sort((a, b) => {
      if (a.data.date < b.data.date) return -1;
      else if (a.data.date > b.data.date) return 1;
      else return 0;
    });
  }

  function sortByTitle(collection) {
    return collection.sort((a, b) => {
      if (a.data.title < b.data.title) return -1;
      else if (a.data.title > b.data.title) return 1;
      else return 0;
    });
  }

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('static/');
  eleventyConfig.addPassthroughCopy('CNAME');
  // eleventyConfig.addPassthroughCopy('_includes/assets/');

  /* Markdown Plugins */
  // let markdownIt = require('markdown-it');
  // let markdownItAnchor = require('markdown-it-anchor');
  // let options = {
  //   html: true,
  //   breaks: true,
  //   linkify: false,
  // };
  // let opts = {
  //   permalink: false,
  // };

  // eleventyConfig.setLibrary(
  //   'md',
  //   markdownIt(options).use(markdownItAnchor, opts)
  // );

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link visually-hidden",
      symbol: "#",
      level: [1,2,3,4],
    }),
    slugify: eleventyConfig.getFilter("slug")
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addFilter("markdown", (content) => {
    return markdownLibrary.render(content);
  });

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: '/',

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'pages',
      includes: '../_includes',
      data: '../_data',
      output: '_site',
    },
  };
}