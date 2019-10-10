const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class userController {
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({ name, email, password })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({ email })
            .then(user => {
                if (user && checkPassword(password, user.password)) {
                    let payload = {
                        id: user._id
                    }

                    let token = generateToken(payload)
                    res.status(200).json({ id: user._id, name: user.name, token })
                } else {
                    next({
                        status: 400,
                        message: `invalid email/password`
                    })
                }
            })
            .catch(next)
    }
}

module.exports = userController