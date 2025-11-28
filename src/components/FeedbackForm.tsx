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
    <Card className="p-8 max-w-2xl mx-auto shadow-sm border-border bg-card">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Feedback Form</h2>
        <p className="text-sm text-muted-foreground">Help us improve by sharing your experience</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-input focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background border-input focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground block">Rating</Label>
          <StarRating rating={rating} onRatingChange={setRating} size="lg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review" className="text-sm font-medium text-foreground">
            Your Feedback
          </Label>
          <Textarea
            id="review"
            placeholder="Share your thoughts..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-32 bg-background border-input resize-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base shadow-sm hover:shadow transition-shadow mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
