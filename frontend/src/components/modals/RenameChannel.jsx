import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks/index.js';
import { getChannels, getSelectedId } from '../../slices/selectors.js';
import { actions as modalsActions } from '../../slices/modalsInfo.js';

const filter = require('leo-profanity');

filter.add(filter.getDictionary('ru'));

const RenameChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chatApi = useApi();
  const channels = useSelector(getChannels);
  const inputRef = useRef();
  const selectedId = useSelector(getSelectedId);
  const selectedChannel = channels.find((channel) => channel.id === selectedId);

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
      name: selectedChannel.name,
    },
    validationSchema,
    onSubmit: (values) => {
      const { name } = values;

      chatApi.addChannel(name);
      chatApi.renameChannel({ id: selectedId, name });
      dispatch(modalsActions.hideModal());
      toast.success(t('modals.renameSuccess'));
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title className="h-4">{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            ref={inputRef}
            className="mb-2"
            onChange={formik.handleChange}
            id="name"
            name="name"
            value={filter.clean(formik.values.name)}
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

export default RenameChannel;