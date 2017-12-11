const path = require('path');
const fs = require('fs');
const request = require('request');
const uuid = require('uuid').v4;

const bot = require('../../bot/index').instance.get;

function isInvalidSize(fileSize) {
  if (+fileSize >= global.prefs.MAX_SIZE) {
    bot.sendMessage(chatId, `File is too big. Able handle 20mb files only`);
    return true;
  }
  return false;
}

function getFileInstance(link, userId) {
  const absPath = `${global.prefs.data}/${userId}`;
  if(!fs.existsSync(absPath)) {
    fs.mkdirSync(absPath);
  }
  return fs.createWriteStream(`${absPath}/${uuid()}${path.extname(link)}`);
}

const storeFile = (props) => {
  const {chatId, fileId, fileSize, userId} = props;
  if(isInvalidSize(fileSize)) {
    return;
  }

  bot.getFileLink(fileId)
    .then((link) => {
    let file = getFileInstance(link, userId).on('end', ()=> {
      // DEBUG:
      console.log('completed')
    });

      const req = request.get(link).on('response', (res) => {
        const total = res.headers['content-length'];
        const timer = setInterval(() => {
          // DEBUG:
          console.log(`${file.bytesWritten}/${+total}`);

          if (file.bytesWritten === +total) {
            // DEBUG:
            console.log('completed');
            clearInterval(timer);
            req.end()
          }
        }, 200)
      });

      req.pipe(file).on('close', () => {bot.sendMessage(chatId, 'Received your file')})
    })
    .catch(err => {
      bot.sendMessage(chatId, 'Error receiving file');
      throw new Error(err);
    })
};

module.exports.storeFile = storeFile;
