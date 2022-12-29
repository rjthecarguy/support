const errorHandler = (err, req, res, next) => {
    const stausCode = res.stausCode ? res.stausCode : 500
    res.status(stausCode)

    res.json({
        message: err.message
    })

    
}

module.exports ={errorHandler}