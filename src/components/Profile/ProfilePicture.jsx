import React, { useState, useEffect } from 'react';
import { s3Service } from '../../services/s3/s3Service';

const ProfilePicture = ({ imageKey, className }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getUrl = async () => {
      if (imageKey) {
        try {
          const url = await s3Service.getSignedUrl(imageKey);
          setImageUrl(url);
        } catch (error) {
          console.error('Error getting signed URL:', error);
        }
      }
    };

    getUrl();
  }, [imageKey]);

  if (!imageKey) {
    return (
      <div className={`bg-paper flex items-center justify-center ${className}`}>
        <span className="font-sketch text-lg text-pencil-dark/50">No Picture</span>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className={`bg-paper flex items-center justify-center ${className}`}>
        <span className="font-sketch text-lg text-pencil-dark/50">Loading...</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="Profile"
      className={className}
    />
  );
};

export default ProfilePicture;
