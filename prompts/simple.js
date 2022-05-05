/* global bot skills player */
// Go forward
bot.setControlState('forward', true)
// Go back
bot.setControlState('back', true)
// jump
bot.setControlState('jump', true)
// stop
skills.stop()
// Come to me
skills.come(player)
// find me
skills.come(player)
// join me
skills.come(player)
// Follow me
skills.follow(player)
// Keep following me
skills.follow(player)
// Look at me
skills.watch(player)
// keep looking at me
skills.watch(player)
// Hello !
bot.chat('Hello friend!')
// Hi how are you ?
bot.chat("I'm fine, thanks!")
// What's your name ?
bot.chat('My name is ' + bot.username)
// What's your favorite color ?
bot.chat('I like red')
// Mine 10 blocks of dirt
skills.mine('dirt', 10)
// Get 1 block of dirt
skills.mine('dirt', 1)
// Go get me 3 blocks of dirt
skills.mine('dirt', 3)
// Give me 5 dirt
skills.give('dirt', player, 5)
// Give 4 diamond
skills.give('diamond', player, 4)
// Drop 2 dirt
skills.give('dirt', player, 2)
// Drop 1 dirt
skills.give('dirt', player, 1)
// Get 4 oak logs
skills.mine('oak_log', 4)
