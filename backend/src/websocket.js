const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs)
        });
    })
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(con => {
        return calculateDistance(coordinates, con.coordinates) < 10
            && con.techs.some(item => techs.includes(item));
    });
}

exports.sendMessage = (to, message, data) => {
    to.forEach(con => {
        io.to(con.id).emit(message, data);
    });
}