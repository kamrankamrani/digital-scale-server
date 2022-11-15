import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import {
  clientOnClose,
  clientOnConnet,
  clientOnError,
  clientOnMessage,
} from "./Modules/Client";

const serverPort = 4000;
const server = http.createServer(express);
const wss = new WebSocketServer({ server });

wss.on("connection", (client, req) => {
  clientOnConnet(req);

  client.on("message", (data: WebSocket.RawData) => {
    clientOnMessage(data);
  });

  client.onerror = (err: WebSocket.ErrorEvent) => {
    clientOnError(err);
  };

  client.on("close", function () {
    clientOnClose();
  });
});

wss.on("error", (err) => {
  console.log("server error is ", err);
});

wss.on("close", () => {
  console.log("server closing connection!");
});

server.listen(serverPort, () => {
  console.log(`listening on ${serverPort}`);
});
