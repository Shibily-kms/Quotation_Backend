const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const bucketName = process.env.S3_BUCKET_NAME

async function uploadSignature(image, srlNo, addition) {
    return new Promise(async (resolve, reject) => {

        // ? Convert Base64 to Image
        const imageData = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(imageData, 'base64');

        // ? Upload to S3 Bucket
        const params = {
            Bucket: bucketName,
            Key: `${srlNo + addition}.png`,
            Body: imageBuffer,
            ContentType: 'image/png'
        };

        s3.upload(params, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve({ key: params.Key, url: data.Location })
            }
        });

    })
}

function deleteSignature(key) {
    return new Promise((resolve, reject) => {
        s3.deleteObject({
            Bucket: bucketName,
            Key: key,
        }, (err, data) => {
            if (err) {
                reject(err)
                console.error(err);
            } else {
                resolve('Signature Deleted')
            }
        });
    })
}

module.exports = { uploadSignature, deleteSignature }