import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import StarRating from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !rating || !review) {
      toast.error("Please fill in all fields");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("feedback").insert({
        name,
        email,
        rating,
        review,
      });

      if (error) throw error;

      toast.success("Feedback Submitted Successfully!");
      
      // Reset form
      setName("");
      setEmail("");
      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto shadow-md border-border bg-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-card-foreground font-medium">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background border-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-card-foreground font-medium">Rating</Label>
          <StarRating rating={rating} onRatingChange={setRating} size="lg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review" className="text-card-foreground font-medium">
            Your Feedback
          </Label>
          <Textarea
            id="review"
            placeholder="Share your thoughts..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-32 bg-background border-input resize-none"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-lg shadow-md hover:shadow-lg transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </form>
    </Card>
  );
};

export default FeedbackForm;
