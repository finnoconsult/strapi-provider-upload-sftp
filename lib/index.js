const path = require('path');
const getSFTPConnection = require('./utils/getSFTPConnection');

module.exports = {
  init: config => {
    const { host, port, username, password, baseUrl, basePath } = config;

    const connection = async () => getSFTPConnection(host, port, username, password);

    const uploadFile = async (file, isBuffer) => {
      const sftp = await connection();
      const files = await sftp.list(basePath);

      let fileName = `${file.hash}${file.ext}`;
      let c = 0;

      const hasName = f => f.name === fileName;

      // scans directory files to prevent files with the same name
      while (files.some(hasName)) {
        c += 1;
        fileName = `${file.hash}(${c})${file.ext}`;
      }

      const fullPath = basePath + fileName
      const fileContent = isBuffer ? file.buffer : file.stream
      try {
        await sftp.put(fileContent, fullPath)
      } catch (e) {
        console.error(e);
      }

      /* eslint-disable no-param-reassign */
      file.public_id = fileName;
      file.url = `${baseUrl}${fileName}`;
      /* eslint-enable no-param-reassign */

      await sftp.end();

      return file;
    }

    const deleteFile = async file => {
      const sftp = await connection();

      try {
        await sftp.delete(`${basePath}${file.hash}${file.ext}`);
      } catch (e) {
        console.error(e);
      }

      await sftp.end();
    }

    return {
      upload: file => {
        return uploadFile(file, true)
      },
      uploadStream: file => {
        return uploadFile(file, false)
      },
      delete: file => {
        return deleteFile(file);
      },
    };
  },
};
