import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Preview from './Preview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: 'preview',
    element: <Preview></Preview>,
  },
]);

export default router;
