import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription submitted");
  };

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">CodeMate AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering developers worldwide with AI-generated programming tips and best practices.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="link-github">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Popular Languages</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">JavaScript</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Python</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Java</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">TypeScript</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Top Topics</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Algorithms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Performance</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Best Practices</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join 50,000+ developers improving daily
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="your@email.com"
                required
                data-testid="input-newsletter-email"
              />
              <Button type="submit" className="w-full" data-testid="button-subscribe">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CodeMate AI. All rights reserved.</p>
          <p className="mt-2">Created by Shalini Singh</p>
        </div>
      </div>
    </footer>
  );
}
