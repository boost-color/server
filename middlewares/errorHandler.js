module.exports = (err, req, res, next) => {
    let status = err.status || 500
    let message = err.message || "internal server error"
    if (err.name === "ValidationError") {
        status = 400
        let errArray = []
        for (let el in err.errors) {
            if (err.errors[el].kind === 'unique') {
                errArray.push(`This ${el} is already exist`)
            } else {
                errArray.push(err.errors[el].message)
            }
        }
        message = errArray.join(', ')
    } else if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
        status = 401
        message = "You need to login first"
    }
    console.log(err)
    res.status(status).json({ message })
}