![Preview](./preview.png)

## Steps for Contributing ✨

### 1. Fork the Repository 🍴
Start by creating a fork of the main repository to your GitHub account.

### 2. Clone Locally 💻
Clone your forked repository onto your local machine.

### 3. Create a New Branch 🌿
Name the new branch in this format: `{username}-{feature}`. Alternatively, you can connect it to an existing issue.

### 4. Implement Changes ✏️
Make your changes and commit them to your new branch.

### 5. Create a Pull Request (PR) ➡️
Submit a pull request to the main repository from your branch.

### 6. Review & Merge ✔️
Wait for your PR to be reviewed and hopefully merged into the main codebase.

![Workflow Visual Guide](https://drive.google.com/uc?id=1Nk8Nc76M-5-B_JGLm82wBWe3wHhWbes4)



## Resources 📚

### Git & GitHub
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Guides](https://guides.github.com/)
- [GitHub Learning Lab](https://lab.github.com/)
- [GitHub Desktop](https://desktop.github.com/)
- [GitKraken](https://www.gitkraken.com/)

### Javascript
- [JavaScript Cheat Sheet](https://websitesetup.org/javascript-cheat-sheet/)
- [JavaScript.info](https://javascript.info/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [FreeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/)
- [W3Schools](https://www.w3schools.com/js/default.asp)


## Development Setup

Mostly you need to [modify your environment variables](https://www.phind.com/search?cache=ni84tgt3sykafm7y3vwidjlm).

```
cd backend
```

Open your favorite text editor and create a new file `.env`, then set the two required variables `MONGO_URL` and `MONGO_DB_NAME`. You will also need to setup mongodb locally, you can do this by installing it and then running `mongod`.

```
npm i
npm run dev
```

Now the backend should be running locally. In a new terminal:

```
cd fe-public
```

Open your favorite text editor (vim) and add to `.env`:

```
BACKEND_URL=http://localhost:3000
```

then run:

```
npm i
npm run dev
```


## Contributors 🤝

![Contributors](https://contrib.rocks/image?repo=IERoboticsClub/club-website)
