import { collection, addDoc, onSnapshot,query,getDocs,where } from "firebase/firestore"; 
import { db } from "./firebaseConfig";
import { getAuth  } from "firebase/auth";

export const getDocuments = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in.");
  }

  try {
    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid)
    );

    const querySnapshot = await getDocs(q);
    const expenses = [];
    querySnapshot.forEach((doc) => {
      expenses.push({ id: doc.id, ...doc.data() });
    });

    return expenses;
  } catch (err) {
    throw new Error(err.message);
  }
};


export const createDocument = async ({ amount, name, category, date }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in.");
  }

  try {
    const docRef = await addDoc(collection(db, "expenses"), {
      amount,
      name,
      category,
      date,
      userId: user.uid,
    });

    // Return the newly created document so Redux can update the state
    return {
      id: docRef.id,
      amount,
      name,
      category,
      date,
      userId: user.uid,
    };
  } catch (e) {
    throw new Error("Error adding document: " + e.message);
  }
};

export const getAllDocuments = (callback) => {
    try {
      const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data); 
      });
  
      return unsubscribe; 
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  
