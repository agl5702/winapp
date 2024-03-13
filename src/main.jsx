import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {Auth0Provider} from '@auth0/auth0-react'
import App from './App.jsx'

const domain= 'dev-0vg84dhyvwltjrjg.us.auth0.com'
const clientId='fSk88twHgCYtGmcsGEFSNdxhpWKq5uxW'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri:window.location.origin}}>
      <App />
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>,
)
