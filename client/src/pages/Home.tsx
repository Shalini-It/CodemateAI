//todo: remove mock functionality
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LanguageSelector from "@/components/LanguageSelector";
import TopicFilter from "@/components/TopicFilter";
import TipCard from "@/components/TipCard";
import TipGenerator from "@/components/TipGenerator";
import SavedTips from "@/components/SavedTips";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const allMockTips = [
  {
    id: 1,
    title: "Use Debouncing to Optimize Event Handlers",
    topic: "Performance",
    language: "JavaScript",
    difficulty: "Intermediate" as const,
    code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
    explanation: "Debouncing is a technique to limit the rate at which a function is called. This is particularly useful for event handlers like scroll, resize, or search input events. By delaying the execution until after the user has stopped triggering the event for a specified period, you can significantly improve performance.",
    readingTime: "4 min",
  },
  {
    id: 2,
    title: "Implement Binary Search for Efficient Lookups",
    topic: "Algorithms",
    language: "Python",
    difficulty: "Intermediate" as const,
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    explanation: "Binary search is an efficient algorithm for finding an item in a sorted array. It works by repeatedly dividing the search interval in half, achieving O(log n) time complexity compared to O(n) for linear search.",
    readingTime: "5 min",
  },
  {
    id: 3,
    title: "Prevent SQL Injection with Prepared Statements",
    topic: "Security",
    language: "Java",
    difficulty: "Advanced" as const,
    code: `String query = "SELECT * FROM users WHERE username = ? AND password = ?";
PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, username);
stmt.setString(2, password);
ResultSet rs = stmt.executeQuery();`,
    explanation: "Prepared statements prevent SQL injection attacks by separating SQL code from data. The database treats parameterized values as data only, not as executable code, making it impossible for attackers to inject malicious SQL.",
    readingTime: "6 min",
  },
  {
    id: 4,
    title: "Use Async/Await for Clean Asynchronous Code",
    topic: "Best Practices",
    language: "JavaScript",
    difficulty: "Beginner" as const,
    code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}`,
    explanation: "Async/await syntax makes asynchronous code more readable and easier to maintain compared to callback-based or promise-chaining approaches. It allows you to write asynchronous code that looks synchronous.",
    readingTime: "3 min",
  },
  {
    id: 5,
    title: "Implement Memoization for Performance",
    topic: "Performance",
    language: "Python",
    difficulty: "Intermediate" as const,
    code: `from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
    explanation: "Memoization caches the results of expensive function calls and returns the cached result when the same inputs occur again. This can dramatically improve performance for recursive or computationally expensive functions.",
    readingTime: "4 min",
  },
  {
    id: 6,
    title: "Use List Comprehensions for Readable Code",
    topic: "Clean Code",
    language: "Python",
    difficulty: "Beginner" as const,
    code: `# Instead of this:
squares = []
for x in range(10):
    squares.append(x**2)

# Use this:
squares = [x**2 for x in range(10)]

# With filtering:
even_squares = [x**2 for x in range(10) if x % 2 == 0]`,
    explanation: "List comprehensions provide a concise way to create lists in Python. They're more readable and often faster than traditional for-loops for creating lists, especially when combined with filtering conditions.",
    readingTime: "3 min",
  },
  {
    id: 7,
    title: "Validate Input Data with Zod Schemas",
    topic: "Security",
    language: "TypeScript",
    difficulty: "Intermediate" as const,
    code: `import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
  name: z.string().min(2).max(50)
});

function registerUser(data: unknown) {
  const validated = UserSchema.parse(data);
  // validated is now type-safe!
}`,
    explanation: "Input validation is crucial for security and data integrity. Zod provides TypeScript-first schema validation with excellent type inference, making your code both safe and maintainable.",
    readingTime: "5 min",
  },
  {
    id: 8,
    title: "Use Map for O(1) Lookups",
    topic: "Data Structures",
    language: "JavaScript",
    difficulty: "Beginner" as const,
    code: `// Instead of array.find() - O(n)
const user = users.find(u => u.id === userId);

// Use Map - O(1)
const userMap = new Map(users.map(u => [u.id, u]));
const user = userMap.get(userId);`,
    explanation: "Maps provide constant-time O(1) lookups compared to arrays which require O(n) time for searches. When you need frequent lookups by a key, using a Map can significantly improve performance.",
    readingTime: "4 min",
  },
];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [filteredTips, setFilteredTips] = useState(allMockTips);
  const [dailyTipIndex, setDailyTipIndex] = useState(0);

  useEffect(() => {
    let filtered = allMockTips;
    
    if (selectedLanguage && selectedLanguage !== "all") {
      filtered = filtered.filter(tip => 
        tip.language.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }
    
    if (selectedTopic && selectedTopic !== "All") {
      filtered = filtered.filter(tip => 
        tip.topic.toLowerCase() === selectedTopic.toLowerCase()
      );
    }
    
    setFilteredTips(filtered);
  }, [selectedLanguage, selectedTopic]);

  const handleRefreshDailyTip = () => {
    setDailyTipIndex((prev) => (prev + 1) % allMockTips.length);
  };

  const dailyTip = allMockTips[dailyTipIndex];

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Hero />

          <section id="languages" className="py-12 lg:py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <LanguageSelector onLanguageChange={setSelectedLanguage} />
            </div>
          </section>

          <section className="py-8 bg-muted/20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <TopicFilter onTopicChange={setSelectedTopic} />
            </div>
          </section>

          <section id="tips" className="py-12 lg:py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <h3 className="text-lg font-semibold">Tip of the Day</h3>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleRefreshDailyTip}
                          data-testid="button-refresh-daily"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          New Tip
                        </Button>
                      </div>
                      <TipCard {...dailyTip} isFeatured={true} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        {selectedLanguage !== "javascript" || selectedTopic !== "All" 
                          ? "Filtered Tips" 
                          : "All Tips"}
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        {filteredTips.length} tip{filteredTips.length !== 1 ? 's' : ''} found
                        {selectedLanguage !== "javascript" && ` for ${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}`}
                        {selectedTopic !== "All" && ` in ${selectedTopic}`}
                      </p>
                    </div>
                  </div>

                  {filteredTips.length > 0 ? (
                    <div className="space-y-6">
                      {filteredTips.map((tip) => (
                        <div 
                          key={tip.id}
                          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                          style={{ animationDelay: `${tip.id * 50}ms` }}
                        >
                          <TipCard {...tip} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 px-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No tips found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try selecting a different language or topic
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedLanguage("javascript");
                          setSelectedTopic("All");
                        }}
                        data-testid="button-clear-filters"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <TipGenerator />
                  <SavedTips />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
