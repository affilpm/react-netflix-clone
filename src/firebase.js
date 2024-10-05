import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAYhfWk245-bdp1vBgdonHcnvG3bTKEi5U",
  authDomain: "netflix-clone-17b76.firebaseapp.com",
  projectId: "netflix-clone-17b76",
  storageBucket: "netflix-clone-17b76.appspot.com",
  messagingSenderId: "19129390405",
  appId: "1:19129390405:web:5e82f8eea3eca3a2795a2c"
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid : user.uid, name, authProvider: 'local', email, 
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));

    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}