var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var amqp = require('amqplib/callback_api');

let connectionTries = 0;
let rabbitURL = "amqp://root:root@rabbit";

let onRabbitConnection = function (error, connection) {
    if (error) {
        console.log(error);
        console.log("No rabbitMQ connection, try connect again");
        if (connectionTries > 9) {
            throw new Error('No connection with rabbitMQ. 10 tries failed');
        }
        startApp();
        return;
    }

    let connectionMap = {};

    connection.createChannel(function (error, channel) {
        channel.consume("image-ready-socket", function (msg) {
            console.log("Message income: \n" + msg.content.toString());
            let data = {};
            try {
                data = JSON.parse(msg.content.toString());
            } catch (error) {
                console.log("Cannot parse json. Ignore.");
                return;
            }

            let downloadToken = data['token'];

            if (connectionMap.hasOwnProperty(downloadToken)
                && connectionMap[downloadToken].hasOwnProperty('socket')) {
                let socket = connectionMap[downloadToken]['socket'];
                socket.emit('download_link', data['link']);
                socket.disconnect(0);
                console.log("File id sent to client. closing connection for token: " + downloadToken);
                delete connectionMap[downloadToken];
            } else {
                console.log("Token received but no socket connected. Waiting for: " + downloadToken);

                connectionMap[downloadToken] = {
                    link: data['link'],
                    socket: null,
                };
            }
        }, {
            noAck: true
        });
    });

    io.on('connection', function (socket) {
        console.log('connection...');
        socket.on('wait_for_download', function (downloadToken) {
            if (!downloadToken) {
                socket.disconnect(0);
            }
            downloadToken = downloadToken.data.token;
            if (
                connectionMap.hasOwnProperty(downloadToken)
                && connectionMap[downloadToken].hasOwnProperty('link')
            ) {
                socket.emit('download_link', connectionMap[downloadToken]['link']);
                socket.disconnect(0);
            } else {
                connectionMap[downloadToken] = {socket: socket};
                console.log("Socket connected and waiting with token: " + downloadToken);
            }
        });

        socket.on('disconnect', function () {
            console.log('disconnection...');
        });
    });


    http.listen(3000, function () {
        console.log('listening on *:3000');
    });
};

let startApp = function () {
    setTimeout(function () {
        try {
            amqp.connect(rabbitURL, onRabbitConnection);
        } catch (e) {
            console.log("Error occured, restarting app. " + e);
            startApp();
        }
    }, 3000);
};

startApp();
