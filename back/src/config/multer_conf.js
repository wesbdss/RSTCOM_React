const multer = require('multer')
const path = require('path')

const destination = path.resolve(__dirname, '..', '..', 'uploads')


module.exports = {
    storage: multer.diskStorage({
        destination,
        filename: (req, file, callback) => {
            const extension = path.extname(file.originalname)
            const name = path.basename(file.originalname, extension)
            callback(null, `${name}-${Date.now()}${extension}`)
        },
    }),
}

