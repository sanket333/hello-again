import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC = () => {
    const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (e: any) {
            setError(e.message ?? 'Google sign-in failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
        } catch (e: any) {
            // Make Firebase error messages more human-friendly
            const msg: Record<string, string> = {
                'auth/invalid-credential': 'Incorrect email or password.',
                'auth/email-already-in-use': 'An account with this email already exists.',
                'auth/weak-password': 'Password must be at least 6 characters.',
                'auth/invalid-email': 'Please enter a valid email address.',
                'auth/user-not-found': 'No account found with this email.',
                'auth/too-many-requests': 'Too many attempts. Please try again later.',
            };
            setError(msg[e.code] ?? e.message ?? 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-stone-100 dark:bg-zinc-900">
            <div className="relative flex flex-col w-full max-w-md bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden min-h-screen sm:min-h-0 sm:h-[844px] sm:my-8 sm:rounded-2xl">

                {/* Header */}
                <div className="flex flex-col items-center pt-20 pb-8 px-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 mb-5">
                        <span className="material-symbols-outlined text-white text-3xl">favorite</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-stone-dark dark:text-white">
                        HelloAgain<span className="text-primary">!</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base mt-2 leading-relaxed max-w-[260px]">
                        Reconnect with the people who shaped you.
                    </p>
                </div>

                <div className="flex-1 flex flex-col justify-center px-6 pb-10 gap-4">

                    {/* Google Sign-In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 rounded-xl border border-stone-light dark:border-stone-700 bg-white dark:bg-surface-dark py-4 px-6 text-base font-semibold text-stone-dark dark:text-white shadow-sm hover:bg-stone-50 dark:hover:bg-stone-700 transition-all active:scale-[0.98] disabled:opacity-60"
                    >
                        {/* Google Logo SVG */}
                        <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-stone-light dark:bg-stone-700" />
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">or</span>
                        <div className="flex-1 h-px bg-stone-light dark:bg-stone-700" />
                    </div>

                    {/* Email / Password Form */}
                    <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl bg-stone-100 dark:bg-surface-dark border border-stone-light dark:border-stone-700 p-4 text-base text-stone-dark dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full rounded-xl bg-stone-100 dark:bg-surface-dark border border-stone-light dark:border-stone-700 p-4 text-base text-stone-dark dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        />

                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 px-6 text-white text-base font-bold shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60 mt-1"
                        >
                            {loading ? (
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                            ) : (
                                isSignUp ? 'Create Account' : 'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Toggle Sign In / Sign Up */}
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            type="button"
                            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                            className="text-primary font-semibold hover:underline"
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
