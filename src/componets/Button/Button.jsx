import { BtnLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

const ButtonLoad = ({ onClick }) => (
  <BtnLoadMore
    className="btnLoadMore"
    type="button"
    disabled={false}
    onClick={onClick}
  >
    Load more pictures
  </BtnLoadMore>
);

export default ButtonLoad;

ButtonLoad.propTypes = {
  onClick: PropTypes.func.isRequired,
};
