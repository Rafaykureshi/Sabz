import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactStars from 'react-rating-stars-component';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: Date;
  likes: number;
  hasLiked?: boolean;
  images?: string[];
}

interface Props {
  farmerId: string;
  reviews: Review[];
  onAddReview: (review: Partial<Review>) => Promise<void>;
  onLikeReview: (reviewId: string) => Promise<void>;
}

const ReviewSection = ({ farmerId, reviews, onAddReview, onLikeReview }: Props) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewImages, setReviewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await onAddReview({
        rating,
        comment,
        date: new Date()
      });
      setShowReviewForm(false);
      setRating(0);
      setComment('');
      setReviewImages([]);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReviewImages(prev => [...prev, ...files]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Customer Reviews</h3>
        <button
          onClick={() => setShowReviewForm(true)}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Write a Review
        </button>
      </div>

      <AnimatePresence>
        {showReviewForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmitReview}
            className="bg-gray-50 p-6 rounded-xl"
          >
            <h4 className="font-semibold text-primary mb-4">Write Your Review</h4>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <ReactStars
                count={5}
                onChange={setRating}
                size={24}
                activeColor="#ffd700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border rounded-lg resize-none"
                rows={4}
                placeholder="Share your experience..."
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Add Photos</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-lg"
              />
              {reviewImages.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {reviewImages.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Review image ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="flex-1 btn border border-primary text-primary hover:bg-primary/5"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-primary">{review.userName}</h4>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    edit={false}
                    size={16}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={() => onLikeReview(review.id)}
                className="flex items-center gap-1 text-gray-500 hover:text-primary"
              >
                <ThumbsUp className={`h-4 w-4 ${review.hasLiked ? 'fill-current text-primary' : ''}`} />
                <span>{review.likes}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                <MessageCircle className="h-4 w-4" />
                <span>Reply</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;