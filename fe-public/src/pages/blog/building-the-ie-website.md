---
layout: '../../layouts/Blog.astro'
title: Building a website for the Robotics and AI Club
---


Certainly! Below is a customized Markdown template for your team's blog post that covers the different aspects mentioned:

# Unveiling the Secrets Behind [Your Website Name]: Math, Leaderboard Stack, and SEO/UI/UX Insights

## Introduction
- A brief overview of what readers can expect from the blog post.

## The Math Behind the Waves and Word Cloud
### By @i-be-keggles
- Explain the mathematical models or algorithms driving the wave patterns and word cloud on the website.

```code
// Code snippet explaining math algorithms
```

## The Leaderboard Stack

Since we were building this website in anticipation of the [Hacktoberfest](hactoberfest.com) event, we wanted to have a leaderboard to track the contributions of the club members. We decided to use the [GitHub API](https://docs.github.com/en/rest) to fetch the contributions of the club members and display them on the website. Now how do we get the data for _all_ the users? We first tried using a single API key to get all the data but soon got heavily rate limited :upsidedown:. After further consideration we ended up developing a simple GitHub Actions workflow that each member could easily implement. This action fetched their statistics and sent them to our backend server which stores all this in [MongoDB]().

After 3 days of data collection we could dive into how we want to present this data, we first thought of using overall statistics but in the end settled on the following:
+ Contributions over the past 24 hours (commits + PRs)
+ Contributions since the member joined the system (commits + PRs)

We also collect additional data such as followers and similar for further analysis or display.

### In Production Panic :scream:
After about five days in production we noticed something strange. For a lot of the users the metrics (especially commits) were not being displayed properly, which was really strange since we could see all the data coming in from the users. This made us wonder if our feature was really working or what we had seen was just some coincidental success.
This motivated us to dig deeper into the issue, revealing that if a user creates commits on a branch under PR or not, as long as it is not merged into main or the primary branch of the repository, it will not be counted as a contribution to the users profile. This was a major issue since we had a lot of users who were contributing to the club's website and other repositories but their contributions were not being counted.
In the end the only reasonable solution to this bug/(feature?) was to add a disclaimer to the website and make sure all intended commits get merged into the primary branch of the repository.

```code
// Code snippet showing how the leaderboard is implemented
```

## SEO Insights for [Your Website Name]
### By @jose-izarra
- Discuss the SEO strategies deployed to make the website more searchable and efficient.

## UI/UX Design Strategy
### By @haxybaxy
- Share insights on the user interface and user experience design elements of the website.

## Conclusion
- Sum up the key takeaways from each section.
- A call-to-action, encouraging readers to explore the features discussed.

## References
- [External Link 1](https://example.com)
- [External Link 2](https://example.com)

---

_Author(s): @i-be-keggles, @velocitatem, @jose-izarra, @haxybaxy_
_Date: Month, Day, Year_
