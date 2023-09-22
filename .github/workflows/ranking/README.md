# IE Rank Setup Guide

This guide will help you set up the IE Rank GitHub Action in your GitHub profile.

## Step 1: Create a Profile README

1. Go to GitHub and navigate to the "Repositories" tab.
2. Click on the "New" button to create a new repository.
3. Name the repository exactly as your GitHub username (this is case-sensitive).
4. Initialize the repository with a README file.
5. More info can be found [here](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme).

## Step 2: Create a GitHub Workflow

1. In your new repository, navigate to the "Actions" tab.
2. Click on "New workflow."
3. In the setup screen, delete any pre-filled content and paste the following code snippet:

```yaml
name: IE Rank
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 0 * * *'
jobs:
  your_job_name:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2
    - name: Run OrgGithubRanking Action
      uses: velocitatem/OrgGithubRanking@main
      env:
        github_token: ${{ secrets.GITHUB_TOKEN }}
```

4. Save and commit your changes.

## Step 3: Check Back Next Day

The GitHub Action should run according to the schedule you set in the YAML file. You can check the Actions tab to see if it executed successfully.
