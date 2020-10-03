# strapi-provider-upload-sftp-v2

SFTP provider for Strapi CMS file upload.

## Installation

```
yarn add strapi-provider-upload-sftp-v2
```

## Config

`./extensions/upload/config/settings.json`

```json
{
  "provider": "sftp-v2",
  "providerOptions": {
    "host": "<host>",
    "port": "<port>",
    "user": "<sftp-username>",
    "password": "<password>",
    "basePath": "<base-path>",
    "baseUrl": "<base-url>"
  }
}
```

## Base URL
`Base URL` is used to generate the URLs for the files. The file name will be appended to it.

Obs: the value should include a / at the end

### Example
```
Base URL: http://example.com/
File name: image.jpg

File URL: http://example.com/image.jpg
```

## Base PATH
`Base PATH` is used to define where, inside FTP, files should be saved.

## Duplicate names
When uploading a file, this provider will check if there is already a file with the same name on the server. If the file name already exists it will append a counter to the file name that will be incremented until the name is available.

### Example
```
Files in the server:
  - file.jpg
  - file(1).jpg

File you are trying to upload:
  - file.jpg

The file will be uploaded as file(2).jpg
```

## License

MIT License

Copyright (c) 2020 FInno Consult
