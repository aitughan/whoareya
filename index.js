const TelegramApi= require('node-telegram-bot-api')

const token = "5545828361:AAFr4JxKlUcsObTCe8XAgA9RlmQ9_6EV7EM"

const bot = new TelegramApi(token, {polling:true})

bot.on('message', async msg=>{
    const text = msg.text
    const chatId =msg.chat.id
    const chatUsername =msg.chat.username
    if(text==='/start'){
        await bot.sendSticker(chatId , 'https://chpic.su/_data/stickers/g/Goal24Live/Goal24Live_001.webp')
        await bot.sendMessage(chatId, `Добро пожаловать в игру "WhoAreYa?"`)
    }
    console.log(msg)
})