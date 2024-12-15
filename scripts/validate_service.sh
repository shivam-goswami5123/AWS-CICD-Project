#!/bin/bash

# Check if application is running on port 3000
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [ "$STATUS" -ne 200 ]; then
  echo "Application is not running or returned status $STATUS"
  exit 1
fi

echo "Application is running successfully!"
exit 0
