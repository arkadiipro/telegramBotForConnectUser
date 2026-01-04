//базовие настройки
const { Telegraf } = require('telegraf');
const express = require("express");
const session = require("express-session");
const app = express();
const fs = require("fs")
const githubSulka = "https://github.com/arkadiipro/telegramBotForConnectUser";
//создаем массив с чатом
let chat = [];
//
let chatIsOpen = false; 
//запуск программи и доставание панели index.html
app.use(express.json());
app.use(express.static("publiic"));
app.use(session({
    chatIsOpen:false
}))
// Вставь сюда свой токен от BotFather
const bot = new Telegraf('7708388670:AAGgPNgNcVDGZotzgyX8hw18D_cN3ylBRTY');
let startPanel = {
    reply_markup: {
        keyboard: [
            [{ text: 'Написать админу' },]
        ],
        resize_keyboard: true
    }
}
let closePanel = {
    reply_markup: {
        keyboard: [
            [{ text: 'Закрить чат' },]
        ],
        resize_keyboard: true
    }
}
function startBot (ctx) {
    ctx.reply("Привет, бот создан <a href='t.me/@arkadii_shevch'>SofterX</a>",{parse_mode:"HTML"})
    ctx.reply(`Для того чтоб создать такого же бота ознакомтесь с исходним кодом на <a href="${githubSulka}">GitHub</a>`,{parse_mode:"HTML"})
    ctx.reply('Вибирите "написать админу" чтоб написать админу',startPanel)
    console.log(ctx)
}
//дальше чисто бот-------------------------------------------------------
// Команда /start
bot.start(startBot);

bot.command('menu', (ctx) => {
    ctx.reply('Выберите действие:',startPanel );
});
// функци открития чата
bot.hears('Написать админу', (ctx) => {
    if (chatIsOpen === false) {
        ctx.reply('Чат открит.Чтоб его закрить нажмите "Закрить чат"', closePanel )
        chatIsOpen = true;
    } else {
        ctx.reply('Чат уже открит.Чтоб его закрить нажмите "Закрить чат"', closePanel )
    }
    

});
//функция закрития чата
bot.hears('Закрить чат', (ctx) => {
    if (chatIsOpen === true) {
        ctx.reply('Чат закрит.Чтоб открить чат нажмите "Открить чат"',startPanel)
        chatIsOpen = false
    } else {
        ctx.reply('Чат уже закрит.Чтоб его открить нажмите "Открить чат"', closePanel)
    }
})
//обработчик сообщений как левих так и из чата
bot.on("text",(ctx) => {
    if (chatIsOpen) {
        let messege =  `(${ctx.from.id})User:${ctx.message.text}`;
        chat.push(messege)
    } else {
        startBot(ctx)
    }
})
//логика бота все,теперь сервер------------------------------
app.post("/getchat", (req,res) => {
    res.json(chat);
})
app.post("/getmessege" ,(req,res) => {

})


// Запуск бота
bot.launch();
console.log("бот запущен")

//запуск панели
let PORT = process.env.PORT || 3000
app.listen(PORT,() => console.log("панель на http://localhost:"+ PORT))

// Остановка для корректного завершения процесса
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
