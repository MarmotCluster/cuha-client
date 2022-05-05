import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Toast = (props) => {
  const [attempt, setAttempt] = useState(0);
  const [isPlaying, setIsPlaying] = useState(0);

  const { accounts, seto, notifications } = useSelector((state) => ({
    accounts: state.accounts,
    seto: state.seto,
    notifications: state.notifications,
  }));
  // Redux

  useEffect(() => {
    if (attempt > 0) {
      setIsPlaying(1);
    }
    setAttempt((state) => state + 1);
  }, [notifications]);

  return (
    <div
      className={`toast${isPlaying ? ' toast__animation' : ''}`}
      onAnimationEnd={() => {
        console.log('animation ended');
        setIsPlaying(0);
      }}
    >
      <p className="toast-text">{notifications.message}</p>
    </div>
  );
};

export default Toast;
