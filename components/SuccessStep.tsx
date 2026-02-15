
import React from 'react';
import { UserProfile } from '../types';

interface SuccessStepProps {
  profile: UserProfile;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ profile }) => {
  return (
    <div className="relative flex flex-col items-center justify-between h-full bg-background-light dark:bg-background-dark overflow-hidden p-6 animate-pop-in">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      
      {/* floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[10%] text-primary/20 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>●</div>
        <div className="absolute top-[20%] right-[20%] text-orange-400/30 text-xl animate-float-slow">★</div>
      </div>

      <div className="w-full flex flex-col items-center mt-8 z-10">
        <div className="text-primary flex size-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <span className="material-symbols-outlined filled text-3xl">diversity_1</span>
        </div>
        <h2 className="text-stone-dark dark:text-white text-xl font-bold tracking-tight">HelloAgain!</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="relative w-full max-w-[280px] aspect-[4/5] mb-8 mt-4">
          <div className="absolute inset-0 transform -rotate-6 translate-x-4 translate-y-2 rounded-2xl overflow-hidden shadow-xl opacity-50 bg-stone-300 dark:bg-stone-800">
            <img src="https://picsum.photos/seed/friends2/400/500" className="w-full h-full object-cover" alt="Friends" />
          </div>
          <div className="absolute inset-0 transform rotate-3 rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-white dark:border-zinc-800">
            <img src={profile.avatar} className="w-full h-full object-cover" alt="Profile" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 shadow-sm">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] filled">check</span>
                Ready
              </span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 bg-white text-primary p-3 rounded-full shadow-xl z-20 flex items-center justify-center">
            <span className="material-symbols-outlined filled text-[32px]">check_circle</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-4 w-full text-center">
          <h1 className="text-primary tracking-tight text-[36px] font-extrabold leading-tight drop-shadow-sm">
            Congratulations!
          </h1>
          <p className="text-stone-dark/80 dark:text-white/80 text-base font-medium leading-relaxed px-4">
            You're all set, <span className="text-primary">{profile.firstName}</span>! Your profile is complete and your old friends are waiting to reconnect.
          </p>
        </div>
      </div>

      <div className="w-full z-10 mt-8 mb-4">
        <button className="relative w-full overflow-hidden rounded-xl h-14 bg-primary shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-white text-lg font-bold">
          Connect with lost friends
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
        <p className="mt-4 text-center text-xs font-medium text-gray-400 dark:text-gray-500">
          Join 2M+ people reconnecting today
        </p>
      </div>
    </div>
  );
};

export default SuccessStep;
