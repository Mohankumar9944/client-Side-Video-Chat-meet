import { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {toast} from 'react-hot-toast'
import { completeOnboarding } from '../lib/api';
import {CameraIcon, ShuffleIcon, MapPinIcon, LoaderIcon, ShipWheelIcon } from "lucide-react";
import { LANGUAGES } from '../constants';
import '../styles/OnboardingPage.css';

const OnboardingPage = () => {

  const {authUser} = useAuthUser();
  const queryClient = useQueryClient(); 

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const {mutate: onboardingMutation, isPending}=useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }

  const handleRandomAvatar = () => {
    const idx=Math.floor(Math.random()*100)+1;
    const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random avatar changed successfully");
  }
  return (
    <>
      <div className="onboarding-container">
        <div className="card-body">
          <h1>Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className="onboarding-form">
            <div className="avatar-preview">
              {formState.profilePic ? (
                <img src={formState.profilePic} alt="Avatar" />
              ) : (
                <div className="avatar-placeholder">
                  <CameraIcon />
                </div>
              )}
            </div>

            <button type="button" onClick={handleRandomAvatar}>
              <ShuffleIcon />
              Generate Random Avatar
            </button>

            <div className="form-control">
              <label>
                <span>Full Name:</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                placeholder="Enter your Full name"
              />
            </div>

            <div className="form-control">
              <label>
                <span>Bio:</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                placeholder="Give your details"
              />
            </div>

            <div className="form-control">
              <label>
                <span>Native Language:</span>
              </label>
              <select
                name="nativeLanguage"
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState({ ...formState, nativeLanguage: e.target.value })
                }
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label>
                <span>Learning Language:</span>
              </label>
              <select
                name="learningLanguage"
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    learningLanguage: e.target.value,
                  })
                }
              >
                <option value="">Select your learning language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label>
                <span>Location:</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPinIcon />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  placeholder="City, Country"
                />
              </div>
            </div>

            <button disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <ShipWheelIcon />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default OnboardingPage