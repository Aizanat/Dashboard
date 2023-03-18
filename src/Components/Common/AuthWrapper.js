import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const withAuth = (WrappedComponent) => {
  const HOC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const history = useNavigate()

    useEffect(() => {
      async function checkAuth() {
        try {
          const user = await Auth.currentAuthenticatedUser()
          setIsAuthenticated(true)
        } catch (err) {
          history('/login')
        }
      }
      checkAuth()
    }, [history])

    return isAuthenticated ? <WrappedComponent /> : null
  }
  return HOC
}

export default withAuth
