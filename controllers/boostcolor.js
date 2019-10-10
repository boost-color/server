const Boost = require('../models/boostcolor')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
})

class BoostController {
    static find(req, res, next) {
        Boost.find()
            .then(results => {
                res.status(200).json(results)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Boost.findById(req.params.id)
            .then(result => {
                res.status(200).json(result)
            })
    }

    static create(req, res, next) {
        const { caption, tags } = req.body
        let photo = null
        if (req.file) {
            photo = req.file.cloudStoragePublicUrl
        }

        Boost.create({
            caption,
            tags,
            userId: req.decode.id,
            photo
        })
            .then(file => {
                res.status(201).json(file)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Boost.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({
                    message: `Delete Success`
                })
            })
            .catch(next)
    }

}

module.exports = BoostController