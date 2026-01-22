import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type UiState = {
  isMenuOpen: boolean;
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: UiState = {
  isMenuOpen: false,
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const UiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    toggleMenu() {
      patchState(store, { isMenuOpen: !store.isMenuOpen() });
    },
    openMenu() {
      patchState(store, { isMenuOpen: true });
    },
    closeMenu() {
      patchState(store, { isMenuOpen: false });
    },

    setLoading(value: boolean) {
      patchState(store, { isLoading: value });
    },
    setFilter(query: string, order: 'asc' | 'desc') {
      patchState(store, { filter: { query, order } });
    },
  })),
);
