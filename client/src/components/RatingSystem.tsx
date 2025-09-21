import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

interface Rating {
  id: string;
  user: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface RatingSystemProps {
  noteId: string;
  averageRating: number;
  totalRatings: number;
  ratings: Rating[];
  userRating?: number;
  onRate?: (noteId: string, rating: number, comment: string) => void;
  onMarkHelpful?: (ratingId: string) => void;
}

export default function RatingSystem({
  noteId,
  averageRating,
  totalRatings,
  ratings,
  userRating,
  onRate,
  onMarkHelpful
}: RatingSystemProps) {
  const [selectedRating, setSelectedRating] = useState(userRating || 0);
  const [comment, setComment] = useState("");
  const [showRatingForm, setShowRatingForm] = useState(false);

  const renderStars = (rating: number, interactive = false, size = "h-4 w-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} cursor-pointer transition-colors ${
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : interactive 
              ? "text-gray-300 hover:text-yellow-300" 
              : "text-gray-300"
        }`}
        onClick={interactive ? () => setSelectedRating(i + 1) : undefined}
        data-testid={interactive ? `star-${i + 1}` : undefined}
      />
    ));
  };

  const handleSubmitRating = () => {
    if (selectedRating > 0) {
      onRate?.(noteId, selectedRating, comment);
      setShowRatingForm(false);
      setComment("");
    }
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    ratings.forEach(rating => {
      if (rating.rating >= 1 && rating.rating <= 5) {
        distribution[rating.rating - 1]++;
      }
    });
    return distribution.reverse(); // Show 5-star first
  };

  const distribution = getRatingDistribution();

  return (
    <div className="space-y-6" data-testid="rating-system">
      {/* Rating Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-3xl font-bold mb-1" data-testid="average-rating">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center mb-2">
                {renderStars(Math.floor(averageRating))}
              </div>
              <div className="text-sm text-muted-foreground" data-testid="total-ratings">
                {totalRatings} ratings
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1">
              <h4 className="font-medium mb-3">Rating Distribution</h4>
              <div className="space-y-2">
                {distribution.map((count, index) => {
                  const starCount = 5 - index;
                  const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                  return (
                    <div key={starCount} className="flex items-center gap-2 text-sm">
                      <span className="w-6">{starCount}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-muted-foreground">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rate This Note Button */}
            <div>
              {!userRating ? (
                <Button 
                  onClick={() => setShowRatingForm(!showRatingForm)}
                  data-testid="button-rate-note"
                >
                  Rate This Note
                </Button>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Your Rating</div>
                  <div className="flex items-center justify-center">
                    {renderStars(userRating)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rating Form */}
          {showRatingForm && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-4">Rate this note</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">Your rating:</span>
                    <div className="flex items-center">
                      {renderStars(selectedRating, true, "h-5 w-5")}
                    </div>
                  </div>
                </div>
                <div>
                  <Textarea
                    placeholder="Share your thoughts about these notes... (optional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-20"
                    data-testid="input-rating-comment"
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleSubmitRating}
                    disabled={selectedRating === 0}
                    data-testid="button-submit-rating"
                  >
                    Submit Rating
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowRatingForm(false)}
                    data-testid="button-cancel-rating"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Individual Ratings */}
      {ratings.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Student Reviews ({ratings.length})
            </h4>
            <div className="space-y-4">
              {ratings.map((rating) => (
                <div key={rating.id} className="border-b pb-4 last:border-b-0" data-testid={`rating-${rating.id}`}>
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={rating.avatar} alt={rating.user} />
                      <AvatarFallback>
                        {rating.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium" data-testid={`rating-user-${rating.id}`}>
                          {rating.user}
                        </span>
                        <div className="flex items-center">
                          {renderStars(rating.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">{rating.date}</span>
                      </div>
                      {rating.comment && (
                        <p className="text-sm text-muted-foreground mb-2" data-testid={`rating-comment-${rating.id}`}>
                          {rating.comment}
                        </p>
                      )}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => onMarkHelpful?.(rating.id)}
                          data-testid={`button-helpful-${rating.id}`}
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful ({rating.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}