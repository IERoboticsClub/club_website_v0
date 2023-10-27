---
layout: '../../layouts/Blog.astro'
title: Unveiling the Secrets Behind the IE Robotics and AI Club
---

In this article we will be discussing the various features of the IE Robotics and AI Club website, and how we implemented them. We will be covering the following topics: **The Wave and Word Cloud**, **The Leaderboard Stack**, **SEO Implementation**, and **UI/UX Design Strategy**. We hope you enjoy reading about our website as much as we enjoyed making it!


## The Math Behind the Waves and Word Cloud
### By @i-be-keggles
The matrix-esque random character backgrounds were a theme we wanted to use prevalently throughout the website, and can be seen in the wave function we use as a header, and the word cloud holding the projects. The character animation itself is just a simple random sample uniformly pulled from a predefined list of the basic alphanumeric characters along with some special symbols we thought would look good in the components, but the math behind *where* we render the characters is a little more interesting. The basic method is a specific function for defining target length for a string of characters in the component, and then applying some gaussian distortion to blur the edges and make it a bit more dynamic.

The wave effect was achieved by layering sin waves on top of each other similar to how many water simulations are built. The function is as follows: for each column of characters going down the screen, the length of that string is defined as


$$tl + a \sin\left(\frac{x + d}{t}\right) + \sin\left(\frac{x + d/2}{1.5t}\right) \frac{a}{2} + \sin\left(\frac{x + d/3}{2t}\right) \frac{a}{2}$$


where tl is target length, a is amplitude, p is period, d is offset, and x is the column.
The hardcoded values in the second and third sin functions are to add variation to the layers.
To animate the wave, the offest, d, is increased over time to "scroll" the wave across the screen. For the wave to loop infinitely without needing to worry about errors with large numbers, the offset is also reset when it reaches the period of the entire length function, so that the wave can flow seamlessly and our variables are kept in a manageable range.
Additionally, initial plans for the wave were to use it in multiple places, and the ability to vertically flip the wave was necessary for this dynamic use. To achieve this, we defined the length as $$l - y - tl + a$$ when we wanted to invert the wave, where y is the row.

The word cloud is simpler. It's defined as two grids of characters, one has smaller cells and is used for the background, the other has larger cells and displays the words. The words are randomly positioned via a normal distribution. The function to define the area of the background is a simple eliptical radius, with the distance of the cell from the center (in the background grid) fed into the blur function. Said distance is in the range [0, 1] and calculate  with

$$\sqrt{\frac{(x - \frac{\text{width}}{2})}{\left(\frac{\text{width}}{2}\right)^2} + \frac{(y - \frac{\text{height}}{2})}{\left(\frac{\text{height}}{2}\right)^2}}$$

where x and y is the position of the cell, and the width and height parameters are the target dimensions for the entire word cloud.

And now for the blur, which ties everything together. There are two approaches we tried. One used a gaussian distribution with a mean about the target length to define whether or a character would render depending on how much blur we wanted. The logic is quite simple:

$$\text{if } (1-d) \times \text{gaus} > \text{blur} \text{ then render}$$

where d is the distance from the center in the range [0, 1], and gaus is a random value in the range [0, 1] sampled from a gaussian distribution.
The second method uses a sigmoid function to define the probability of a character spawning relative to a target length, defined as

$$p = \frac{1}{1 + e^{f \cdot l}}$$

where l is length and f is falloff.
Both methods look great, and are currently used in the website. The gaussian blur is applied to the wave function, and the sigmoid is used by the wave.
For exact replication the current values we're using for these functions are `blur = 0.15` and `f=2`, for the cloud and wave respectively.

## The Leaderboard Stack

### by @velocitatem

Since we were building this [website](https://www.google.com/search?q=ieroboticsclub.com) in anticipation of the [Hacktoberfest](https://hactoberfest.com) event, we wanted to have a leaderboard to track the contributions of the club members. We decided to use the [GitHub API](https://docs.github.com/en/rest) to fetch the contributions of the club members and display them on the website. Now how do we get the data for _all_ the users? We first tried using a single API key to get all the data but soon got heavily rate limited :upsidedown:. After further consideration we ended up developing a simple GitHub Actions workflow that each member could easily implement. This action fetched their statistics and sent them to our backend server which stores all this in [MongoDB](https://www.mongodb.com/).

After 3 days of data collection we could dive into how we want to present this data, we first thought of using overall statistics but in the end settled on the following:
* Contributions over the past 24 hours (commits + PRs)
* Contributions since the member joined the system (commits + PRs)

We also collect additional data such as followers and similar for further analysis or display.

### In Production Panic 😱
After launching our new feature, we noticed discrepancies in user metrics, particularly with commits. Despite data coming in, many users weren't seeing their contributions displayed correctly. Upon investigation, we discovered that commits made on branches, whether under a PR or not, weren't counted unless merged into the main or primary branch. This was problematic as many users' contributions to the club's website and other repositories weren't being acknowledged. We resolved the issue by adding a disclaimer to the website and ensuring that all intended commits are merged into the primary branch.

```json
// Sample of the data we collect
{
  "username": "velocitatem",
  "date": "2023-09-29T10:59:55.624Z",
  "commits": 1580,
  "pull_requests": 187,
  "user": {
    "followers": 15,
    "following": 67,
    "public_repos": 129,
    "public_gists": 21,
    "id": 60182044
  },
  "stars": 64,
  "cc": 75
}
```

## SEO Implementation
### By @haxybaxy
Implementing search engine optimization was made much easier thanks to Astro. I was able to use [this component](https://github.com/jonasmerlin/astro-seo) to let search engines index and follow links on our wesbite, as well as the photos (uploaded on imgur) and text for OpenGraph and Twitter.

## UI/UX Design Strategy
### By @jose-izarra

When developing the UI/UX design of our page, we wanted the user experience to feel as unique as possible. We touched in our strengths as a robotics club, leaning into a very techie design with interesting, engaging features. Additions such as the github leaderboard, our (literal) burger in the top left, the ever-changing wave background, and our amazing dark mode feature (highly reccomended). Our website is a demonstration of all of our personalities shining through to create this beautiful project.

## Conclusion
We hope you enjoyed reading about our website as much as we enjoyed making it! If you have any questions, feel free to reach out to us on [Twitter](https://twitter.com/ieroboticsclub). We'd love to hear from you!



---


_Author(s): [@i-be-keggles](https://github.com/i-be-keggles), [@velocitatem](https://github.com/velocitatem), [@jose-izarra](https://github.com/jose-izarra), [@haxybaxy](https://github.com/haxybaxy)_

<style>
.katex {
display: flex;
align-items: center;
text-align: center;
}

</style>
