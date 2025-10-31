import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Sparkles } from "lucide-react";
import CodeSnippet from "./CodeSnippet";

interface TipCardProps {
  title: string;
  topic: string;
  language: string;
  code: string;
  explanation: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  readingTime?: string;
  isFeatured?: boolean;
}

export default function TipCard({
  title,
  topic,
  language,
  code,
  explanation,
  difficulty = "Intermediate",
  readingTime = "3 min",
  isFeatured = false,
}: TipCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(isSaved ? "Tip unsaved" : "Tip saved");
  };

  const handleShare = () => {
    console.log("Share tip");
  };

  const handleGenerateSimilar = () => {
    console.log("Generate similar tip");
  };

  return (
    <Card className={`hover-elevate transition-all ${isFeatured ? "border-primary" : ""}`} data-testid="card-tip">
      {isFeatured && (
        <div className="flex items-center gap-2 px-6 pt-4 pb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Featured Tip</span>
        </div>
      )}
      
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" data-testid={`badge-topic-${topic}`}>{topic}</Badge>
          <Badge variant="outline" data-testid={`badge-language-${language}`}>{language}</Badge>
          <Badge variant="outline" data-testid={`badge-difficulty-${difficulty}`}>{difficulty}</Badge>
        </div>
        <h3 className="text-xl font-semibold leading-tight" data-testid="text-tip-title">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <CodeSnippet code={code} language={language} />
        <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-tip-explanation">
          {explanation}
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={isSaved ? "text-red-500" : ""}
            data-testid="button-save-tip"
          >
            <Heart className={`w-4 h-4 mr-1 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare} data-testid="button-share-tip">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
        <div className="text-xs text-muted-foreground" data-testid="text-reading-time">
          {readingTime} read
        </div>
      </CardFooter>
    </Card>
  );
}
