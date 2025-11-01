import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Shuffle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import TipCard from "./TipCard";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GeneratedTip {
  title: string;
  code: string;
  explanation: string;
  language: string;
  topic: string;
  difficulty: string;
  readingTime: string;
}

export default function TipGenerator() {
  const [language, setLanguage] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [generatedTip, setGeneratedTip] = useState<GeneratedTip | null>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: { language: string; topic: string; difficulty: string }) => {
      const response = await apiRequest("POST", "/api/tips/generate", data);
      return await response.json() as GeneratedTip;
    },
    onSuccess: (data) => {
      setGeneratedTip(data);
      toast({
        title: "Tip Generated!",
        description: `Created a ${difficulty} ${language} tip about ${topic}`,
      });
      
      setLanguage("");
      setTopic("");
      setDifficulty("");
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Failed to generate tip";
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!language || !topic || !difficulty) return;
    
    generateMutation.mutate({
      language,
      topic,
      difficulty: difficulty as "Beginner" | "Intermediate" | "Advanced",
    });
  };

  const handleRandom = () => {
    const languages = ["JavaScript", "Python", "Java", "C++", "Go", "Rust"];
    const topics = ["Algorithms", "Debugging", "Performance", "Security", "Best Practices"];
    const difficulties = ["Beginner", "Intermediate", "Advanced"];
    
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    setLanguage(randomLanguage);
    setTopic(randomTopic);
    setDifficulty(randomDifficulty);
    
    setTimeout(() => {
      generateMutation.mutate({
        language: randomLanguage,
        topic: randomTopic,
        difficulty: randomDifficulty as "Beginner" | "Intermediate" | "Advanced",
      });
    }, 300);
  };

  return (
    <>
      <Card data-testid="card-tip-generator" className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Generate a New Tip
          </CardTitle>
          <CardDescription>
            AI-powered programming tips tailored to your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" data-testid="select-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="C++">C++</SelectItem>
                  <SelectItem value="Go">Go</SelectItem>
                  <SelectItem value="Rust">Rust</SelectItem>
                  <SelectItem value="TypeScript">TypeScript</SelectItem>
                  <SelectItem value="PHP">PHP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger id="topic" data-testid="select-topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Algorithms">Algorithms</SelectItem>
                  <SelectItem value="Debugging">Debugging</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Best Practices">Best Practices</SelectItem>
                  <SelectItem value="Data Structures">Data Structures</SelectItem>
                  <SelectItem value="Clean Code">Clean Code</SelectItem>
                  <SelectItem value="Testing">Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty" data-testid="select-difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleGenerate}
              disabled={generateMutation.isPending || !language || !topic || !difficulty}
              className="flex-1 sm:flex-none"
              data-testid="button-generate"
            >
              {generateMutation.isPending ? (
                <>
                  <Sparkles className="mr-2 w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-4 h-4" />
                  Generate Tip
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleRandom}
              disabled={generateMutation.isPending}
              data-testid="button-random"
            >
              <Shuffle className="mr-2 w-4 h-4" />
              Feeling Lucky
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedTip && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TipCard
            id={Date.now()}
            {...generatedTip}
            difficulty={generatedTip.difficulty as "Beginner" | "Intermediate" | "Advanced"}
          />
        </div>
      )}
    </>
  );
}
