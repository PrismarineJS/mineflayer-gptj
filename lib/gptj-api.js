const fetch = require('node-fetch')
const fs = require('fs')

function getStartContext (path) {
  const ctx = fs.readFileSync(path, { encoding: 'utf-8' })
  return ctx.substring(ctx.indexOf('\n') + 1)
}

async function callGPTJ (input, context) {
  const request = {
    context: `${context}\n// ${input}\n`,
    top_p: 0.9,
    temp: 0.8,
    response_length: 128,
    remove_input: true
  }

  const response = await fetch('https://api.eleuther.ai/completion', {
    method: 'post',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()
  return data[0].generated_text
}

module.exports = { callGPTJ, getStartContext }
