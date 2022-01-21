// import firebase from "firebase";
// import "@firebase/firestore";
//
// class Fire {
//   constructor() {
//     this.historyListener = () => {};
//     this.loadChatMessages = () => {};
//     this.removeNotificationListener = () => {};
//     this.init();
//     this.observeAuth();
//     // this.getNotification = null;
//   }
//
//     init = () => firebase.initializeApp({
//       apiKey: "AIzaSyCce2X1ADr4n4cByQ68le_ViSATO6R4Xeg",
//       authDomain: "buypro-55176.firebaseapp.com",
//       databaseURL: "https://buypro-55176-default-rtdb.europe-west1.firebasedatabase.app",
//       projectId: "buypro-55176",
//       storageBucket: "buypro-55176.appspot.com",
//       messagingSenderId: "362356516786",
//       appId: "1:362356516786:web:fd01d2cdd44a8d438d26ab",
//       measurementId: "G-BH4GTK8GWB"
//     });
//
//   connectChatReducerActions = (loadChatMessages, setUnreadMessages) => {
//     this.loadChatMessages = loadChatMessages;
//     this.setUnreadMessages = setUnreadMessages;
//   };
//
//   onAuthStateChanged = (user) => {
//     if (!user) {
//       try {
//         firebase.auth().signInAnonymously();
//       } catch ({ message }) {
//         alert(message);
//       }
//     } else {
//       this.historyList("user1111111", "t11111111", this.loadChatMessages);
//     }
//   };
//
//   observeAuth = () => {
//     firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
//   };
//
//   get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }
//
//   get timestamp() {
//     return firebase.firestore.FieldValue.serverTimestamp();
//   }
//
//   getNotification = () => {
//     this.removeNotificationListener && this.removeNotificationListener();
//     this.removeNotificationListener = myFirestore
//       .collection("chats")
//       .doc("t11111111")
//       .collection("messages")
//       .where("viewedByClient", "==", false)
//       .orderBy("timestamp")
//       .limitToLast(5)
//       .onSnapshot((snapshot) => {
//         let notes = [...notification];
//         snapshot.forEach((doc) => {
//           return (notes = [...notes, doc.data()]);
//         });
//         });
//   };
//
//   historyList = (userId, tenderId, callback) => {
//     if (this.historyListener) this.historyListener();
//     if (userId)
//       this.historyListener = firebase
//         .firestore()
//         .collection("chats")
//         .doc(tenderId)
//         .collection("messages")
//         .onSnapshot(
//           (snapshot) => {
//             const messages = [
//               {
//                 _id: "xxxxxxx",
//                 createdAt: null,
//                 text:
//                   "Добрий день, я Антон, оператор BuyPro, пишу вам для уточнення деталей заявки №9801 “Плівка полотно термоусадочне”",
//                 user: {
//                   _id: "xxxxxxxxxx",
//                 },
//               },
//             ];
//             snapshot.forEach((doc) => {
//               const msg = doc.data();
//               const newMsg = {
//                 createdAt: msg.timestamp?.toDate(),
//                 text: msg.text,
//                 _id: doc.id,
//                 viewed: !!msg.viewed,
//                 user: {
//                   _id: msg.idFrom,
//                   name: msg.nickname,
//                 },
//               };
//
//               messages.push(newMsg);
//             });
//
//             callback(messages);
//           },
//           (err) => {
//             console.log(err.message);
//           }
//         );
//   };
// }
//
// Fire.shared = new Fire();
//
// export default Fire;
// export const myFirestore = firebase.firestore();
//
// export const sendMessage = (userId, tenderId, message) => {
//   const msgItem = {
//     idFrom: userId,
//     timestamp: Fire.shared.timestamp,
//     text: message,
//     viewedByAdmin: false,
//   };
//
//   myFirestore
//     .collection("chats")
//     .doc(tenderId)
//     .collection("messages")
//     .doc()
//     .set(msgItem)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// };
