const { goals } = require('mineflayer-pathfinder')

module.exports = (bot, mcData) => {
  return {
    watch: async (entity) => {
      await bot.lookAt(entity.position.offset(0, entity.height, 0))
    },
    follow: async (entity) => {
      bot.pathfinder.setGoal(new goals.GoalFollow(entity, 2), true)
    },
    come: async (entity) => {
      const p = entity.position
      await bot.pathfinder.goto(new goals.GoalNear(p.x, p.y, p.z, 1))
    },
    stop: async () => {
      bot.pathfinder.stop()
      bot.clearControlStates()
    },
    give: async (name, target, amount = 1) => {
      const p = target.position
      await bot.pathfinder.goto(new goals.GoalNear(p.x, p.y, p.z, 1))
      const item = bot.inventory.items().filter(x => x.name === name)[0]
      if (!item) {
        bot.chat(`I have no ${name}`)
      } else if (amount) {
        bot.toss(item.type, null, amount)
        bot.chat('Here you go!')
      }
    },
    mine: async (name, amount = 1) => {
      const type = mcData.blocksByName[name]
      if (!type) {
        bot.chat(`I don't know about the block: ${name}`)
        return
      }
      const block = bot.findBlock({ matching: type.id })
      if (!block) {
        bot.chat(`I don't see ${name} nearby`)
        return
      }
      await bot.pathfinder.goto(new goals.GoalGetToBlock(block.position.x, block.position.y, block.position.z, bot))
      await bot.dig(block, 'raycast')
    }
  }
}
