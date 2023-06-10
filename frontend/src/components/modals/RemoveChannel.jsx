import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks/index.js';
import { getSelectedId } from '../../slices/selectors.js';
import { actions as modalsActions } from '../../slices/modalsInfo.js';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const chatApi = useApi();
  const selectedId = useSelector(getSelectedId);

  const handleRemove = (channelId) => {
    chatApi.removeChannel(channelId);
    dispatch(modalsActions.hideModal());
    toast.success(t('modals.removeSuccess'));
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(modalsActions.hideModal())}>
        <Modal.Title className="h-4">{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => dispatch(modalsActions.hideModal())}
          >
            {t(t('modals.cancel'))}
          </Button>
          <Button
            variant="danger"
            type="submit"
            onClick={() => handleRemove(selectedId)}
          >
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
