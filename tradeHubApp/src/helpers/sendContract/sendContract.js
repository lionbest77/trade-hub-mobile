import axios from "axios";
import { DEFAULT_URL } from "../../constants/Req";

export const sendContract = async (document, tenderId, token) => {

  let formData = new FormData();
  const url = `${DEFAULT_URL}/tenders/${tenderId}/contracts/attach`;

  formData.append("file", {
    name: encodeURI(document.name),
    uri: document.uri,
    size: document.size,
    type: "application/octet-stream"
  });

  // console.log(formData, '-----------Step 2------');
  // console.log(url);

  await axios({
    method: "PATCH",
    url: url,
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${token}`
    },
    data: formData

  })
    .then(res => {
      // console.log(res, "------ SEND CONTRACT");
    })
    .catch(e => console.log(e.response.data, "ERROR"));

};
