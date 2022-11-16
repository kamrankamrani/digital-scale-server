import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { BroadCast } from "./Modules/BroadCast";
import {
  clientOnClose,
  clientOnConnet,
  clientOnError,
  clientOnMessage,
} from "./Modules/Client";

const serverPort = 4000;
const server = http.createServer(express);
const wss = new WebSocketServer({ server });

wss.on("connection", (websocket, req) => {
  clientOnConnet(req);

  websocket.on("message", (data: WebSocket.RawData) => {
    const clientData: string | boolean = clientOnMessage(data);
    if (clientData) {
      BroadCast(wss, clientData);
    }
  });

  websocket.onerror = (err: WebSocket.ErrorEvent) => {
    clientOnError(err);
  };

  websocket.on("close", function () {
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
