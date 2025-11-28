import { Card } from "@/components/ui/card";
import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";
import { User } from "lucide-react";

interface FeedbackCardProps {
  name: string;
  rating: number;
  review: string;
  createdAt: string;
}

const FeedbackCard = ({ name, rating, review, createdAt }: FeedbackCardProps) => {
  return (
    <Card className="p-6 shadow-sm hover:shadow-md transition-all duration-300 border-border bg-card">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
          <User className="h-6 w-6 text-accent-foreground" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-card-foreground">{name}</h3>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <StarRating rating={rating} readonly size="sm" />
          
          <p className="mt-3 text-card-foreground leading-relaxed">{review}</p>
        </div>
      </div>
    </Card>
  );
};

export default FeedbackCard;
