import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search, Trash2, Download } from "lucide-react";

interface SavedTip {
  id: number;
  title: string;
  language: string;
  topic: string;
}

export default function SavedTips() {
  const [savedTips, setSavedTips] = useState<SavedTip[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("savedTips");
    if (stored) {
      setSavedTips(JSON.parse(stored));
    } else {
      const initialTips = [
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
      ];
      setSavedTips(initialTips);
      localStorage.setItem("savedTips", JSON.stringify(initialTips));
    }
  }, []);

  const handleRemove = (id: number) => {
    const updated = savedTips.filter(tip => tip.id !== id);
    setSavedTips(updated);
    localStorage.setItem("savedTips", JSON.stringify(updated));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(savedTips, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "saved-tips.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredTips = savedTips.filter(tip =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card data-testid="card-saved-tips">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            Saved Tips ({savedTips.length})
          </CardTitle>
          {savedTips.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExport} 
              data-testid="button-export"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search saved tips..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-tips"
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredTips.length > 0 ? (
          <div className="space-y-3">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="flex items-start justify-between gap-3 p-3 rounded-lg border border-card-border hover-elevate transition-all animate-in fade-in slide-in-from-bottom-2"
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
                  className="h-8 w-8 flex-shrink-0 hover:text-destructive"
                  onClick={() => handleRemove(tip.id)}
                  data-testid={`button-remove-${tip.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Heart className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">
              {searchQuery ? "No matching tips found" : "No saved tips yet"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
