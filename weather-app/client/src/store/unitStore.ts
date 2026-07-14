import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UNIT_KEY } from '../utils/constants';

export type TempUnit = 'C' | 'F';

interface UnitStore {
  unit: TempUnit;
  toggleUnit: () => void;
  setUnit: (u: TempUnit) => void;
}

export const useUnitStore = create<UnitStore>()(
  persist(
    (set) => ({
      unit: 'C',
      toggleUnit: () => set((s) => ({ unit: s.unit === 'C' ? 'F' : 'C' })),
      setUnit: (unit) => set({ unit }),
    }),
    { name: UNIT_KEY }
  )
);
