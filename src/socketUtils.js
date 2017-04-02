

const _clients = [];

/**
 *
 * @param message
 * @returns {*}
 */
const broadcast = (message) => {
    _clients.forEach((client) => {
        if(client.readyState === 1) {
            message.data.vector = {x: client.vectorData.position.x, y: client.vectorData.position.y};
            send(client, message);
        }
    });
    return message;
};

/**
 *
 * @param socket
 * @param message
 */
const send = (socket, message) => socket.send(JSON.stringify(message));

const add = (socket) => _clients.push(socket);
/**
 *
 * @param element
 * @param array
 */
const remove = (element, array) =>  {
    let index = array.indexOf(element);
    if(index > -1) {
        array.splice(index, 1);
    }

    return array;
};

const clients = () => _clients;

module.exports = {broadcast, send, remove, add, clients};