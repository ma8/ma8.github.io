
const htmlmin = require("html-minifier");
const { DateTime } = require("luxon");
const slugify = require("slugify");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const translations = require("./src/_data/i18n");
const serveis = require("./src/_data/serveis");


module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public/": "." });
  eleventyConfig.addPassthroughCopy("dist");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/font");

  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath && outputPath.endsWith("._site")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,  
        useShortDoctype: true,
      });
    }

    return content;
  });

  eleventyConfig.addFilter("capitalize", function (str) {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  
  eleventyConfig.addFilter("slug", function (input) {
    return slugify(input, {
      lower: true,
      replacement: "-",
      remove: /[*+~.()'"!:@¿?,]/g
    });
  });

  eleventyConfig.addFilter("date", (value, format = "dd/MM/yyyy") => {
    return DateTime.fromJSDate(value, { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("serveiLabel", function (key, lang) {
    if (serveis[key] && serveis[key][lang]) {
      return serveis[key][lang].title;

    }
  });

  eleventyConfig.addFilter("getTranslatedUrl", function (translations, key, lang) {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang].url;
    }
    return "#";
  });

  eleventyConfig.addFilter("i18n", function (key, lang) {
    const keys = key.split(".");
    let result = translations[lang];

    for (const k of keys) {
      if (!result || !result[k]) return key; // fallback
      result = result[k];
    }

    return result;
  });
  eleventyConfig.addCollection("faqs", function(collectionApi) {
    return collectionApi.getFilteredByTag("faq");
  });


  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByTag("blog").sort((a, b) => b.date - a.date);
    //return collectionApi.getFilteredByGlob("src/blog/*.html").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        // Filtra la paraula "blog", només volem etiquetes de contingut
        tags = tags.filter(tag => tag !== "blog" &  tag !== "faq");
        tags.forEach(tag => tagSet.add(tag));
      }
    });

    return [...tagSet].sort();
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addCollection("translatedPages", function (collectionApi) {
    const pages = collectionApi.getAll();
    const translations = {};

    pages.forEach(page => {
      const key = page.data.translation_key;
      const lang = page.data.lang;
      if (key) {
        translations[key] = translations[key] || {};
        translations[key][lang] = page;
      }
    });

    return translations;
  });


  eleventyConfig.addPlugin(sitemap, {
    lastModifiedProperty: "modified",
    sitemap: {
      hostname: "https://www.appmot.cat",
    },
  });

  eleventyConfig.addCollection("sitemapGroups", function(collectionApi) {
    const allPages = collectionApi.getAll();

    // Objecte on la clau és translation_key i el valor és l'array de pàgines
    const groups = {};

    allPages.forEach(page => {
      const key = page.data.translation_key;
      if (!key) return;  // Ignorar si no té translation_key

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(page);
    });

    // Tornem array amb objectes per facilitar iteració a Nunjucks
    return Object.entries(groups).map(([key, pages]) => {
      return { key, pages };
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    // Configura el port aquí
    passthroughFileCopy: true,
    liveReload: true,
    watchThrottleWait: 1000,
    // Configura el port del servidor
    server: {
      port: 8081 
    }
  };
};