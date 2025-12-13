import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider, 
} from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries : {     
      refetchOnWindowFocus : false,
      queryFn : async ({querykey}) => {
         const res = await fetch(`/api/${queryKey[0]}`);
        return res.json();
      }
    }
  }
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
    	<QueryClientProvider client={queryClient}>  
    <App /> 
    </QueryClientProvider>    
    </BrowserRouter>
  </StrictMode>,
)
