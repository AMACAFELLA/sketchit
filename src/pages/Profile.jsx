import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { playerService } from '../services/dynamodb/playerService';
import { s3Service } from '../services/s3/s3Service';
import GameContainer from '../components/Layout/GameContainer';
import DrawingEditor from '../components/Profile/DrawingEditor';
import ProfilePicture from '../components/Profile/ProfilePicture';
import { useToastContext } from '../context/ToastContext';

const Profile = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.userId) {
        setLoading(false);
        return;
      }

      try {
        const playerData = await playerService.getPlayer(user.userId);
        
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

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleProfilePictureUpdate = async (drawingData) => {
    try {
      const imageKey = await s3Service.uploadProfilePicture(user.userId, drawingData);
      
      const updatedProfile = await playerService.updateCustomization(user.userId, {
        ...profile.customization,
        profilePicture: imageKey
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
    setIsEditorOpen(true);
  };

  if (!user) {
    return (
      <GameContainer>
        <div className="text-center font-sketch text-xl">
          Please sign in to view your profile
        </div>
      </GameContainer>
    );
  }

  if (loading) {
    return (
      <GameContainer>
        <div className="text-center font-sketch text-xl">Loading...</div>
      </GameContainer>
    );
  }

  if (error) {
    return (
      <GameContainer>
        <div className="text-center font-sketch text-xl text-red-500">
          Error: {error}
        </div>
      </GameContainer>
    );
  }

  if (!profile) {
    return (
      <GameContainer>
        <div className="text-center font-sketch text-xl">
          Setting up your profile...
        </div>
      </GameContainer>
    );
  }

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
                <div className="relative mb-4">
                  <ProfilePicture
                    imageKey={profile.customization?.profilePicture}
                    className="w-32 h-32 rounded-full border-2 border-pencil-dark"
                  />
                </div>
                <button
                  onClick={handleDrawClick}
                  className="sketch-button hover:bg-paper/80 active:bg-paper/60 transition-colors cursor-pointer z-10 relative"
                  type="button"
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