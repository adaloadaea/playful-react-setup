import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent" />
      <div className="relative container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center animate-fade-up">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Welcome to Your New App
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Start building something amazing with React, Tailwind CSS, and modern web technologies.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};