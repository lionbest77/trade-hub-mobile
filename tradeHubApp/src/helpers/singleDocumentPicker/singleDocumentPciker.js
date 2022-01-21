import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

export const addDocument = async (setDocument, freeSpace, setFreeSpace, setIsOpenOverlay) => {

  const result = await DocumentPicker.getDocumentAsync();
  // console.log(result, '------ attach');
  if (result.type !== "cancel") {
    if (freeSpace - result.size >= 0) {
      let newResult = { ...result, id: Date.now().toString() };
      await setDocument(newResult);
      await setFreeSpace(freeSpace - result.size);
      await setIsOpenOverlay (true);
    } else {
      Alert.alert(
        "Загальний обсяг файлів не має бути більш ніж 10 Мб",
        ` Залишилось ${(freeSpace / 1000000).toFixed(2)} Мб`,
        [{ text: "Зрозуміло" }]
      );
    }
  }
};
