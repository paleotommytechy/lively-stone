import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../store/useUIStore';

describe('useUIStore Zustand Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useUIStore.setState({
      theme: 'dark',
      toast: null,
      activeQuiz: null,
      activeAssignment: null,
      activeShareCardModal: false,
      isSearchOpen: false,
    });
  });

  it('should initialize with correct default state', () => {
    const state = useUIStore.getState();
    expect(state.theme).toBe('dark');
    expect(state.toast).toBeNull();
    expect(state.activeQuiz).toBeNull();
    expect(state.activeAssignment).toBeNull();
    expect(state.activeShareCardModal).toBe(false);
    expect(state.isSearchOpen).toBe(false);
  });

  it('should toggle theme correctly', () => {
    useUIStore.getState().toggleTheme();
    expect(useUIStore.getState().theme).toBe('light');

    useUIStore.getState().toggleTheme();
    expect(useUIStore.getState().theme).toBe('dark');
  });

  it('should set theme explicitly', () => {
    useUIStore.getState().setTheme('light');
    expect(useUIStore.getState().theme).toBe('light');
  });

  it('should show and hide toast correctly', () => {
    useUIStore.getState().showToast('Test Title', 'Test Message');
    let toast = useUIStore.getState().toast;
    expect(toast).not.toBeNull();
    expect(toast?.title).toBe('Test Title');
    expect(toast?.message).toBe('Test Message');

    useUIStore.getState().hideToast();
    expect(useUIStore.getState().toast).toBeNull();
  });

  it('should manage search modal visibility', () => {
    useUIStore.getState().setSearchOpen(true);
    expect(useUIStore.getState().isSearchOpen).toBe(true);

    useUIStore.getState().setSearchOpen(false);
    expect(useUIStore.getState().isSearchOpen).toBe(false);
  });
});
