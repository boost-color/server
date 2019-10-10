const axios = require('axios')
const Boost = require('../models/boostcolor')
const { Storage } = require('@google-cloud/storage')
const azure = 'https://japaneast.api.cognitive.microsoft.com/vision/v2.1/analyze?visualFeatures=Categories,Description,Color&details=&language=en'
const azure_key = process.env.AZURE_TOKEN

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

        axios({
            method: 'post',
            url: azure,
            headers: {
                "Ocp-Apim-Subscription-Key": azure_key
            },
            data: {
                "url": photo
            }
        })
            .then(({ data }) => {
                let tags = []
                let caption = data.description.captions[0].text
                data.description.tags.forEach(tag => {
                    tags.push(tag)
                })
                
                return Boost.create({
                    caption,
                    tags: tags.slice(0, 5),
                    userId: req.decode.id,
                    photo
                })
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