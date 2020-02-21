const dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

module.exports = ()=>{
    let password = ''    
    const randPassLength =  Math.max( Math.round(Math.random()*12) , 6 )
    for(let x = 0; x < randPassLength; x++)
    {
        password += dict[ Math.floor( Math.random() * dict.length ) ]
    }    
    return password
}
    