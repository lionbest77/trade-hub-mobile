import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

export const attachDocument = async (
  arrayOfDocuments,
  setArrayOfDocument,
  setArrayLength,
  freeSpace,
  setFreeSpace
) => {
  const result = await DocumentPicker.getDocumentAsync();

  // console.log("Attach------------>", result);
  if (result.type !== "cancel") {
    if (freeSpace - result.size >= 0) {
      let newResult = { ...result, id: Date.now().toString() };
      await arrayOfDocuments.push(newResult);
      await setArrayOfDocument(arrayOfDocuments);
      await setArrayLength(arrayOfDocuments.length);
      await setFreeSpace(freeSpace - result.size);
    } else {
      Alert.alert(
        "Загальний обсяг файлів не має бути більш ніж 10 Мб",
        ` Залишилось ${(freeSpace / 1000000).toFixed(2)} Мб`,
        [{ text: "Зрозуміло" }]
      );
    }
  }
};

const parsingResult = arrayOfDocuments => {
  for (const result of arrayOfDocuments) {
    // console.log("Selected document is :", result);
    const split = result.uri.split("/");
    // console.log("split", split);
    const name = split.pop();
    // console.log("name", name);
    const inbox = split.pop();
    // console.log("inbox", inbox);
    const realPath = `${inbox}/${name}`;
    // console.log("realPath", realPath);
  }
};
