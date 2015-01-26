var highlighter = new (require('highlights'))()
var marked = require("marked")
var _ = require("lodash")

highlighter.loadGrammarsSync() // pre-load the grammars.

module.exports = function(html, options, callback) {

  if (!callback) {
    callback = options
    options = {}
  }

  options = _.clone(options)

  var markedOptions = {}

  if (options.highlightSyntax) {
    markedOptions.highlight = function (code, lang, callback) {
      var scopeName = scopeNameFromLang(lang)
      var result = highlighter.highlightSync({fileContents: code, scopeName: scopeName})
      return callback(null, result)
    }
  }

  return marked(html, markedOptions, callback)
}

// attempt to lookup by the long language name, e.g.,
// Ruby, JavaScript, fallback to assuming that lang
// is the extension of the code snippet.
function scopeNameFromLang(lang) {
  var mappings = {
    sh: 'shell'
  }

  lang = mappings[lang] || lang; // mappings for highlights' benefit.

  var grammar = _.pick(highlighter.registry.grammarsByScopeName, function(val, key) {
    return val.name.toLowerCase() === lang
  })

  if (Object.keys(grammar).length) return Object.keys(grammar)[0]
  else return 'source.' + lang
}
