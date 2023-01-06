# vue-quiz-app

This is a sample quiz app built using [Vue 3](https://vuejs.org/guide/introduction.html) in [Vite](https://vitejs.dev/guide/).


# Objective

This is purely a coding exercise meant to refresh my knowledge of `Vue`.

From the last time I tried `Vue`, there seems to be significant changes in how things are done that [made some developers upset](https://www.reddit.com/r/vuejs/comments/pmpmot/rant_how_vue_3_drove_me_away/).

Browsing through [my old Vue projects from 2 years ago](https://github.com/supershaneski?tab=repositories&q=vue&type=&language=&sort=), I can hardly recognize the code anyway so it means I can start using `Vue 3` without any restraints.


# Development

I will be using the following modules:

* [Pinia 2](https://pinia.vuejs.org/introduction.html), for global app state management
* [Vue Router 4](https://router.vuejs.org/installation.html), for router

At this point, I have not made my mind yet on how to best implement a quiz app.
Perhaps a simple SPA would suffice and there is no need for a router.
But since this is more of a refresher for `Vue`, using as many standard modules is probably better for practice.


## The App

![Quiz App](./docs/screenshot.png "Quiz App")

> This is a work in progress...

You can edit the questions found in `/assets/questions.json` for your own quiz data.

# Setup

Clone the repository and install the dependencies

```sh
$ git clone https://github.com/supershaneski/vue-quiz-app.git myproject

$ cd myproject

$ npm install

$ npm start
```

Open your browser to `http://localhost:5173/` to load the application page.


# Additional Information

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
