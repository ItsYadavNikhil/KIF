//todo: remove mock functionality
import RatingSystem from '../RatingSystem';

export default function RatingSystemExample() {
  const mockRatings = [
    {
      id: "1",
      user: "Sarah Chen",
      avatar: "/api/placeholder/32/32",
      rating: 5,
      comment: "Excellent notes! Very comprehensive and well-organized. Helped me ace my calculus exam.",
      date: "2 days ago",
      helpful: 12
    },
    {
      id: "2", 
      user: "Mike Rodriguez",
      avatar: "/api/placeholder/32/32",
      rating: 4,
      comment: "Good quality notes with clear explanations. Could use more practice problems.",
      date: "1 week ago",
      helpful: 8
    },
    {
      id: "3",
      user: "Emily Watson",
      rating: 5,
      comment: "Amazing work! These notes saved me so much time during exam prep.",
      date: "2 weeks ago", 
      helpful: 15
    },
    {
      id: "4",
      user: "David Park",
      rating: 3,
      comment: "Decent notes but some sections could be explained better.",
      date: "3 weeks ago",
      helpful: 3
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Rating System Example</h1>
      <RatingSystem 
        noteId="sample-note"
        averageRating={4.2}
        totalRatings={142}
        ratings={mockRatings}
        userRating={undefined}
        onRate={(noteId, rating, comment) => console.log('Rate note:', noteId, rating, comment)}
        onMarkHelpful={(ratingId) => console.log('Mark helpful:', ratingId)}
      />
    </div>
  );
}