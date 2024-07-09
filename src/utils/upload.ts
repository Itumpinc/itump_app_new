// import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import {__, alert, createImgUrl} from './helpers';
import {getApiEndpoint} from '@src/store/api';

export const selectFile = async (props: any) => {
  let selectedFile = null;
  // Opening Document Picker to select one file
  try {
    const res = await DocumentPicker.pick({
      // Provide which type of file you want user to pick
      type: [
        DocumentPicker.types.images,
        DocumentPicker.types.plainText,
        DocumentPicker.types.pdf,
        DocumentPicker.types.csv,
        DocumentPicker.types.doc,
        DocumentPicker.types.docx,
        DocumentPicker.types.ppt,
        DocumentPicker.types.pptx,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
      ],
      // There can me more options as well
      // DocumentPicker.types.allFiles
      allowMultiSelection: props.allowMultiSelection ? true : false,
    });
    // Printing the log realted to the file
    // console.log('res : ', res);
    // Setting the state to show single file attributes
    selectedFile = res;
  } catch (err) {
    console.log(err);
    selectedFile = null;
    // Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      // If user canceled the document selection
      // alert('Canceled');
    } else {
      // For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
  return selectedFile;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const fileUpload = async (props: any) => {
  const {file, storage, onDone, onError} = props;

  let data: any;

  const token = __(storage, 'tokens', 'access', 'token');
  try {
    var formData = new FormData();

    // @ts-ignore
    formData.append('media', file, file.name.toLowerCase().replace(/[^a-zA-Z0-9-_ .]/g, ''));

    const endpointUrl = getApiEndpoint(
      process.env.API_URL + '/v1/media/upload',
    );

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', endpointUrl);
    // console.log('OPENED', xhr);

    xhr.onprogress = event => {
      // console.log('LOADING', xhr);
      // console.log(`Downloaded ${event.loaded} of ${event.total} bytes`)
      // onProgress(xhr.status.data)
    };

    xhr.onerror = () => {
      console.error('Download failed.');
      onError('There is some error in uploading file');
    };

    // listen for `abort` event
    xhr.onabort = () => {
      console.error('Download cancelled.');
      onError('There is some error in uploading file');
    };

    xhr.onload = function () {
      console.log('DONE', xhr.status, xhr.response);
      // let res = JSON.parse(xhr.response)
      if (xhr.status == 200) {
        onDone(xhr.response.data);
      } else {
        onError('There is some error in uploading file');
      }
    };

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token ? 'Bearer ' + token : '');
    xhr.send(formData);
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const fileDownload = (file: any, media_host: string) => {
  // let url = createImgUrl(file.media_path, media_host);
  // let fullPath =
  //   RNFetchBlob.fs.dirs.DocumentDir +
  //   '/' +
  //   file.media_path.replace(/^.*[\\\/]/, '');
  // RNFetchBlob.config({
  //   fileCache: true,
  //   path: fullPath,
  //   addAndroidDownloads: {
  //     useDownloadManager: true, // <-- this is the only thing required
  //     // Optional, override notification setting (default to true)
  //     notification: true,
  //     // Optional, but recommended since android DownloadManager will fail when
  //     // the url does not contains a file extension, by default the mime type will be text/plain
  //     mime: 'text/plain',
  //     description: 'File downloaded by download manager.',
  //   },
  // })
  //   .fetch('GET', url)
  //   .then(resp => {
  //     // the path of downloaded file
  //     console.log(resp.path());
  //   });
};
