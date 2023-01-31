module.exports = {
    test: (req, resp, next) => {
        resp.send(req.poti)
    },
    test2: (req, resp, next) => {
        req.poti = 'mimi'
        next()
    }
};
