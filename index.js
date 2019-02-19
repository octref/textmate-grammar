var fs = require('fs')
var vsctm = require('vscode-textmate')
var grammarPaths = {
  'source.test': './grammar.json'
}

var registry = new vsctm.Registry({
  loadGrammar: function(scopeName) {
    var path = grammarPaths[scopeName]
    if (path) {
      return new Promise((c, e) => {
        fs.readFile(path, (error, content) => {
          if (error) {
            e(error)
          } else {
            var rawGrammar = vsctm.parseRawGrammar(content.toString(), path)
            c(rawGrammar)
          }
        })
      })
    }
    return null
  }
})

registry.loadGrammar('source.test').then(grammar => {
	// at this point `grammar` is available...
	var lineTokens = grammar.tokenizeLine('</div>');
	for (var i = 0; i < lineTokens.tokens.length; i++) {
		var token = lineTokens.tokens[i];
		console.log('Token from ' + token.startIndex + ' to ' + token.endIndex + ' with scopes ' + token.scopes);
	}
});