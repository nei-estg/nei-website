import React, { useState, useEffect } from 'react';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  isEnabled as isDarkReaderEnabled,
} from 'darkreader';

const DarkModeSwitch = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    if (darkModeEnabled) {
      disableDarkMode();
      setDarkModeEnabled(false);
    } else {
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
      setDarkModeEnabled(true);
    }
  };

  useEffect(() => {
    // Load dark mode state from local storage
    const savedDarkModeEnabled = localStorage.getItem('darkModeEnabled');
    if (savedDarkModeEnabled) {
      setDarkModeEnabled(JSON.parse(savedDarkModeEnabled));
    } else {
      // Enable Dark Reader with default settings when component mounts
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    }

    // Check if Dark Reader is currently enabled
    const darkReaderEnabled = isDarkReaderEnabled();
    setDarkModeEnabled(darkReaderEnabled);
  }, []);

  useEffect(() => {
    // Save dark mode state to local storage
    localStorage.setItem('darkModeEnabled', JSON.stringify(darkModeEnabled));
  }, [darkModeEnabled]);

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {darkModeEnabled ? <WbSunnyIcon /> : <DarkModeIcon />}
      </button>
    </div>
  );
};

export default DarkModeSwitch;
