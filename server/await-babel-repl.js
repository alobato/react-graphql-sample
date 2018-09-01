// https://gist.github.com/princejwesley/a66d514d86ea174270210561c44b71ba
const repl = require('repl')

function preprocess(input) {
  const awaitMatcher = /^(?:\s*(?:(?:let|var|const)\s)?\s*([^=]+)=\s*|^\s*)(await\s[\s\S]*)/
  const asyncWrapper = (code, binder) => {
    let assign = binder ? `global.${binder} = ` : ''
    return `(function(){ async function _wrap() { return ${assign}${code} } return _wrap()})()`
  }

  const match = input.match(awaitMatcher)
  if (match) input = `${asyncWrapper(match[2], match[1])}`
  return input
}

function myEval(cmd, context, filename, callback) {
  const code = preprocess(cmd)
  _eval(code, context, filename, callback)
}

const replInstance = repl.start({ prompt: '> ' })
const _eval = replInstance.eval
replInstance.eval = myEval
