import http from "http";
import WebSocket from "ws";

export function clientOnConnet(req: http.IncomingMessage) {
  console.log("connection is stablished!", req.socket.remoteAddress);
}

export function clientOnMessage(data: WebSocket.RawData) {
  const msg = data.toString();
  try {
    const parsedMessage = JSON.parse(msg);
    console.log("get data is ", parsedMessage);
    return msg;
  } catch (error) {
    console.log("client on message error", error);
    console.log("client message is", msg);
    return false;
  }
}

export function clientOnClose() {
  console.log("closing connection");
}

export function clientOnError(err: WebSocket.ErrorEvent) {
  console.log("client error", err);
}
