#!/bin/bash

# --- Prerequisites Check ---

echo "--- Checking Prerequisites ---"

# Check if GitHub CLI (gh) is installed
if ! command -v gh &> /dev/null
then
    echo "Error: GitHub CLI (gh) could not be found."
    echo "Please install it from https://cli.github.com/ and authenticate with 'gh auth login' to proceed."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "Error: npm could not be found."
    echo "Please install Node.js and npm from https://nodejs.org/ to proceed."
    exit 1
fi

# Check if git is installed
if ! command -v git &> /dev/null
then
    echo "Error: Git could not be found."
    echo "Please install Git (e.g., 'brew install git' on macOS or 'sudo apt install git' on Debian/Ubuntu) to proceed."
    exit 1
fi

echo "All prerequisites found."

# --- Get Pull Request Information ---

echo ""
echo "--- Getting Pull Request Information ---"

# Ask for the pull request number
read -p "Enter the pull request number: " PR_NUMBER
echo "You entered PR #$PR_NUMBER."

# Get the branch name using gh CLI
echo "Attempting to fetch branch name for PR #$PR_NUMBER..."
# Make sure to run gh pr view from within *any* local git repo that has the remote configured for the target repo
# or directly specify the repo: gh pr view <PR_NUMBER> -R pauldatta/booth-ideas-sg ...
# For this script, we assume `gh` can infer it or we specify the full repo later.
# Let's add -R for robustness, though it's typically optional if you're in the right repo.
REPO_OWNER="pauldatta"
REPO_NAME="booth-ideas-sg"
BRANCH_NAME=$(gh pr view "$PR_NUMBER" -R "$REPO_OWNER/$REPO_NAME" --json headRefName -q .headRefName 2>/dev/null)

if [ -z "$BRANCH_NAME" ]; then
    echo "Error: Failed to get branch name for PR #$PR_NUMBER from $REPO_OWNER/$REPO_NAME."
    echo "Please ensure the PR number is correct, the PR exists in the specified repository, and you are authenticated with GitHub CLI."
    exit 1
fi
echo "Successfully retrieved branch name: '$BRANCH_NAME'."

# --- Setup Directories ---

echo ""
echo "--- Setting Up Directories ---"

# Define the base directory and the application directory name
AI_ASIA_DIR="$HOME/booth-ideas-sg"
NEW_APP_ROOT_DIR="$AI_ASIA_DIR/$BRANCH_NAME" # New directory based on branch name
APP_SUB_DIR="${BRANCH_NAME}-app" # The subdirectory within the cloned repo where package.json lives

# Navigate to the AI Asia directory
echo "Navigating to '$AI_ASIA_DIR'..."
if [ ! -d "$AI_ASIA_DIR" ]; then
    echo "Error: Directory '$AI_ASIA_DIR' does not exist."
    echo "Please create this directory in your home folder (e.g., '~/$AI_ASIA_DIR') and run the script again."
    exit 1
fi
cd "$AI_ASIA_DIR" || { echo "Failed to change directory to '$AI_ASIA_DIR'."; exit 1; }
echo "Currently in: $(pwd)"

# Create a new directory for the app based on branch name
echo "Checking for existing directory '$NEW_APP_ROOT_DIR'..."
if [ -d "$NEW_APP_ROOT_DIR" ]; then
    read -p "Directory '$NEW_APP_ROOT_DIR' already exists. Do you want to remove its contents to ensure a clean setup? (y/N): " confirm_delete
    if [[ "$confirm_delete" =~ ^[Yy]$ ]]; then
        echo "Removing existing contents of '$NEW_APP_ROOT_DIR'..."
        # Remove all contents but not the directory itself
        find "$NEW_APP_ROOT_DIR" -mindepth 1 -delete || { echo "Failed to clean directory contents. Please clean manually and retry."; exit 1; }
        echo "Contents removed."
    else
        echo "Aborting script. Please clean '$NEW_APP_ROOT_DIR' manually or choose 'y' to proceed with deletion."
        exit 1
    fi
fi

echo "Creating directory '$NEW_APP_ROOT_DIR'..."
mkdir -p "$NEW_APP_ROOT_DIR" || { echo "Failed to create directory '$NEW_APP_ROOT_DIR'."; exit 1; }
echo "Directory created."

# cd into the newly created branch directory
echo "Navigating into '$NEW_APP_ROOT_DIR'..."
cd "$NEW_APP_ROOT_DIR" || { echo "Failed to change directory to '$NEW_APP_ROOT_DIR'."; exit 1; }
echo "Currently in: $(pwd)"

# --- Git Operations ---

echo ""
echo "--- Initializing Git Repository and Fetching Branches ---"

# Initialize a new Git repository
echo "Initializing a new Git repository in $(pwd)..."
git init || { echo "Error: Failed to initialize Git repository."; exit 1; }
echo "Git repository initialized."

# Add the remote origin
REPO_FULL_URL="https://github.com/$REPO_OWNER/$REPO_NAME.git"
echo "Adding remote origin '$REPO_FULL_URL'..."
git remote add origin "$REPO_FULL_URL" || { echo "Error: Failed to add remote origin. It might already exist or there's a connectivity issue."; } # Don't exit on this, as it might already be set

# Fetch all branches from the remote
echo "Fetching all branches from remote 'origin'..."
git fetch origin || { echo "Error: Failed to fetch from remote 'origin'. Please check your network connection and repository URL."; exit 1; }
echo "All branches fetched."

# Switch to the branch of that name
echo "Switching to branch '$BRANCH_NAME'..."
# Use git checkout -t origin/<branch_name> to create a local branch that tracks the remote one
git checkout -t "origin/$BRANCH_NAME" || {
    echo "Error: Failed to checkout branch '$BRANCH_NAME'."
    echo "This might happen if the branch was not found remotely, or a local branch with the same name exists."
    echo "Attempting a simple checkout without tracking..."
    git checkout "$BRANCH_NAME" || {
        echo "Critical Error: Could not checkout branch '$BRANCH_NAME'. Please check the branch name and Git setup manually."
        exit 1
    }
}
echo "Switched to branch '$BRANCH_NAME'."

# --- Application Setup ---

echo ""
echo "--- Preparing Application ---"

# cd into the application root folder (assuming it's a subdirectory named 'tool-tracker-app' within the cloned repo)
echo "Navigating into the application root folder: '$APP_SUB_DIR'..."
if [ ! -d "$APP_SUB_DIR" ]; then
    echo "Error: The application root folder '$APP_SUB_DIR' was not found inside the cloned repository."
    echo "Please verify the structure of the '$REPO_NAME' repository."
    exit 1
fi
cd "$APP_SUB_DIR" || { echo "Failed to change directory to '$APP_SUB_DIR'."; exit 1; }
echo "Currently in: $(pwd)"

# Install dependencies
echo "Installing npm dependencies (this might take a while)..."
npm install || { echo "Error: Failed to install npm dependencies. Please check your network connection, npm setup, or package.json."; }
echo "NPM dependencies installed (or attempted)."

# Run the development server
echo "Starting development server..."
npm run dev || { echo "Error: Failed to start the development server. Please check your application's 'npm run dev' script or the application code itself."; }

echo ""
echo "Script finished. The development server should now be running (or attempted to start)."
