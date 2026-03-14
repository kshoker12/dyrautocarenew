'use client';

import { useMemo, useState } from 'react';
import { extractAverageRating, ratingInteger, safeRating } from '@/lib/helpers';
import { Rating, Typography } from '@material-tailwind/react';

function ensureReviewsArray(reviews) {
  if (reviews == null) return [];
  if (Array.isArray(reviews)) return reviews;
  return [];
}

function isValidThumbnailUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const t = url.trim();
  return t.startsWith('http://') || t.startsWith('https://');
}

function ReviewAvatar({ userthumbnail, username, userlink }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = isValidThumbnailUrl(userthumbnail) && !imgFailed;
  const initial = (username || '?').trim().charAt(0).toUpperCase();

  const wrapperClass = 'h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-200 text-gray-600 font-semibold text-sm cursor-pointer overflow-hidden';
  const handleClick = () => userlink && window.open(userlink);

  if (showImg) {
    return (
      <img
        src={userthumbnail}
        alt=""
        className="h-10 w-10 rounded-full object-cover cursor-pointer"
        onClick={handleClick}
        onError={() => setImgFailed(true)}
      />
    );
  }
  return (
    <div role="img" aria-label={username || 'Reviewer'} className={wrapperClass} onClick={handleClick}>
      {initial}
    </div>
  );
}

export default function Additional({ reviews }) {
  const safeReviews = useMemo(() => ensureReviewsArray(reviews), [reviews]);
  const reviewRatings = useMemo(() => {
    const raw = safeReviews.length > 0 ? extractAverageRating(safeReviews) : 5;
    return safeRating(raw);
  }, [safeReviews]);

  return (
    <section id="contact" className="contact md:px-10 py-10">
      <div className="container p-4" data-aos="fade-up">
        <div className="section-title">
          <p>Reviews</p>
        </div>
        <div className="row">
          <div className="col-lg-6 mt-4 lg:mt-0 mb-4">
            <div className="php-email-form bg-white h-full">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">DYR Autocare</h3>
                <div className="review-write bg-[#0070ba] shadow-xs shadow-gray-600">
                  <a href="https://www.google.com/search?q=dyr+autocare" target="_blank" rel="noreferrer" className="text-white">
                    <label>Write a Review</label>
                    <button type="button" className="fa fa-pencil text-lg text-white ml-1"/>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                <div className="text-2xl">{safeRating(reviewRatings).toFixed(1)}</div>
                <Rating
                  value={ratingInteger(reviewRatings)}
                  readonly
                  ratedIcon={<i className="fa-sharp fa fa-star text-lg text-amber-500" />}
                  unratedIcon={<i className="fas fa-sharp fa-star text-lg text-gray-400" />}
                />
                <Typography color="blue-gray" className="font-medium text-blue-gray-500">
                  {safeReviews.length} Reviews
                </Typography>
              </div>
              <div className="reviews h-[404px] overflow-y-scroll w-full border-t-2 ">
                {safeReviews.map((review, index) => (
                  <div key={review.review_id || index} className="w-full border-b-2 p-2">
                    <div className="flex items-start justify-start space-x-2  w-full">
                      <ReviewAvatar
                        userthumbnail={review.userthumbnail}
                        username={review.username}
                        userlink={review.userlink}
                      />
                      <div className="-space-y-1">
                        <div className="font-bold">{review.username}</div>
                        <div className="text-sm">{review.userreviews > 0 ? review.userreviews + ' reviews' : ''}</div>
                        <div className="flex py-1 items-center space-x-2">
                          <Rating
                            value={ratingInteger(review?.rating)}
                            readOnly
                            ratedIcon={<i className="fa fa-star text-sm text-amber-500" />}
                            unratedIcon={<i className="fa fa-star text-sm text-gray-400" />}
                          />
                          <div className="text-sm">{review.date}</div>
                        </div>
                        <div className="py-3 text-sm">{review.snippet}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-12">
                <div className="info-box bg-white">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <h3>Areas of Service</h3>
                  <div className="loc-container">
                    {['Surrey', 'Delta', 'Langley', 'Maple Ridge', 'Burnaby', 'Coquitlam', 'Richmond', 'Vancouver'].map((loc) => (
                      <div key={loc} className="loc">
                        <p>{loc}</p>
                        <i className="fas fa-check"></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box mt-4 bg-white">
                  <i className="fa fa-envelope"></i>
                  <h3>Email Us</h3>
                  <p>dyrautocare@gmail.com</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box mt-4 bg-white">
                  <i className="fas fa-phone"></i>
                  <h3>Call or Text Us</h3>
                  <p>604-906-5646</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
