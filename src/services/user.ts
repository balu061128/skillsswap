"use server";

import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from "@/lib/firebase";

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