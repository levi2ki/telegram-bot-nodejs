const file = require('../../services/files/index');

const onPhoto = (msg) => {
  const props = {
    chatId: msg.chat.id,
    fileId: msg.photo[2].file_id,
    fileSize: msg.photo[2].file_size,
    userId: msg.from.id,
  };
  file.storeFile(props)

};

const onDocument = (msg) => {
  // DEBUG:
  console.log(msg);
  const props = {
    chatId: msg.chat.id,
    fileId: msg.document.file_id,
    fileSize: msg.document.file_size,
    userId: msg.from.id,
  };
  file.storeFile(props)

};


module.exports.onPhoto = onPhoto;
module.exports.onDocument = onDocument;
