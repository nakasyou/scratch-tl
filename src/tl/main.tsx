import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

export default () => {
  const appElement = document.createElement("div")
  document.getElementById("body")?.append(appElement)
  ReactDOM.createRoot(document.body).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}