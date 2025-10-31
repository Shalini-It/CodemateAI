//todo: remove mock functionality
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search, Trash2 } from "lucide-react";

const mockSavedTips = [
  {
    id: 1,
    title: "Use Debouncing to Optimize Event Handlers",
    language: "JavaScript",
    topic: "Performance",
  },
  {
    id: 2,
    title: "Implement Binary Search for Efficient Lookups",
    language: "Python",
    topic: "Algorithms",
  },
  {
    id: 3,
    title: "Prevent SQL Injection with Prepared Statements",
    language: "Java",
    topic: "Security",
  },
];

export default function SavedTips() {
  const handleRemove = (id: number) => {
    console.log("Remove tip:", id);
  };

  const handleExport = () => {
    console.log("Export all tips");
  };

  return (
    <Card data-testid="card-saved-tips">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            Saved Tips
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleExport} data-testid="button-export">
            Export All
          </Button>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search saved tips..."
            className="pl-9"
            data-testid="input-search-tips"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockSavedTips.map((tip) => (
            <div
              key={tip.id}
              className="flex items-start justify-between gap-3 p-3 rounded-lg border border-card-border hover-elevate"
              data-testid={`saved-tip-${tip.id}`}
            >
              <div className="flex-1 min-w-0 space-y-2">
                <h4 className="text-sm font-medium leading-tight line-clamp-2">
                  {tip.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {tip.language}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {tip.topic}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => handleRemove(tip.id)}
                data-testid={`button-remove-${tip.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
