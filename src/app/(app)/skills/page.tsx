
"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const allSkills = [
    { name: "React", category: "Web Development", teachers: 45, learners: 120 },
    { name: "Python", category: "Programming", teachers: 89, learners: 250 },
    { name: "Figma", category: "Design", teachers: 62, learners: 95 },
    { name: "Project Management", category: "Business", teachers: 33, learners: 78 },
    { name: "Guitar", category: "Music", teachers: 50, learners: 150 },
    { name: "Creative Writing", category: "Arts", teachers: 25, learners: 60 },
    { name: "Data Science", category: "Programming", teachers: 70, learners: 180 },
    { name: "Public Speaking", category: "Communication", teachers: 40, learners: 110 },
    { name: "Next.js", category: "Web Development", teachers: 38, learners: 115 },
    { name: "Node.js", category: "Web Development", teachers: 55, learners: 160 },
    { name: "Illustration", category: "Design", teachers: 30, learners: 70 },
    { name: "Piano", category: "Music", teachers: 42, learners: 100 },
];

export default function SkillsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSkills = useMemo(() => {
        if (!searchTerm) return allSkills;
        return allSkills.filter(skill => 
            skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skill Marketplace</h1>
        <p className="text-muted-foreground">Browse all available skills to learn or teach.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
            placeholder="Search for a skill..." 
            className="pl-10 w-full md:w-1/2 lg:w-1/3 transition-all focus:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSkills.map(skill => (
             <Card key={skill.name}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle>{skill.name}</CardTitle>
                        <Badge variant="outline">{skill.category}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Teachers: <span className="font-bold text-foreground">{skill.teachers}</span></span>
                        <span>Learners: <span className="font-bold text-foreground">{skill.learners}</span></span>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
       {filteredSkills.length === 0 && (
          <div className="text-center py-12 col-span-full">
            <p className="text-muted-foreground">No skills found matching your search.</p>
          </div>
        )}
    </div>
  );
}
