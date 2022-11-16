import WebSocket from "ws";

export function BroadCast(
  webServer: WebSocket.Server<WebSocket.WebSocket>,
  data: string,
  isBinary = false
) {
  webServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data, { binary: isBinary });
    }
  });
}
