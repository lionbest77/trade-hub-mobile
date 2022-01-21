import axios from 'axios';
import {DEFAULT_URL} from '../../constants/Req';

export const  createTenderFunction = async (
    tenderData,
    audioObject,
    arrayOfDocumentsObj,
  ) => {

  let formData = new FormData();
  console.log('TENDER DATA:', tenderData);
  formData.append(
      'json', JSON.stringify({
        ...tenderData
      }));

  arrayOfDocumentsObj.forEach((item) => {
    formData.append(
        'file',{
          name: item.name,
          uri: item.uri,
          size: item.size,
          type: 'application/octet-stream',
        },
    );
  });

  if (audioObject) {
    formData.append(
        'file', {
          uri: audioObject.uri,
          durationMillis: audioObject.durationMillis,
          type: 'application/octet-stream',
          name: 'audio.m4a',
        },
    );
    formData.append(
        'metadata', JSON.stringify({
          "audio.m4a": {audioObject}
        })
    );
  }
  // console.log('FORM DATA FROM Function----->', formData);

  await axios(
      {
        method: 'POST',
        url: `${DEFAULT_URL}/tenders`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${tenderData.token}`
        },
        data: formData
      }
  )
  .then((res) => {

    console.log(res, 'RESPONSE TENDER CREATE');

  }).catch((e) => console.log(e, 'ERROR TENDER CREATE'))
};

