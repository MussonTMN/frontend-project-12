import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Row, Col, Container, Card, Button, Form,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import signupImage from '../assets/signupImg.jpg';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { signupPath } = routes;
  const inputRef = useRef();
  const [signupFailed, setSignupFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: yup.object({
      username: yup.string().min(3, t('modals.limit')).max(20, t('modals.limit')).required(t('loginPage.required')),
      password: yup.string().min(6, t('signupPage.limit')).required(t('loginPage.required')),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('signupPage.match')).required(t('loginPage.required')),
    }),

    onSubmit: async (values) => {
      const { username, password } = values;
      setSignupFailed(false);
      try {
        const response = await axios.post(signupPath(), { username, password });
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        console.error(error);
        setSignupFailed(true);
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 409) {
          setSignupFailed(true);
          inputRef.current.select();
          toast.error(t('errors.network'));
          return;
        }
        toast.error(t('errors.unknown'));
        throw error;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={signupImage}
                  className="rounded-circle"
                  alt={t('signupPage.signup')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-3">{t('loginPage.signup')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    placeholder={t('signupPage.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={(formik.errors.username && formik.touched.username) || signupFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                  <Form.Label htmlFor="username">{t('signupPage.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    placeholder={t('signupPage.password')}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    isInvalid={(formik.errors.password && formik.touched.password) || signupFailed}
                    required
                    ref={inputRef}
                    aria-describedby="passwordHelpBlock"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('signupPage.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    placeholder={t('signupPage.confirmPassword')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || signupFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('signupPage.confirmPassword')}</Form.Label>
                </Form.Group>
                <Button type="submit" disabled={formik.isSubmitting} variant="outline-primary" className="w-100 mb-3">{t('signupPage.signup')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
