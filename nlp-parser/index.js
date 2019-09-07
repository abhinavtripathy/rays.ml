const nlp = require('compromise')

let doc = nlp('a bottle of beer on the wall.')
doc.nouns(0).toPlural()

console.log(doc.out('text'))
