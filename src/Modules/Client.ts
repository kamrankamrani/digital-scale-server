import http from "http";
import WebSocket from "ws";

export function clientOnConnet(req: http.IncomingMessage) {
  console.log("connection is stablished!", req.socket.remoteAddress);
}

export function clientOnMessage(data: WebSocket.RawData) {
  const message = JSON.parse(data.toString());
  console.log("get data is ", message);
}

export function clientOnClose() {
  console.log("closing connection");
}

export function clientOnError(err: WebSocket.ErrorEvent) {
  console.log("client error", err);
}
