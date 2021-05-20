const crypto =require('crypto')

function generateUniquePassword(){
    return crypto.randomBytes(4).toString('HEX')
}

module.exports = generateUniquePassword