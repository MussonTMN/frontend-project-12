import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

const getModal = (type) => modals[type];

export default getModal;
