const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const port = process.env.PORT || 3000;

io.on('connect', (socket) => {
    socket.emit('now', {
        message: 'what',
    });
});

nextApp.prepare().then(() => {
    app.get('*', (req, res) => nextHandler(req, res));

    server.listen(port, (err) => {
        if (err) {
            throw err;
        }

        console.log(`ready on ${port}`);
    });
});
