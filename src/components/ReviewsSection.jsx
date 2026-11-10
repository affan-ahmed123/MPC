import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/menuData';
import { Star, Quote, Sparkles, MessageSquarePlus, Send, CheckCircle2, User, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(() => {
    try {
      const cached = localStorage.getItem('mpc_user_reviews');
      if (cached) {
        const parsed = JSON.parse(cached);
        return [...parsed, ...TESTIMONIALS];
      }
    } catch {
      // fallback
    }
    return TESTIMONIALS;
  });

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [role, setRole] = useState('Verified Foodie');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  // Fetch reviews from MongoDB API on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0 && isMounted) {
          // Merge API reviews with default testimonials (avoid duplicates by id/name)
          setReviews(prev => {
            const apiIds = new Set(data.reviews.map(r => r._id || r.id));
            const existingFiltered = prev.filter(r => !apiIds.has(r._id || r.id));
            return [...data.reviews, ...existingFiltered];
          });
        }
      } catch (err) {
        console.warn('Could not fetch from /api/reviews:', err.message);
      }
    }
    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Please fill in your name and review comments.' });
      return;
    }

    setIsSubmitting(true);
    setFeedbackMsg(null);

    const newReview = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      role: role || 'Verified Customer',
      date: 'Just now',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });

      const data = await res.json();
      const savedItem = data.review || { ...newReview, _id: 'local_' + Date.now() };

      // Update state immediately
      setReviews(prev => [savedItem, ...prev]);

      // Cache locally as well
      try {
        const cached = localStorage.getItem('mpc_user_reviews');
        const list = cached ? JSON.parse(cached) : [];
        list.unshift(savedItem);
        localStorage.setItem('mpc_user_reviews', JSON.stringify(list));
      } catch (e) {
        console.error(e);
      }

      // Celebrate
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // fallback
      }

      setFeedbackMsg({
        type: 'success',
        text: 'Thank you! Your review has been submitted and added to the review section.'
      });

      // Reset fields
      setName('');
      setComment('');
      setRating(5);

      setTimeout(() => {
        setShowForm(false);
        setFeedbackMsg(null);
      }, 2500);
    } catch (err) {
      console.warn('API error, saving locally:', err);
      const fallbackItem = { ...newReview, _id: 'local_' + Date.now() };
      setReviews(prev => [fallbackItem, ...prev]);

      try {
        const cached = localStorage.getItem('mpc_user_reviews');
        const list = cached ? JSON.parse(cached) : [];
        list.unshift(fallbackItem);
        localStorage.setItem('mpc_user_reviews', JSON.stringify(list));
      } catch (e) {
        console.error(e);
      }

      setFeedbackMsg({
        type: 'success',
        text: 'Thank you! Your review has been saved.'
      });

      setName('');
      setComment('');
      setTimeout(() => {
        setShowForm(false);
        setFeedbackMsg(null);
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (val) => {
    switch (val) {
      case 5: return '5 Stars - Outstanding Experience ⭐';
      case 4: return '4 Stars - Very Good & Tasty 👍';
      case 3: return '3 Stars - Average Flavor';
      case 2: return '2 Stars - Needs Improvement';
      case 1: return '1 Star - Poor Experience';
      default: return '';
    }
  };

  return (
    <section id="reviews" className="py-10 sm:py-20 bg-black/20 backdrop-blur-sm relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full max-w-full">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Testimonials & Feedbacks</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            What Our Food Lovers <span className="gold-text-gradient">Are Saying</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2">
            Real reviews and feedbacks from Karachi's biryani and food lovers
          </p>

          {/* Toggle Write Review Button */}
          <div className="mt-4 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setShowForm(!showForm);
                setFeedbackMsg(null);
              }}
              className="py-2.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{showForm ? 'Close Review Form' : '✍️ Write a Review / Share Feedback'}</span>
            </motion.button>
          </div>
        </div>

        {/* Interactive Review & Feedback Submission Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="max-w-xl mx-auto mb-8 sm:mb-12 overflow-hidden"
            >
              <div className="bg-[#10141e]/95 border border-amber-500/35 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative">
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800/60"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-4">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Share Your Dining Feedback</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                    Your feedback helps us maintain the authentic Karachi taste!
                  </p>
                </div>

                {feedbackMsg && (
                  <div className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
                    feedbackMsg.type === 'success' 
                      ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-200'
                      : 'bg-red-950/70 border border-red-500/40 text-red-200'
                  }`}>
                    {feedbackMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    <span>{feedbackMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs text-gray-200">
                  
                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Your Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali Raza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e6b343] transition-colors"
                    />
                  </div>

                  {/* Interactive Star Rating Selection */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Rate Your Experience:
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-125"
                          >
                            <Star
                              className={`w-6 h-6 transition-colors ${
                                isFilled
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                                  : 'text-gray-600'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-[11px] text-amber-300 font-semibold ml-2">
                        {getRatingLabel(hoverRating || rating)}
                      </span>
                    </div>
                  </div>

                  {/* Experience Tag / Role */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Customer Tag / Experience Type:
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#e6b343]"
                    >
                      <option value="Verified Foodie">Verified Foodie</option>
                      <option value="Regular Customer">Regular Customer</option>
                      <option value="Biryani Lover">Biryani Lover</option>
                      <option value="Family Feast Diner">Family Feast Diner</option>
                      <option value="First-Time Customer">First-Time Customer</option>
                    </select>
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">
                      Your Detailed Review & Comments *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. The chicken biryani and beef pulao taste was extraordinary! Meat was juicy, rice was long and aromatic. 10/10 recommend..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-[#0a0d13] border border-gray-800 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#e6b343] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting to Database...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Review & Feedback</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6 w-full max-w-full">
          {reviews.map((review, idx) => (
            <div
              key={review._id || review.id || idx}
              className="bg-[#141926] border border-gray-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-6 relative flex flex-col justify-between hover:border-amber-500/40 transition-all duration-200 shadow-xl min-w-0 w-full overflow-hidden hover:-translate-y-1"
            >
              <Quote className="w-5 h-5 sm:w-8 sm:h-8 text-amber-500/20 absolute top-2 right-2 sm:top-4 sm:right-4 pointer-events-none" />

              <div>
                <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-3">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-[9px] sm:text-sm text-gray-200 leading-relaxed italic mb-2 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-1.5 sm:pt-4 border-t border-gray-800 flex items-center justify-between gap-1 min-w-0">
                <div className="min-w-0 pr-1 flex-1">
                  <h4 className="text-[10px] sm:text-sm font-bold text-white leading-tight truncate">{review.name}</h4>
                  <p className="text-[9px] sm:text-xs text-amber-400 font-medium truncate">{review.role || 'Verified Customer'}</p>
                </div>
                <span className="text-[8px] sm:text-[11px] text-gray-400 flex-shrink-0">{review.date || 'Recent'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
