#!/bin/bash

# Add node and npm to the PATH
export PATH=$PATH:/opt/homebrew/bin

# Change to project directory
cd /Users/justingottlieb/ResyBot

# Get the environment file from the argument, default to .env if not provided
ENV_FILE=${1:-/Users/justingottlieb/ResyBot/.env}

# Log which environment file is being used
echo "Using environment file: $ENV_FILE" >> /Users/justingottlieb/ResyBot/cron.log 2>&1

# Source the environment file
source $ENV_FILE

echo "Environment variables:" >> /Users/justingottlieb/ResyBot/cron.log 2>&1
env >> /Users/justingottlieb/ResyBot/cron.log 2>&1

# Run the npm command with the specified environment file and capture output
/opt/homebrew/bin/npm run start -- --env-file=$ENV_FILE >> /Users/justingottlieb/ResyBot/cron.log 2>&1

# Check the exit status of the npm command
if [ $? -eq 0 ]; then
    echo "Script executed successfully" >> /Users/justingottlieb/ResyBot/cron.log 2>&1
else
    echo "Script execution failed" >> /Users/justingottlieb/ResyBot/cron.log 2>&1
fi
