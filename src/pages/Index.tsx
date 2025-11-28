import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeedbackForm from "@/components/FeedbackForm";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-3">
            Share Your Feedback
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear your thoughts, suggestions, and experiences
          </p>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          <FeedbackForm />
        </div>

        <div className="text-center mt-8 animate-in fade-in duration-1000 delay-300">
          <Link to="/view-feedback">
            <Button variant="outline" size="lg" className="font-medium">
              View All Feedback
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
