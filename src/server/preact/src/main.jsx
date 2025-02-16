import "preact/debug";
import { render } from 'preact'
import { Router, Route } from 'preact-router';

// Pages
import Library from '@/pages/Library';
import Extensions from '@/pages/Extensions';
import ExtensionsBooks from '@/pages/Extensions/Books';

import Settings from '@/pages/Settings';
import Chapters from '@/pages/Book';

import './theme.css';

function App() {
  return (
    <Router>
      <Route path="/" component={Library} />

      <Route path="/extensions" component={Extensions} />
      <Route path="/extensions/:extensionId" component={ExtensionsBooks} />

      <Route path="/settings" component={Settings} />

      <Route path="/book/:extensionId/:bookId/:pageTab*" component={Chapters} />
    </Router>
  );
}

render(<App />, document.getElementById('app'))
