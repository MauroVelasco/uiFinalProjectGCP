#!/bin/bash

# Replace environment variables in Angular's main.js (or similar)
# This is a common approach to inject runtime environment variables into Angular apps
# Make sure your Angular build process creates a placeholder for these variables
# For example, if you have a placeholder like 'window.env.API_URL = "API_URL_PLACEHOLDER";'
# in your main.js, this script can replace "API_URL_PLACEHOLDER" with the actual value
# from the Docker environment variable API_URL.
#if [ -f /usr/share/nginx/html/main.*.js ]; then
#  echo "Replacing environment variables in main.js..."
#  sed -i "s|API_URL_PLACEHOLDER|$API_URL|g" /usr/share/nginx/html/main.*.js
  # Add more replacements as needed for other environment variables
#fi

# Execute the main command (e.g., starting Nginx)
exec "$@"