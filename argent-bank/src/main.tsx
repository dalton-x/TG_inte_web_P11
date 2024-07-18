import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (import.meta.env.VITE_REACT_APP_ENV === 'dev') { 
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  root.render(<App />)
}
