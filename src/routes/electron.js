const ipcMain = require('electron').ipcMain;

function init(app) {
    ipcMain.on('server-request', (event, arg) => {
        const req = {
            url: arg.url,
            method: arg.method,
            body: arg.data,
            headers: arg.headers,
            session: {
                loggedIn: true
            }
        };

        const res = {
            statusCode: 200,
            getHeader: () => {},
            setHeader: () => {},
            status: statusCode => {
                res.statusCode = statusCode;
                return res;
            },
            send: obj => {
                event.sender.send('server-response', {
                    requestId: arg.requestId,
                    statusCode: res.statusCode,
                    body: obj
                });
            }
        };

        return app._router.handle(req, res, () => {});
    });
}

module.exports = init;