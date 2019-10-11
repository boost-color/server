const axios = require('axios')
const Boost = require('../models/boostcolor')
const { Storage } = require('@google-cloud/storage')
const deepai = require('deepai')
const azure = process.env.AZURE_URL
const azure_key = process.env.AZURE_TOKEN
const deepai_key = process.env.COLORIZE_TOKEN

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
        let colorize = null
        let photo = null
        if (req.file) {
            console.log(`masuuuukkkkkkkkkk`)
            photo = req.file.cloudStoragePublicUrl
        }
        deepai.setApiKey(deepai_key);
        deepai.callStandardApi("colorizer", {
            image: photo
        })
            .then(response => {
                colorize = response.output_url
                return axios({
                    method: 'post',
                    url: azure,
                    headers: {
                        "Ocp-Apim-Subscription-Key": azure_key
                    },
                    data: {
                        "url": response.output_url
                    }
                })
            }).then(({ data }) => {
                let tags = []
                let caption = data.description.captions[0].text
                data.description.tags.forEach(tag => {
                    tags.push(tag)
                })
                return Boost.create({
                    caption,
                    tags: tags.slice(0, 5),
                    userId: req.decode.id,
                    photo: colorize
                })
            })
            .then(file => {
                // res.status(201).json(file)
                console.log(file)
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