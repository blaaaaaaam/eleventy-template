const path = require('path')
const prettier = require('prettier')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('CNAME')
  eleventyConfig.setTemplateFormats([
    'md',
    'jpg',
    'png',
    'svg',
    'mp4'
  ])

  eleventyConfig.addTransform('prettier', function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case '.html':
        const parser = extname.replace(/^./, "");
        return prettier.format(content, { parser });
      default:
        return content;
    }
  })

  return {
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    dir: {
      input: 'src',
      includes: '_layouts',
      data: '_data',
      output: 'docs'
    }
  }
}
