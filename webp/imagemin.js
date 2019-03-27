const imageminWebp = require('imagemin-webp');
const convertPNGToWebp = () =>
  imagemin([PNGImages], output, {
    use: [
      imageminWebp({
        quality: 85,
      }),
    ]
  });
const convertJPGToWebp = () =>
  imagemin([JPGImages], output, {
    use: [
      imageminWebp({
        quality: 75,
      }),
    ]
  });
optimiseJPEGImages()
  .then(() => optimisePNGImages())
  .then(() => convertPNGToWebp())
  .then(() => convertJPGToWebp())
  .catch(error => console.log(error));