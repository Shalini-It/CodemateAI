import { useState } from "react";
import { Check } from "lucide-react";

const topics = [
  "All",
  "Algorithms",
  "Debugging",
  "Performance",
  "Security",
  "Best Practices",
  "Data Structures",
  "Clean Code",
  "Testing",
];

interface TopicFilterProps {
  onTopicChange?: (topic: string) => void;
}

export default function TopicFilter({ onTopicChange }: TopicFilterProps) {
  const [selectedTopic, setSelectedTopic] = useState("All");

  const handleSelect = (topic: string) => {
    setSelectedTopic(topic);
    onTopicChange?.(topic);
    console.log("Topic selected:", topic);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Filter by Topic
        </h3>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {topics.map((topic) => {
          const isSelected = selectedTopic === topic;
          
          return (
            <button
              key={topic}
              onClick={() => handleSelect(topic)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border whitespace-nowrap transition-all hover-elevate ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-card-border"
              }`}
              data-testid={`button-topic-${topic.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {isSelected && <Check className="w-3 h-3" />}
              <span className="text-sm font-medium">{topic}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
