import { ModalWindow, Overlay } from './Modal.styled';
import { Component } from 'react';

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleEsc);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleEsc);
  };

  handleEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;

    return (
      <Overlay onClick={this.handleOverlay}>
        <ModalWindow>{children}</ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
