const mineflayer = require('mineflayer')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { getStartContext, callGPTJ } = require('./lib/gptj-api')

if (process.argv.length > 6) {
  console.log('Usage : node bot.js [<host>] [<port>] [<name>] [<password>]')
  process.exit(1)
}

const bot = mineflayer.createBot({
  host: process.argv[2] || 'localhost',
  port: parseInt(process.argv[3]) || 25565,
  username: process.argv[4] || 'GPTJ',
  password: process.argv[5]
})

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)
  bot.pathfinder.setMovements(defaultMove)

  // eslint-disable-next-line no-unused-vars
  const skills = require('./lib/skills.js')(bot, mcData)
  let context = getStartContext('./prompts/simple.js')

  bot.on('chat', async (username, message) => {
    if (username === bot.username) return

    if (message.startsWith('clear context')) {
      context = getStartContext('./prompts/simple.js')
      bot.chat('Context cleared')
      return
    }

    if (!bot.players[username]) {
      bot.chat('Where are you?')
      return
    }

    // eslint-disable-next-line no-unused-vars
    const player = bot.players[username].entity

    const response = await callGPTJ(message, context)
    console.log(response)

    const code = response.split('//')[0]
    if (code === '') {
      bot.chat("I'm sorry I don't understand.")
      return
    }
    console.log(`code: ${code}`)

    try {
      // eslint-disable-next-line no-eval
      await eval(`(async function inject() { 
            try {
              ${code}
            } 
            catch(err){
              bot.chat(\`error: \${err.message}\`);
            } 
          })()`)
      context += '\n// ' + message + '\n' + code
    } catch (err) {
      bot.chat(`error: ${err}`)
    }
  })
})
