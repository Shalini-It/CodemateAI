import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TipGenerator() {
  const [language, setLanguage] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Tip Generated!",
        description: `Created a ${difficulty} ${language} tip about ${topic}`,
      });
      
      setLanguage("");
      setTopic("");
      setDifficulty("");
    }, 2000);
  };

  const handleRandom = () => {
    const languages = ["javascript", "python", "java", "cpp", "go", "rust"];
    const topics = ["algorithms", "debugging", "performance", "security", "best-practices"];
    const difficulties = ["beginner", "intermediate", "advanced"];
    
    setLanguage(languages[Math.floor(Math.random() * languages.length)]);
    setTopic(topics[Math.floor(Math.random() * topics.length)]);
    setDifficulty(difficulties[Math.floor(Math.random() * difficulties.length)]);
    
    setTimeout(() => handleGenerate(), 300);
  };

  return (
    <Card data-testid="card-tip-generator" className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Generate a New Tip
        </CardTitle>
        <CardDescription>
          Customize your learning experience by selecting language, topic, and difficulty
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
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
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
                <SelectItem value="algorithms">Algorithms</SelectItem>
                <SelectItem value="debugging">Debugging</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="best-practices">Best Practices</SelectItem>
                <SelectItem value="data-structures">Data Structures</SelectItem>
                <SelectItem value="clean-code">Clean Code</SelectItem>
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
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !language || !topic || !difficulty}
            className="flex-1 sm:flex-none"
            data-testid="button-generate"
          >
            {isGenerating ? (
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
            disabled={isGenerating}
            data-testid="button-random"
          >
            <Shuffle className="mr-2 w-4 h-4" />
            Feeling Lucky
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
