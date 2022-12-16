import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtDdYDmPCIL71n77x-L0HvM3RbilIAMhA",
  authDomain: "play-pal-a1403.firebaseapp.com",
  projectId: "play-pal-a1403",
  storageBucket: "play-pal-a1403.appspot.com",
  messagingSenderId: "752586541921",
  appId: "1:752586541921:web:50d36804b26ad08ed09320",
  measurementId: "G-F3XBGRBZWB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider(); // we used google sign in provider

// our provider will prompt a user to select account of google
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);
// google sign in provider and auth to pass in parameters and gets the user object
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

const db = getFirestore();

export const addCollectionandDocuments = async (
  collectionKey,
  objectstoAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectstoAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("items added in firestore");
};

///////////////////////////////////
//// fetching data from database
//////////////////////////////////
export const getCategoriesandDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};

// creating user document from auth variable
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  updateProfile(userAuth, {
    displayName: additionalInformation["displayName"],
  });
  //

  // a reference document containing database location, collection and user id

  //const userDocRef = doc(db, "users", userAuth.uid);
  const docRef = doc(db, "users", "ground-owner");

  const docSnap = await getDoc(docRef);

  // if doc doesnt exists then create the user and set to the doc
  if (docSnap.exists()) {
    console.log("Document exists");
    const { displayName, phoneNumber, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(
        docRef,
        {
          [userAuth.uid]: {
            displayName,
            phoneNumber,
            email,
            createdAt,
            ...additionalInformation,
          },
        },
        { merge: true }
      ).then(() => {
        console.log("user created");
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  // return userDocRef;
  return docRef;
};

// creating user with email and password

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const SignOutUser = async () => signOut(auth);

//observer / listener
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback); // Whenever our Global object Auth changes state, we get a callback
