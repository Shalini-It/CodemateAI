import { useState } from "react";
import { SiJavascript, SiPython, SiCplusplus, SiGo, SiRust, SiTypescript, SiPhp } from "react-icons/si";
import { Code2 } from "lucide-react";

const languages = [
  { id: "javascript", name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
  { id: "python", name: "Python", icon: SiPython, color: "text-blue-500" },
  { id: "java", name: "Java", icon: Code2, color: "text-red-500" },
  { id: "cpp", name: "C++", icon: SiCplusplus, color: "text-blue-600" },
  { id: "go", name: "Go", icon: SiGo, color: "text-cyan-500" },
  { id: "rust", name: "Rust", icon: SiRust, color: "text-orange-500" },
  { id: "typescript", name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { id: "php", name: "PHP", icon: SiPhp, color: "text-purple-500" },
];

interface LanguageSelectorProps {
  onLanguageChange?: (language: string) => void;
}

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
    onLanguageChange?.(languageId);
    console.log("Language selected:", languageId);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Select Language
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {languages.map((language) => {
          const Icon = language.icon;
          const isSelected = selectedLanguage === language.id;
          
          return (
            <button
              key={language.id}
              onClick={() => handleSelect(language.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover-elevate ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-card-border"
              }`}
              data-testid={`button-language-${language.id}`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? "" : language.color}`} />
              <span className="text-sm font-medium">{language.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
