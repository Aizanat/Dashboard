import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AWS from 'aws-sdk'

import { resetConfirmEmailFlag, apiError } from '../../store/actions'

import ParticlesAuth from '../AuthenticationInner/ParticlesAuth'
import logoLight from '../../assets/images/logo-light.png'

function ConfirmSignUp() {
  const [confirmationStatus, setConfirmationStatus] = useState('')

  const history = useNavigate()
  const dispatch = useDispatch()

  const { error, registrationError, success } = useSelector((state) => ({
    registrationError: state.Account.registrationError,
    success: state.Account.success,
    error: state.Account.error,
  }))

  useEffect(() => {
    dispatch(apiError(''))
  }, [dispatch])

  useEffect(() => {
    if (success) {
      history('/login')
    }

    dispatch(resetConfirmEmailFlag())
  }, [dispatch, success, history])

  useEffect(() => {
    const cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' })
    const params = {
      UserPoolId: 'us-east-1_Dw1zhzA7F',
      Username: 'email',
    }

    cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        let emailVerified = false
        data.UserAttributes.forEach(function (attribute) {
          if (
            attribute.Name === 'email_verified' &&
            attribute.Value === 'true'
          ) {
            emailVerified = true
          }
        })
        if (emailVerified) {
          setConfirmationStatus('Email is confirmed.')
        } else {
          setConfirmationStatus('Email is not confirmed.')
        }
      }
    })
  }, [])

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="" height="20" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">Confirmation Page</p>
                  <p className="mt-3 fs-15 fw-medium">
                    Checking email confirmation status...
                  </p>
                  <p className="mt-3 fs-15 fw-medium">{confirmationStatus}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  )
}

export default ConfirmSignUp
