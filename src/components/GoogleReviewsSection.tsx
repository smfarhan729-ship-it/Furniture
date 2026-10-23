import React, { useState } from 'react';
import { Review } from '../types';
import { Star, ExternalLink, ShieldCheck, MessageSquarePlus, Check } from 'lucide-react';
import { api } from '../services/api';

interface GoogleReviewsSectionProps {
  reviews: Review[];
  justdialUrl: string;
  googleRating: number;
  googleReviewCount: number;
  onReviewAdded: (newReview: Review) => void;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({
  reviews,
  justdialUrl,
  googleRating,
  googleReviewCount,
  onReviewAdded
}) => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Surat, Gujarat');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [productMentioned, setProductMentioned] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    setSubmitting(true);
    try {
      const created = await api.submitReview({
        author,
        location,
        rating,
        text,
        productMentioned: productMentioned || undefined
      });
      onReviewAdded(created);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowAddReview(false);
        setAuthor('');
        setText('');
        setProductMentioned('');
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-16 bg-[#FAF6EE] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating Trust Hero Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DEC9] shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9] shrink-0">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#1B382B] tabular-nums">
                {googleRating.toFixed(1)}
              </span>
              <div className="flex items-center gap-1 text-[#D4AF37] my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-[#8A7B69]">
                {googleReviewCount} Verified Ratings
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#047857]">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Genuine Customer Satisfaction</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B]">
                Real Google &amp; Surat Customer Reviews
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Read genuine experiences from homeowners who got their customized sofas, recliners, and cushions made in our Dindoli workshop.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={justdialUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#FAF6EE] hover:bg-[#EFE7D7] text-[#1B382B] font-semibold text-xs rounded-lg border border-[#D5C9B3] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>View Business Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setShowAddReview(!showAddReview)}
              className="px-4 py-2.5 bg-[#1B382B] hover:bg-[#142d22] text-[#FDFBF7] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Write a Review Modal / Dropdown */}
        {showAddReview && (
          <div className="mb-10 bg-white p-6 rounded-2xl border border-[#D5C9B3] shadow-md max-w-2xl mx-auto">
            <h3 className="font-serif text-lg font-bold text-[#1B382B] mb-2">
              Share Your Experience with Shree Balaji Sofa
            </h3>
            {!submitted ? (
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B382B] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      placeholder="e.g. Priyank Patel"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#D5C9B3] bg-[#FAF7F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B382B] mb-1">Location in Surat</label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Dindoli, Surat"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#D5C9B3] bg-[#FAF7F0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B382B] mb-1">Star Rating</label>
                    <select
                      value={rating}
                      onChange={e => setRating(parseInt(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#D5C9B3] bg-[#FAF7F0]"
                    >
                      <option value="5">5.0 Stars (Excellent Craftsmanship)</option>
                      <option value="4">4.0 Stars (Very Good Service)</option>
                      <option value="3">3.0 Stars (Average)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B382B] mb-1">Product or Service Made</label>
                    <input
                      type="text"
                      value={productMentioned}
                      onChange={e => setProductMentioned(e.target.value)}
                      placeholder="e.g. 7-Seater L-Shaped Sofa"
                      className="w-full text-xs p-2.5 rounded-lg border border-[#D5C9B3] bg-[#FAF7F0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B382B] mb-1">Your Review *</label>
                  <textarea
                    rows={3}
                    required
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Describe the foam firmness, finishing, and delivery experience..."
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D5C9B3] bg-[#FAF7F0]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    className="px-4 py-2 text-xs font-medium text-[#6B7280] hover:text-[#1B382B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-[#1B382B] text-white font-semibold text-xs rounded-lg hover:bg-[#142d22]"
                  >
                    {submitting ? 'Posting...' : 'Submit Customer Review'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-[#ECFDF5] text-[#065F46] text-xs font-medium text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you! Your feedback has been saved.</span>
              </div>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-[#E5DEC9] p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating Stars & Verification Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {rev.isVerifiedGoogle && (
                    <span className="text-[10px] font-semibold text-[#1B382B] bg-[#FAF6EE] border border-[#E8DFC9] px-2 py-0.5 rounded">
                      Google Review
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>

                {rev.productMentioned && (
                  <div className="text-[11px] text-[#8A7B69]">
                    Service: <strong className="text-[#1B382B]">{rev.productMentioned}</strong>
                  </div>
                )}
              </div>

              {/* Author & Date */}
              <div className="pt-3 border-t border-[#F3EFE6] flex items-center justify-between text-xs text-[#6B7280]">
                <div>
                  <span className="font-bold text-[#1B382B] block">{rev.author}</span>
                  <span className="text-[10px]">{rev.location}</span>
                </div>
                <span className="text-[10px] text-[#9CA3AF]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
