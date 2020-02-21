module.exports = (err,req,res,next)=>{
    console.log(`
        ERROR HAPPENED - LOG FROM ERROR HANDLER
        =======================================
        ${err}
    `);
    
    let status = err.status || 500
    let message = err.message || 'INTERNAL SERVER ERROR'


    switch (err.name) {
        case 'ValidationError':
            let errMsg = []
            for( key in err.errors )
                errMsg.push(err.errors[key].message)
            message = errMsg
            break;
    
        case 'MongoError':
            if(err.code = 11000)
                message = `${Object.keys(err.keyPattern)} is already used`
            break

        default:
            break;
    }

    res.status(status).json({
        errName : err.name,
        status, message
    })
}