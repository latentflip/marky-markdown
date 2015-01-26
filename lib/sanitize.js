var sanitizeHtml = require("sanitize-html")
var url = require("url")

var sanitizer = module.exports = function(html) {
  return sanitizeHtml(html, sanitizer.config)
}

sanitizer.config = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "h1","h2","img","meta","span","iframe","div", "pre"
    ]),
    allowedClasses: {
      div: [
        "line"
      ],
      span: [
        "source",
        "js",
        "rb",
        "cpp",
        "null-grammar",
        "c",
        "coffee",
        "css",
        "json",
        "html",
        "storage",
        "modifier",
        "keyword",
        "support",
        "function",
        "shell",
        "builtin",
        "string",
        "quoted",
        "double",
        "punctuation",
        "definition",
        "begin"
      ],
      h1: ['deep-link'],
      h2: ['deep-link'],
      h3: ['deep-link'],
      h4: ['deep-link'],
      h5: ['deep-link'],
      h6: ['deep-link'],
    },
    allowedAttributes: {
      h1: ["id"],
      h2: ["id"],
      h3: ["id"],
      h4: ["id"],
      h5: ["id"],
      h6: ["id"],
      a: ["href", "id", "name", "target"],
      img: ["id", "src"],
      meta: ["name", "content"],
      iframe: ["src", "frameborder", "allowfullscreen"],
      span: ["id"],
      div: ["id"]
    },
    exclusiveFilter: function(frame) {
      // Allow YouTube iframes
      if (frame.tag != 'iframe') return false;
      return !String(frame.attribs.src).match(/\/\/(www\.)?youtube\.com/)
    }
  }
