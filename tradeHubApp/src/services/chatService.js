import * as FileSystem from 'expo-file-system';

export const sendPost = (text, tender_id, user_id, socket) => {
  socket.emit("chatMessage", {
    text,
    tender_id,
    user_id,
  });
  socket.on("chatMessage", (data) => {
    // console.log(data, "<<<< RESPONSE From Message Sending");
  });

};

export const sendAudio= async (tender_id, user_id, file, socket) => {

  let fileData = await FileSystem.readAsStringAsync(
      file.uri,
      {
    encoding: FileSystem.EncodingType.Base64,
             }
  );

  socket.emit("chatMessage", {
    tender_id,
    user_id,
    file: {
      originalname: 'audio.m4a',
      base64: fileData,
      metadata: {duration: file.durationMillis},
    },
  });

  socket.on("chatMessage", (data) => {
    // console.log(data, "<<<< RESPONSE From Audio Sending");
  });
};

export const sendFile= async (tender_id, user_id, file, socket, setLoading) => {
  try {
    setLoading(true);
    let fileData = await FileSystem.readAsStringAsync(
      file.uri,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    socket.emit("chatMessage", {
      tender_id,
      user_id,
      file: {
        originalname: file.name,
        base64: fileData,
      },
    });

    socket.on("chatMessage", (data) => {
      // console.log(data, "<<<< RESPONSE From File Sending");
    });
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false)
  }
};

export const leaveRoom = (tender_id, user_id, socket) => {
  socket.emit("leaveChat", {
    user_id: user_id,
    tender_id: tender_id,
  });
};
