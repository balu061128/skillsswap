

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { getAggregatedSkills } from "@/services/skills";
import type { AggregatedSkill } from "@/services/skills";


export default function SkillsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [allSkills, setAllSkills] = useState<AggregatedSkill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            setLoading(true);
            const skills = await getAggregatedSkills();
            setAllSkills(skills);
            setLoading(false);
        };
        fetchSkills();
    }, []);

    const filteredSkills = allSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skill Marketplace</h1>
        <p className="text-muted-foreground">Browse skills available on the platform, based on real user data.</p>
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

      {loading ? (
          <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      ) : (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredSkills.map(skill => (
                    <Card key={skill.name}>
                        <CardHeader>
                            <CardTitle>{skill.name}</CardTitle>
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
        </>
      )}
    </div>
  );
}
