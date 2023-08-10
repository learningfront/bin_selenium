// получить все чаты пользователя
// найти в нём канал Тест
// вытащить канал ID
const api = require('/src/api.js');
const auth = require('./src/auth.js');



( async () => {
  await auth();
  const chats = await api.call('messages.getAllChats', {
    except_ids: 10
  })

  console.log(chats);
})()