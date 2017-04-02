const WebSocket = require('ws');
const socketUtils = require('./socketUtils');
const Vector = require('./vector');
const handleVector = require('./handleVector');
const data = require('./data');

const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({ port: 5999 });


data.init(data.connectSerialPort(data.serialPortName()));

wss.on('connection', (socket) => {
    _setupEventHandlers(socket);

    _socketData(socket, {
        velocity : new Vector(1,1),
        acceleration : new Vector(0,0),
        position: new Vector(200,200)
    });

    socketUtils.add(socket);
    console.log("connection");
});

/**
 *
 * @param socket
 * @private
 */
const _setupEventHandlers = (socket) => {
    socket.on("message", (message) => handleMessage(JSON.parse(message), socket));
    socket.on('close', () => socketUtils.remove(socket, socketUtils.clients()));
    socket.on('error', (error) => socketUtils.remove(socket, socketUtils.clients()));
};

/**
 *
 * @param socket
 * @param data
 * @private
 */
const _socketData = (socket, data) => socket.vectorData = data;


/**
 *
 * @param data
 * @param socket
 */
const handleMessage = (data, socket) => {
    switch (data.name) {
        case "keycodes": _onKeyCode(socket, data.data);
            break;
    }
};

/**
 *
 * @param socket
 * @param codes
 * @private
 */
const _onKeyCode = (socket, codes) => _socketData(socket, handleVector.adjust(socket.vectorData, codes, data.humidity()));



/**
 *
 * @private
 */
const _update = () => {

    socketUtils.broadcast({name : "update", data : {size : data.size(), humidity: data.humidity()}});
    setTimeout(() => _update(), 15);
};

_update();