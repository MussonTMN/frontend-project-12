import AddChannel from './AddChannel';

const modals = {
  add: AddChannel,
  remove: null,
  rename: null,
};

const getModal = (type) => modals[type];

export default getModal;
