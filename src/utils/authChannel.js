const appChannel = new BroadcastChannel("app");

const broadcastLogin = () => {
  appChannel.postMessage({
    type: "login",
  });
};

const broadcastLogout = () => {
  appChannel.postMessage({
    type: "logout",
  });
};

const broadcastAction = (type, payload) => {
  appChannel.postMessage({
    type,
    payload,
  });
};

export { appChannel, broadcastLogin, broadcastLogout, broadcastAction };
