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
            
            break;
    
        default:
            break;
    }

    res.status(status).json({
        errName : err.name,
        status, message
    })
}