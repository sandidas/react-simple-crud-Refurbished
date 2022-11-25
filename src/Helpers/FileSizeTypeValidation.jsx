export const extensionAndSizeValidations_old = (imagesType, imagesSize) => {
    // images size received from
    const filesize = parseInt(((imagesSize) / 1024).toFixed(4)); // kb convet2base64
    // image extension received from
    let extension = imagesType.split('/').pop();
    // allowedExtensions and sizes
    let allowedExtensions = ['jpg', 'JPG', 'JPEG', 'jpeg', 'png', 'PNG'];
    let maxAllowedSize = 5000000; // 500 kb
    // conditions
    if (allowedExtensions.some(ext => ext === extension && imagesSize <= maxAllowedSize)) {
        return true;
    } return false;
}



export const extensionAndSizeValidations = (imagesType, imagesSize) => {
    // allowedExtensions and sizes
    let allowedExtensions = ['jpg', 'JPG', 'JPEG', 'jpeg', 'png', 'PNG'];
    let maxAllowedSize = 500; // 500 kb
    // images size received from
    const fileSize = parseInt(((imagesSize) / 1024).toFixed(4)); // kb convet2base64
    // console.log('fileSize: ', fileSize);
    let extension = imagesType.split('/').pop(); // get extension
    // conditions
    if (allowedExtensions.some(ext => ext === extension && fileSize < maxAllowedSize)) { return true; } return false;
}