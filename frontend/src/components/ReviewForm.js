import React, { useState } from 'react';
import LocationDropdown from './LocationDropdown';

const ReviewForm = () => {
    const [review, setReview] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('review', review);
        formData.append('profilePicture', profilePicture);
        // Add location data if needed
        // formData.append('location', location);

        try {
            const response = await fetch('http://localhost:5000/submit-review', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Review submitted successfully');
            } else {
                console.error('Error submitting review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here"
                required
            />
            <input
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                accept="image/*"
                required
            />
            <LocationDropdown />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
