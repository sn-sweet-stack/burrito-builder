import { FC, useState } from 'react';
import { StartTracking } from '../components/start-tracking.component';
import { useIsAuth } from '../hooks/useIsAuth';

export const TrackingPage: FC = () => {
  const { user } = useIsAuth();
  console.log(user);
  return (
    <div>
      <StartTracking />
    </div>
  );
};
