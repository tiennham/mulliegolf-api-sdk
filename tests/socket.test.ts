// eslint-disable-next-line @typescript-eslint/no-var-requires
// import { SocketIO } from '../libs';
// import { SocketListener } from '../libs/api/chat/socket';

// const socket = SocketIO.instance();
// const jwt =
//   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkzMDcyMTMzLCJqdGkiOiIwOTk4YTM2NGU2Mzk0NTBiOWI0ZjY1MWYwY2NkNjQ5ZiIsInVzZXJfaWQiOiIwZWIxZjUwYS0wYjljLTRlNDgtOTJiNS1hZmE1ZDhiMGZlYTcifQ.FWte4g9GQRBGRN3nVMuO7ZstHntQJuw-bHlVI5tcnylZ-O5pEstTGbCRfdQB_ZoA1siJWNWg-6SVg7aPVMOpeKOYd-C-TmSSqaJFJVGpYuujAdmk5SMkWP9XssjHawUtXc_gOWiCZRGXW85oP-352UjwflfvtI4soTRNBarbbWQ';
// const url = 'http://template-ws.dev.goldfishcode.com';
// socket.connect(url, jwt);
// socket.addEventListener('join', (evt) => {
//   console.log('joined event: ', evt);
// });
// socket.addEventListener('join', (evt) => {
//   console.log('joined event 2: ', evt);
// });
// socket.addEventListener('error', (evt) => {
//   console.log('error event: ', evt);
// });

// socket.addEventListener('hello', (evt) => {
//   console.log('hello event: ', evt);
// });
// socket.addEventListener('chat:msg', (evt) => {
//   console.log('hello event 2: ', evt);
// });

// socket.addUserStateListener('796d1d29-ec79-4d92-a28e-f3e198adbf4a', (data) => {
//   console.log('DATA status: ', data);
// });

// SocketListener.instance()
//   .onMessage((msg) => {
//     console.log('onMessage: ', msg);
//   })
//   .onChannelCreated(console.log);

// const listener = SocketListener.instance();
// listener.onMessage((msg) => console.log('onMessage 2: ', msg));
