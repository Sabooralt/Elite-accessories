const sharp = require("sharp");
const { encode } = require("blurhash");

const generateBlurHash = (imagePath) => {
  return new Promise((resolve, reject) => {
    sharp(imagePath)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) {
          reject(err);
        } else {
          const blurhash = encode(new Uint8ClampedArray(buffer), width, height, 4, 4);
          resolve(blurhash);
        }
      });
  });
};
module.exports = generateBlurHash;
