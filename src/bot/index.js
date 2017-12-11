const TelegramBot = require('node-telegram-bot-api');

module.exports = TelegramBot;
module.exports.instance = (function() {

  let instance = new TelegramBot(process.env.TOKEN, {polling: true});
  return {
    get get() {
      if(instance instanceof TelegramBot) {
        return instance;
      } else {
        instance = new TelegramBot(process.env.TOKEN, {polling: true})
      }
    },
    invokeEvent(eventName, fn) {
      this.get.on(eventName, (msg) => {fn(msg)});
    }
  }
})();
