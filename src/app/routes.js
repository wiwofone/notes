import App from './components/App';
import Notes from './containers/Notes';

export default [
  {
    path: '/(:noteId)',
    component: App,
    indexRoute: {
      component: Notes,
    },
  },
];
