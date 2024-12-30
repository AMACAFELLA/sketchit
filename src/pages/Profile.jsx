import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { playerService } from '../services/dynamodb/playerService';
import { s3Service } from '../services/s3/s3Service';
import GameContainer from '../components/Layout/GameContainer';
import DrawingEditor from '../components/Profile/DrawingEditor';
import { useToastContext } from '../context/ToastContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.userId) {
        console.log('No user ID available');
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching profile for user:', user.userId);
        const playerData = await playerService.getPlayer(user.userId);
        console.log('Fetched profile:', playerData);
        
        if (!playerData) {
          const newProfile = await playerService.createPlayer(user.userId, user.username);
          setProfile(newProfile);
        } else {
          setProfile(playerData);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfilePictureUpdate = async (drawingData) => {
    try {
      // Upload the profile picture to S3
      const imageKey = await s3Service.uploadProfilePicture(user.userId, drawingData);
      
      // Get the signed URL for the uploaded image
      const imageUrl = await s3Service.getSignedUrl(imageKey);
      
      // Update the player's profile with the new profile picture URL
      const updatedProfile = await playerService.updateCustomization(user.userId, {
        ...profile.customization,
        profilePicture: imageUrl
      });
      
      setProfile(updatedProfile);
      showToast('Profile picture updated successfully!', 'success');
      setIsEditorOpen(false);
    } catch (error) {
      console.error('Failed to update profile picture:', error);
      showToast('Failed to update profile picture', 'error');
    }
  };

  const handleDrawClick = () => {
    console.log('Draw button clicked');
    setIsEditorOpen(true);
  };

  if (loading) return <div className="text-center font-sketch text-xl">Loading...</div>;
  if (error) return <div className="text-center font-sketch text-xl text-red-500">Error: {error}</div>;
  if (!profile) return <div className="text-center font-sketch text-xl">No profile data available</div>;

  return (
    <GameContainer>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-sketch text-4xl text-pencil-dark mb-4">Profile</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sketch-card"
          >
            <h2 className="font-sketch text-2xl text-pencil-dark mb-4">Stats</h2>
            <div className="space-y-2">
              <p className="font-sketch text-lg">
                Games Played: {profile.stats?.gamesPlayed || 0}
              </p>
              <p className="font-sketch text-lg">
                High Score: {profile.stats?.highScore || 0}
              </p>
              <p className="font-sketch text-lg">
                Total Score: {profile.stats?.totalScore || 0}
              </p>
              <p className="font-sketch text-lg">
                Correct Drawings: {profile.stats?.correctDrawings || 0}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sketch-card"
          >
            <h2 className="font-sketch text-2xl text-pencil-dark mb-4">
              Customization
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                {profile.customization?.profilePicture ? (
                  <div className="relative mb-4">
                    <img
                      src={profile.customization.profilePicture}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-2 border-pencil-dark"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full border-2 border-pencil-dark bg-paper mb-4 flex items-center justify-center">
                    <span className="font-sketch text-lg text-pencil-dark/50">No Picture</span>
                  </div>
                )}
                <button
                  onClick={handleDrawClick}
                  className="sketch-button hover:bg-paper/80 active:bg-paper/60 transition-colors"
                >
                  {profile.customization?.profilePicture ? 'Draw New Picture' : 'Draw Picture'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {isEditorOpen && (
          <DrawingEditor
            onSave={handleProfilePictureUpdate}
            onClose={() => setIsEditorOpen(false)}
          />
        )}
      </div>
    </GameContainer>
  );
};

export default Profile;