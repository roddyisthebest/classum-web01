import { Provider } from 'react-redux';
import store from './store';

import { RouterProvider } from 'react-router-dom';
import router from './routers';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
