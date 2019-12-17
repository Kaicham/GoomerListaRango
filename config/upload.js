const multer = require('multer');
const path = require('path');

module.exports = {
    //Configuração do multer para storage e nome de arquivo
    storage: multer.diskStorage({
        destination:path.resolve(__dirname, '..', 'uploads'),
        filename: (req, file, cb) => {
            const extensao = path.extname(file.originalname)
            const nome = path.basename(file.originalname, extensao)

            cb(null, `${nome}-${Date.now()}${extensao}`);
        },
    }),
};