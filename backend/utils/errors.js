const errorHandling = (err, _, res, next) => {
    console.error(err)
    res.status(400).send(err.message)
    next(err)
}

module.exports = errorHandling