const MTProto = require('./node_modules/@mtproto/core');

async function main() {
    const apiId = 27265516;
    const apiHash = 'bf9691fa3d1c090840ec9f67fdb3c5df';
    
    const phone = '+79856486173';
    const code = 'vvsCGjdAf_Q';

  const mtproto = new MTProto({
    api_id: apiId,
    api_hash: apiHash,
    storageOptions: {
        path: './node_modules/@mtproto/core/session.json' },
  });

  const { authKey, serverSalt } = await mtproto.call('auth.sendCode', {
    phone_number: phone,
    settings: {
      _: 'codeSettings',
    },
  });

  const { user } = await mtproto.call('auth.signIn', {
    phone_code: code,
    phone_number: phone,
    phone_code_hash: serverSalt,
  });

  const chatId = -1983420577;

  const updatesHandler = (update) => {
    if (update._ === 'updateNewMessage' && update.message.peer._ === 'peerChat' && update.message.peer.chat_id === chatId) {
      const messageText = update.message.message;
      console.log('Работает')
      console.log(`Received new message: ${messageText}`);
      // Здесь можно выполнить нужные действия с сообщением
    }
  };

  await mtproto.updates.on('updates', updatesHandler);
}

main();
