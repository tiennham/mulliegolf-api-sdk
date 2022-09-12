# MullieGolf API SDK

Javascript SDK for MullieGolf API, it is used for Web App, React Native or NodeJS app.

## Installation

### Configure authentication

Create a deploy token with both permission: `read_package_registry` and `write_package_registry`

NOTEs: replace 25645251 with your `PROJECT_ID`

```bash
npm config set @goldfishcode:registry https://gitlab.com/api/v4/projects/27580138/packages/npm/

npm config set -- '//gitlab.com/api/v4/projects/27580138/packages/npm/:_authToken' "P4sioAskRjD3BYnJSRnB"

```

You can also create a `.npmrc` file and put these lines (Recommended):

```text
@goldfishcode:registry=https://gitlab.com/api/v4/projects/27580138/packages/npm/
//gitlab.com/api/v4/projects/27580138/packages/npm/:\_authToken=P4sioAskRjD3BYnJSRnB
```

### Publish a package

- Ensure authentication is configured (using `.npmrc` or npm config command)
- Update version in `package.json`
- Package is release and publish automatically by CI/CD but you can also publish from local using `npm publish` command.

```bash
npm publish
```

### Install a package

- Ensure authentication is configured (using `.npmrc` or npm config command)

```bash
npm i @goldfishcode/mulliegolf-api-sdk
```

## Usage

### Session Storage

An implementation of `SessionStorage` interface to store session data.

```javascript
class SessionStorage {
  // store key/value pair
  public async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  // get value of
  public async get(key: string): Promise<string> {
    const value = localStorage.getItem(key);
    return value || '';
  }

  // delete key
  public async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
```

### Configuration

```javascript
import { Api, createApiClient, SocketIO } from '@goldfishcode/mulliegolf-api-sdk';

const sessionStorage = new SessionStorage();
const config = {
  baseUrl: 'https://mulliegolf-api.dev2.goldfishcode.com/v1',
  authSessionKey: 'AUTH_SESSION_KEY',
  session: sessionStorage,
  socketUrl: 'https://mulliegolf-ws.dev2.goldfishcode.com',
};

const client = createApiClient(config);
const api = new Api(client);
```

### APIs

```javascript
// Login
const username = 'your username';
const password = 'your password';
const token = await api.auth.login(username, password);

// Refresh Token, this API should be called when App is resume
if (api.auth.getAuthToken()) {
  await api.auth.refreshToken();
}

// User Profile
const user = await api.user.me();

// Register user
const registerParams = {
  email: 'test@test.com',
  password1: '123456@aA',
  password2: '123456@aA',
  first_name: 'Test',
  last_name: 'User',
};
const user = await api.auth.register(registerParams);
```

### Socket

```javascript
// Initiate Web Socket connection
const socket = SocketIO.instance();
const token = client.getAuthToken();
if (token) {
  socket.connect(config.socketUrl, token.access_token);
}
// Listen event
socket.on('join', (data) => console.log(data));

// Emit event
socket.emit('eventName', 'Payload');

// User status (Online/Offline, Last active time)
socket.addUserStateListener(userId, (state) => console.log('User State: ', state));

// To listen Socket Event of Chat module, we can simply using built-in listener like this:
const listener = api.Chat.SocketListener.instance();
listener.onMessage((msg) => console.log('New message: ', msg));
listener.onChannelCreated((channel) => console.log(channel));

// Typing message in a chat channel, this should be added when user open a chat channel
const onTyping = (data) => console.log(data);
socket.subscribe(channelId).onTyping(onTyping);
// When user close a channel, should call this method to unsubscribe channel
socket.unsubscribe(channelId);
```

## Development

```bash
npm install
npm run build
```

## Testing

```bash
npm run test
```
