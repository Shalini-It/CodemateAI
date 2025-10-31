//todo: remove mock functionality
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LanguageSelector from "@/components/LanguageSelector";
import TopicFilter from "@/components/TopicFilter";
import TipCard from "@/components/TipCard";
import TipGenerator from "@/components/TipGenerator";
import SavedTips from "@/components/SavedTips";
import Footer from "@/components/Footer";

const mockTips = [
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
    isFeatured: true,
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
];

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Hero />

          <section id="languages" className="py-12 lg:py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <LanguageSelector />
            </div>
          </section>

          <section className="py-8 bg-muted/20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <TopicFilter />
            </div>
          </section>

          <section id="tips" className="py-12 lg:py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">Featured Tips</h2>
                      <p className="text-muted-foreground mt-2">
                        Handpicked programming tips to enhance your skills
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {mockTips.map((tip) => (
                      <TipCard key={tip.id} {...tip} />
                    ))}
                  </div>
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
