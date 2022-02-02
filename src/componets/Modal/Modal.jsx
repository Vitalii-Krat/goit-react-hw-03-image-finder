import { Component } from 'react';
import { createPortal } from 'react-dom';
import { OverlayStyle, ModalStyle } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  handlerClickOnOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyDown);
  }
  handlerKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  render() {
    return createPortal(
      <OverlayStyle onClick={this.handlerClickOnOverlay}>
        <ModalStyle>
          <img src={this.props.image} alt={this.props.tags} />
        </ModalStyle>
      </OverlayStyle>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
};
