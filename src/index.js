require('../prefs').init();
const bot = require('./bot').instance;

const file = require('./handlers/files');

// Matches "/echo [whatever]"
bot.get.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.get.sendMessage(chatId, resp);
});
bot.get.onText(/\/start$/, msg => {
  const chatId = msg.chat.id;

  bot.get.sendMessage(chatId, 'register success');
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.get.on('text', (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.get.sendMessage(chatId, 'Received your message');
});




bot.invokeEvent('photo', require('./handlers/files').onPhoto);
bot.invokeEvent('document', require('./handlers/files').onDocument);
