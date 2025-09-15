
"use server";

import { auth, db, createUserWithEmailAndPassword, doc, setDoc, getDoc, updateDoc } from "@/lib/firebase";
import type { User } from "@/lib/types";

// This is a server action. It will only run on the server.
export async function createUser(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Now, let's create a document in Firestore for this user
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
      bio: `Hi, I'm ${name}. I'm new to Skill Swap and excited to learn and share skills!`,
      avatarUrl: `https://picsum.photos/seed/${user.uid}/128/128`,
      skillsToTeach: [],
      skillsToLearn: [],
      rating: 0,
      reviews: 0,
    });

    return { uid: user.uid, email: user.email, name: name };
  } catch (error: any) {
    console.error("Error creating user:", error);
    // We throw the error so the client component can catch it and show a message.
    throw new Error(error.message || "An unexpected error occurred during signup.");
  }
}

export async function getUserProfile(uid: string) {
    if (!uid) {
        return null;
    }
    try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() };
        } else {
            console.log("No such document for uid:", uid);
            return null;
        }
    } catch (error) {
        console.error("Error getting user profile for uid:", uid, error);
        // Return null instead of throwing an error to prevent crashes
        return null;
    }
}

export async function updateUserProfile(uid: string, data: Partial<User>) {
    try {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, data);
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("Failed to update user profile.");
    }
}
