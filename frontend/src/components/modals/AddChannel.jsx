import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useApi } from '../../hooks/index.js';
import { getChannels } from '../../slices/selectors.js';
import { actions as modalsActions } from '../../slices/modalsInfo.js';

const AddChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chatApi = useApi();
  const channels = useSelector(getChannels);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modals.limit'))
      .max(20, t('modals.limit'))
      .notOneOf(channels.map((channel) => channel.name), t('modals.uniq'))
      .required(t('modals.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { name } = values;
      chatApi.addChannel(name);
      dispatch(modalsActions.hideModal());
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title className="h-4">{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            ref={inputRef}
            className="mb-2"
            onChange={formik.handleChange}
            id="name"
            name="name"
            value={formik.values.name}
            isInvalid={formik.errors.name}
          />
          <Form.Label htmlFor="name" className="visually-hidden">{t('modals.name')}</Form.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => dispatch(modalsActions.hideModal())}
            >
              {t(t('modals.cancel'))}
            </Button>
            <Button type="submit">{t('modals.send')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
