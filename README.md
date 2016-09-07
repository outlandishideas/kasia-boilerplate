<p><h1 align="center">kasia-boilerplate</h1></p>

<p align="center">
    A universal application boilerplate with 
    <a href="https://github.com/outlandishideas/kasia">
        Kasia
    </a>
</p>

<p align="center">Made with ❤ at <a href="http://www.twitter.com/outlandish">@outlandish</a></p>

<p align="center">
    <a href="http://badge.fury.io/js/kasia-boilerplate"><img alt="npm version" src="https://badge.fury.io/js/kasia-boilerplate.svg" /></a>
    <a href="http://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" /></a>
</p>

<hr/>

An easy way to start building universal/isomorphic JavaScript applications that talk to a WordPress backend. Right on!

## What's inside?

We used the [`react-redux-universal-hot-example`](https://github.com/erikras/react-redux-universal-hot-example) 
boilerplate as our starting point, however lots has changed since then and the two are now quite different. 
Thanks go to the creator and maintainers of the aforementioned repo.

```js
// Tools/libraries/features
Express, stage-0 ES2015, React, React Router, Redux, Kasia, 
Redux Sagas, Redux Dev Tools, SCSS, Webpack, Hot Reloading
```

## Getting Started

### Set up WordPress

We aim to release an Ansible script which will do all of this for you, but for now...

- Install wordpress at `localhost/wordpress` (or somewhere else; change accordingly in `src/config.js`)
- Install and enable these plugins: [`WP API REST JSON API v2`](https://en-gb.wordpress.org/plugins/rest-api/), [`WP API MENUS`](https://en-gb.wordpress.org/plugins/wp-api-menus/)
- Create two pages with slugs `homepage` and `posts`
- Create a menu (Appearance > Menus) called `'primary'` containing the two pages you just created
- Create some Posts

### Get the application

- Clone this repo: `git clone <url> wp-app`
- Change into it: `cd wp-app`
- Install dependencies: `npm install`
- Configure the application in `src/config.js`

### Start the app

As a developer:

- `npm run dev`

By default the web server is at localhost:3000

<p>______</p>

In production:

- `npm run build`
- `npm start`

By default the web server is at localhost:8080

## Contributing

All pull requests and issues welcome!

- When submitting an issue please provide adequate steps to reproduce the problem.
- PRs must be made using the `standard` code style.

If you're not sure how to contribute, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

## Author & License

`kasia-boilerplate` was created by [Outlandish](https://twitter.com/outlandish) and is released under the MIT license.
