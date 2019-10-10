const mongoose = require('mongoose')
const MongoUrl = process.env.MONGO_CONNECT

mongoose.connect(MongoUrl, { useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Mongoose Connect Successfuly`)
    })
    .catch(err => {
        console.log(err)
        console.log(`Mongoose Connect Fail`)
    })

module.exports = mongoose