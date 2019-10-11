const { verifyToken } = require('../helpers/jwt')

function Authentication(req, res, next) {
    try {
        let decode = verifyToken(req.headers.token)
        req.decode = decode
        next()
    } catch (err) {
        next(err)
    }
}

function Authorization(req, res, next) {
    let eventId = null
    if (req.query.eventId) {
        eventId = req.query.eventId
    } else {
        eventId = req.body.eventId
    }

    Event.findOne({
        _id: eventId,
        member: req.decode.id
    })
        .then(event => {
            if (event) {
                next()
            } else {
                next({
                    status: 403,
                    message: `you don't have the authority to do this action`
                })
            }
        })
        .catch(next)
}

module.exports = {
    Authentication,
    Authorization
}