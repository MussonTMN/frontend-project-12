import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Button, Nav, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { getChannels, getCurrentChannelId } from '../../slices/selectors.js';
import { actions as channelsActions } from '../../slices/channelsInfo.js';
import { actions as modalsActions } from '../../slices/modalsInfo.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentId = useSelector(getCurrentChannelId);

  const renderChannels = () => (
    <Nav id="channels-box" as="ul" fill variant="pills" className="flex-column px-2 mb-2 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <Nav.Item as="li" key={channel.id} className="w-100">
          {channel.removable ? (
            <Dropdown as={ButtonGroup} className="w-100">
              <Button
                variant={channel.id === currentId ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => dispatch(channelsActions.setCurrentChannel(channel.id))}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown.Toggle
                split
                variant={channel.id === currentId ? 'secondary' : 'light'}
                className="flex-grow-0 text-end"
              >
                <span className="visually-hidden">{t('chat.channelControl')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => dispatch(modalsActions.showModal({ type: 'remove', selectedId: channel.id }))}
                >
                  {t('chat.delete')}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => dispatch(modalsActions.showModal({ type: 'rename', selectedId: channel.id }))}
                >
                  {t('chat.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              variant={channel.id === currentId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start text-truncate"
              onClick={() => dispatch(channelsActions.setCurrentChannel(channel.id))}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          )}
        </Nav.Item>
      ))}
    </Nav>
  );

  return (
    <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          variant="text-primary"
          className="p-0 btn-group-vertical"
          onClick={() => dispatch(modalsActions.showModal({ type: 'add' }))}
        >
          <PlusSquare
            size={20}
            color="royalBlue"
          />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      {renderChannels()}
    </Col>
  );
};

export default Channels;
