#!/bin/bash

APP_NAME="standard-e.app"
BUILD_PATH="src-tauri/target/release/bundle/macos/$APP_NAME"
DESTINATION="/Applications/$APP_NAME"

echo "Replacing old app at $DESTINATION..."

# Check if running with sudo
if [ "$EUID" -ne 0 ]; then
  echo "Please run this script with sudo to move the app to /Applications"
  exit 1
fi

# Remove the old version if it exists
if [ -d "$DESTINATION" ]; then
  echo "Removing old version..."
  rm -rf "$DESTINATION"
fi

# Move the new one
mv "$BUILD_PATH" "$DESTINATION"

echo "✅ App has been moved to /Applications."
