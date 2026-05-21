import { DateTime } from "luxon";
import CleanCSS from "clean-css";
import UglifyJS from "uglify-js";
import { minify } from "html-minifier-terser";
import pluginRss from "@11ty/eleventy-plugin-rss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import mdIterator from 'markdown-it-for-inline';
import { execSync }  from 'child_process';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import timeToRead  from "eleventy-plugin-time-to-read";
import Image from "@11ty/eleventy-img";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
  const environment = process.env.ELEVENTY_ENV;
  const PROD_ENV = 'production';
  const isProd = environment === PROD_ENV;

  // // RSS Plugin
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Time to read
  eleventyConfig.addPlugin(timeToRead, {
    speed: '850 characters per minute',
    style: "short"
  });

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

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: "html",

    // Add any other Image utility options here:

    // optional, output image formats
    formats: ["webp", "jpeg"],
    // formats: ["auto"],
    sharpWebpOptions: {
      quality: 67
    },
    sharpJpegOptions: {
      quality: 67
    },

    // optional, output image widths
    widths: [1980, 1200, 800, 500, 300],

    urlPath: "/static/img/",
    outputDir: "./_site/static/img/",

    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "auto",
    },
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
    return str.startsWith(prefix) !== not;
  });

   // Date filter to convert date objects to ISO 8601 format
  eleventyConfig.addFilter('iso8601', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO()
  })

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  /* Trim trailing characters */
  eleventyConfig.addFilter('trimTrailingChar', (text, char = '/') => {
    return trimTrailingChars(text, char);
  });

  function trimTrailingChars(s, charToTrim) {
    var regExp = new RegExp(charToTrim + "+$");
    var result = s.replace(regExp, "");

    return result;
  }

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

  // Blog items
  eleventyConfig.addCollection('blogs', (collection) => {
    var blogs = collection.getFilteredByGlob('pages/blog/**/*.md');
    return sortByDate(blogs).reverse();
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

  eleventyConfig.addFilter('sortByDate', (collection, andSticky = true) => {
    return sortByDate(collection, andSticky);
  });

  eleventyConfig.addAsyncShortcode("imageData", async function(src) {
    src = `./pages` + src;
    let picture = await getPictureData(src, [1200]);
    return picture.jpeg[0].url;
  });

  async function getPictureData(src, widths = [300, 620, 1000, 1980]) {
    let metadata = await Image(src, {
      widths: widths,
      formats: ['jpeg'],
      urlPath: "/static/img/",
      outputDir: "./_site/static/img/"
    });
    return metadata;
  };

  /* Easy Soundcloud player markup
   *
   * req:
   *   sid: Soundcloud item ID
   */
  eleventyConfig.addShortcode('soundCloudPlayer', (sid) => {
    let markup = `<div class="embed-container soundcloud-embed-container">
  <figure class="fig fig-sound">
    <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A${sid}&color=ff5500"></iframe>
  </figure>
</div>`;
    return markup;
  });

  /* Easy YouTube player markup
   *
   * req:
   *   ytid: YouTube item ID
   */
  eleventyConfig.addShortcode('youTubePlayer', (ytid) => {
    let markup = `<div class="embed-container youtube-embed-container">
  <figure class="fig fig-video">
    <iframe width="640" height="410" src="https://www.youtube.com/embed/${ytid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </figure>
</div>`;
    return markup;
  });


  // // Minify HTML output
  // eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
  //   if (outputPath && outputPath.indexOf('.html') > -1) {
  //     let minified = htmlmin.minify(content, {
  //       useShortDoctype: true,
  //       removeComments: true,
  //       collapseWhitespace: true,
  //     });
  //     return minified;
  //   }
  //   return content;
  // });

  // Minify HTML
  eleventyConfig.addTransform("minify", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: isProd
			});

			return minified;
		}

		// If not an HTML output, return content as-is
		return content;
  });

  // Don't process folders with static assets e.g. images
  // eleventyConfig.addPassthroughCopy('favicon.ico');
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
      renderAttrs: (slug) => {
        let attrs = [];
        attrs["data-pagefind-ignore"] = true;
        return attrs;
      }
    }),
    slugify: eleventyConfig.getFilter("slug")
  }).use(mdIterator, 'url_new_win', 'link_open', function (tokens, idx) {
    const [attrName, href] = tokens[idx].attrs.find(attr => attr[0] === 'href')
    
    if (href && (!href.startsWith('/') && !href.startsWith('#'))) {
      tokens[idx].attrPush([ 'target', '_blank' ])
      tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ])
    }
  }).use(markdownItAttrs);
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig.addFilter("markdown", (content) => {
    return markdownLibrary.render(content);
  });

  eleventyConfig.addFilter("markdown", (content, ril = false) => {
    return ril ? markdownLibrary.renderInline(content) : markdownLibrary.render(content);
  });

  eleventyConfig.addPairedShortcode("Markdown", (content, ril = false) => {
    return ril ? markdownLibrary.renderInline(content) : markdownLibrary.render(content);
  });

  eleventyConfig.addWatchTarget('./src/_sass/');
  eleventyConfig.addPassthroughCopy('pages/static/');

  // Build PageFind search index
  eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
    if (results.length) { 
      execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' });
    }
  });
};

export const config = {
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
    includes: '../src/_includes',
    layouts: '../src/_includes/layouts',
    data: '../src/_data',
    output: '_site',
  },
};