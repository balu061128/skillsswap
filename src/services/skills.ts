
"use server";

import { db, collection, getDocs } from "@/lib/firebase";

export type AggregatedSkill = {
  name: string;
  teachers: number;
  learners: number;
};

/**
 * Aggregates skill data from all user profiles in Firestore.
 * It counts how many users are teaching a skill and how many want to learn it.
 * @returns A promise that resolves to an array of AggregatedSkill objects.
 */
export async function getAggregatedSkills(): Promise<AggregatedSkill[]> {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const skillCounts: Record<string, { teachers: number; learners: number }> = {};

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      
      // Aggregate skills to teach
      if (user.skillsToTeach && Array.isArray(user.skillsToTeach)) {
        user.skillsToTeach.forEach((skill: string) => {
          if (!skill) return;
          const skillName = skill.trim();
          if (!skillCounts[skillName]) {
            skillCounts[skillName] = { teachers: 0, learners: 0 };
          }
          skillCounts[skillName].teachers += 1;
        });
      }

      // Aggregate skills to learn
      if (user.skillsToLearn && Array.isArray(user.skillsToLearn)) {
        user.skillsToLearn.forEach((skill: string) => {
           if (!skill) return;
          const skillName = skill.trim();
          if (!skillCounts[skillName]) {
            skillCounts[skillName] = { teachers: 0, learners: 0 };
          }
          skillCounts[skillName].learners += 1;
        });
      }
    });

    const aggregatedSkills: AggregatedSkill[] = Object.entries(skillCounts).map(([name, counts]) => ({
      name,
      ...counts,
    }));
    
    // Sort skills by the number of teachers in descending order
    return aggregatedSkills.sort((a, b) => b.teachers - a.teachers);

  } catch (error) {
    console.error("Error aggregating skills:", error);
    // Return an empty array in case of an error to prevent the page from crashing.
    return [];
  }
}
