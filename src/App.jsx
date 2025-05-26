import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginPage from './pages/login/'
import Home from './pages/home'

export default function App() {
  const navigate = useNavigate()
  const [tokenExists, setTokenExists] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      setTokenExists(true)
    }
  }, [navigate])

  return tokenExists ? <Home /> : <LoginPage />
}
