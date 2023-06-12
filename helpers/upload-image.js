const fs = require('fs');
const path = require('path');

async function uploadSignature(image, srlNo, addition) {
    return new Promise((resolve, reject) => {

        // Define the folder where you want to save the images
        const uploadFolder = path.join(__dirname, '../assets/images/signature');

        // Create the uploads folder if it doesn't exist
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder);
        }

        const imageData = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(imageData, 'base64');

        const fileName = `${srlNo + addition}.png`;
        const filePath = path.join(uploadFolder, fileName);

        fs.writeFile(filePath, imageBuffer, (error) => {
            if (error) {
                console.error('Error saving image:', error);
                reject(error);
            } else {
                resolve(fileName);
            }
        });
    })
}

module.exports = { uploadSignature }