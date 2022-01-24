'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const telegram = require('node-telegram-bot-api') //package for integration telegram and nodejs
const token = process.env.TELEGRAM_TOKEN //token telegram
const bot = new telegram(token, { polling: true }) // init and config
const emoji = '\u{00002714}' // emoji telegram

bot.onText(/\/presence/, async (msg, match) => { // get command message for telegram example /checkin
    const presence = match.input.split('|')[2]
    const addInfo = match.input.split('|')[3]
    const presenceTime = match.input.split('|')[4]
    const chatId = msg.chat.id // chat id user telegram
    if (presence === undefined) { // handle if message empty
        // send message if empty
        bot.sendMessage(chatId, 'Wrong format. Example : /presence | Name | Present | At home | 12:00')
        return
    }
    // send message if success
    bot.sendMessage(
        chatId,
        `<b>${msg.chat.first_name}</b> : <b>${presence}</b> - <b>${addInfo}</b> - <b>${presenceTime}</b> ${emoji}`,
        { parse_mode: 'HTML' }
    )
})
bot.onText(/\/absence/, async (msg, match) => {
    const absence = match.input.split('|')[2]
    const addInfo = match.input.split('|')[3]
    const absenceTime = match.input.split('|')[4]
    const chatId = msg.chat.id
    if (absence === undefined) {
        bot.sendMessage(chatId, 'Wrong format. Example : /absence | Name | Absent | Sick | 12:00')
        return
    }
    bot.sendMessage(
        chatId,
        `<b>${msg.chat.first_name}</b> : <b>${absence}</b> - <b>${addInfo}</b> - <b>${absenceTime}</b> ${emoji}`,
        { parse_mode: 'HTML' }
    )
})
app.listen(process.env.APP_PORT, () => {
    console.log(`presences_bot is listening in port ${process.env.APP_PORT}`)
})