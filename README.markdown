# Spectacular CodeTour :tada: ~Spectacle Boilerplate~

![spectacular record](https://cl.ly/0w232v3P4230/download/Screen%20Recording%202017-05-17%20at%2010.50%20AM.gif)

## How to play with it

Run the codetours server on port 3000 _with CORS enabled_.
```
cd codetours
npm start
# meteor server should run on http://localhost:3000
```

Make sure you have `partyparrot/codetours-starter-kit` stored in your CodeTours Meteor app. 

If not:
- Meteor app: add it or add any tour in the Meteor app
- This app: if you've added a different tour, change the props of `CodeTours` in `presentation/index.js`

Run this app
```
npm start
```

:octocat: :eyes:

## Why a separate app?

Spectacle slides doesn't play well with Meteor, the problem seems to come from CSS modules. I tried to add a Meteor build plugin for CSS modules but it didn't work. 

This may be because Spectacle is heavily tied to Webpack? Honestly no idea.

So I've made a separate app: this is going to be WICKED!!! :tada:

## Reference

The Spectacle core API is available at [https://github.com/FormidableLabs/spectacle/blob/master/README.markdown](https://github.com/FormidableLabs/spectacle/blob/master/README.markdown).
