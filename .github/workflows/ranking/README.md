# Setting Up IE Metrics: Enhance Your GitHub Profile

Easily integrate the IE Metrics GitHub Action to improve your GitHub profile. Just follow these straightforward steps!

---

## Step 1: Create Your Profile README

1. **Go to**: Open GitHub and click on the "Repositories" tab.
2. **Start**: Click the "New" button to create a new repository.
3. **Name it**: Make sure the repository name matches your GitHub username—*case-sensitive!*
4. **Include**: Add a README file while setting up.

🔗 *Further Reading*: [Official GitHub README Guide](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme)

---

## Step 2: Set Up Your GitHub Workflow

1. **Navigate to Actions**: In your new repository, go to the "Actions" tab.
2. **Add**: Click "New workflow."
3. **Edit**: Remove the default content and paste the YAML code snippet below:

```yaml
name: IE Metrics
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
    - name: Run IE Metrics
      uses: velocitatem/OrgGithubMetrics@main
      env:
        github_token: ${{ secrets.GITHUB_TOKEN }}
```

4. **Save**: Commit your changes to activate the workflow.

---

## Step 3: Check the Results—Look Again the Next Day

Your GitHub Action will start according to your YAML schedule. Confirm its activity by visiting the Actions tab. 🎉

---
Feel free to ask if you have any questions!
