# Notes
Notes is a hobby project I develop to keep my React knowledge up-to-date as well
as delving in to Redux. I also try to incorporate state-of-the-art (or new)
tooling to get what the fuzz is all about. Basically, this project keeps my
JavaScript in shape when not doing professional development.  I've kept away
from boilerplate generators and instead tried to incorporate different tools and
technologies as the project grows (with varying success 😂).

## Tools used
* [Webpack](https://github.com/webpack/webpack) with HMR for development and building
* [Babel](https://github.com/babel/babel) for next generation JS
* [ESLint](https://github.com/eslint/eslint) with the AirBnB flavour to keep my code clean
* [React](https://github.com/facebook/react) for my containers and components
  * ...and [react-router](https://github.com/ReactTraining/react-router) for route management
* [Redux](https://github.com/reactjs/redux) for state management (with [react-redux](https://github.com/reactjs/react-redux))
* [Aphrodite](https://github.com/Khan/aphrodite) for styling components
* And also out-of-repo tools such as React and Redux DevTools

## Todo

- [ ] Add a real editor (perhaps MediumEditor?)
- [ ] Design components (for real)
- [ ] Persist strategy. I'm thinking of the user connecting to Dropbox/Drive, where the notes would reside in a file (maybe as the serialized JSON that's currently saved in localStorage)
- [ ] Testing
- [ ] Move theme dependencies from dumb components to a provider
- [ ] Separate presentational parts of Notes.js to a dumb component (and use this pattern for all "pages")
- [x] If the note was updated today, show the time of the day in NoteListItem

## Tools/technologies/concepts to check out:
* Rollup
* Offline usage
* Internationalization
* Accessibility

## Check it out

1. Clone the repo
2. Run a `npm install`
3. `npm run dev` to start the Webpack dev server on [http://0.0.0.0:8080](http://0.0.0.0:8080) with HMR enabled or `npm run build` to build the bundle with Webpack.
