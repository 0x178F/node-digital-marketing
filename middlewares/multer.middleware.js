import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/uploads');
    },
    filename: function (req, file, callback) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        callback(null, req.body.slug + ext);
    }
});

export const fileUpload = multer({ storage: storage }).single('image');

//export const fileUpload = upload().single('uploaded_file')
//////////////////////////////////////////////////////////////////////////////////
// export const fileUpload = (req,res,next) => {
//     upload.single('uploaded_file')(req, res, () => {
//         console.log(req.body, req.file);
//         next()
//     });
// }
//////////////////////////////////////////////////////////////////////////////////
// export const fileUpload = (req,res,next) => {
//     _multer(req,res,next)
// }