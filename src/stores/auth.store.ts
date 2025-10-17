import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserAuth } from '../interfaces/UserAuth';

type UserAuthState = {
    user: UserAuth | null;
    setUser: (user: UserAuth) => void;
    clearUser: () => void;
    hydrated: boolean;
    setHydrated: (state: boolean) => void;
};

export const useAuthStore = create<UserAuthState>() (

    persist(
        (set) => ({
            user: null,
            hydrated: false,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            setHydrated: (hydrated) => set({ hydrated }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);
