import React, { memo } from 'react';
import { AboutView } from './AboutView';

/**
 * Static Cached Version of AboutView
 * Prevents re-render execution & navigation latency by retaining a memoized static view tree
 */
const StaticAboutView = memo(() => {
  return <AboutView />;
});

StaticAboutView.displayName = 'StaticAboutView';

export const CachedAboutView: React.FC = () => {
  return <StaticAboutView />;
};
