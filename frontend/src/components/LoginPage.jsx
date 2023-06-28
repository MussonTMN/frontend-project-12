import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Row, Col, Container, Card, Button, Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/index.js';
import routes, { getPath } from '../routes.js';
import LoginImage from '../assets/loginImg.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { loginPath } = routes;
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: yup.object({
      username: yup.string().trim().required(t('loginPage.required')),
      password: yup.string().trim().required(t('loginPage.required')),
    }),

    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const response = await axios.post(loginPath(), { username, password });
        if (response.data.token) {
          auth.logIn(response.data);
          setAuthFailed(false);
          navigate(getPath.dataPath());
        }
      } catch (error) {
        formik.setSubmitting(false);
        setAuthFailed(true);
        if (error.isAxiosError && error.response.status === 401) {
          inputRef.current.select();
          return;
        }
        toast.error(t('errors.network'));
        throw error;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [auth.data, navigate]);

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={LoginImage}
                  className="rounded-circle"
                  alt={t('loginPage.login')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    placeholder={t('loginPage.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    placeholder={t('loginPage.password')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{t('loginPage.authFailed')}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={formik.isSubmitting} variant="outline-primary" className="w-100 mb-3">{t('loginPage.login')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.noAccount')}</span>
                {' '}
                <a href={getPath.signupPath()}>{t('loginPage.signup')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
