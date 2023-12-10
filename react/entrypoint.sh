#!/bin/bash

# Change Ownership of the App Directory
chown -R nonroot:nonroot /app

# Install Requirements
npm install

# Run Vite
npm run dev
