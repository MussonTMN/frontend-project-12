import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { getChannels } from '../../slices/selectors.js';

const Channels = () => {
//   const dispatch = useDispatch();
  const channels = useSelector(getChannels);

  console.log(channels);

  return (
    <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button variant="text-primary" className="p-0 btn-group-vertical">
          <PlusSquare color="blue" />
        </Button>
      </div>
    </Col>
  );
};

export default Channels;
