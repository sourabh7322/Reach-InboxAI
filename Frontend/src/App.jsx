import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store/store'; // Ensure the import is consistent
import ProtectedRoute from './components/protectedRoute/protectedRoute'; // Rename to PascalCase
import DashBoard from './components/Dashboard/DashBoard';
import Homepage from './components/Homepage/Homepage';
import NavBar from './components/NavBar/NavBar'
import { Auth0Provider } from '@auth0/auth0-react';
import useListener from './components/auth2/useListenerAuth/useListener';

function App() {
   const domain = import.meta.env.VITE_AUTH0_DOMAIN;
   const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
   const redirectUri = import.meta.env.VITE_REDIRECT_URI; // Ensure correct variable name

   return (
      <Auth0Provider
         domain={domain}
         clientId={clientID}
         authorizationParams={{ redirect_uri: redirectUri }} // Confirm if redirect_uri is correct
      >
         <Provider store={store}>
            <AppContent />
         </Provider>
      </Auth0Provider>
   );
}

function AppContent() {
   const auth = useListener();
   const routes = [
      {
         path: "/homepage",
         element: <Homepage />,
      },
      {
         path: "/dashboard",
         element: <ProtectedRoute auth={auth}><DashBoard /></ProtectedRoute>,
      },
   ];
   const elementRoute = useRoutes(routes); // Correctly use `routes`

   return (
      <div >
         <NavBar />
         <div >
            {elementRoute}
         </div>
      </div>
   );
}

export default App;
