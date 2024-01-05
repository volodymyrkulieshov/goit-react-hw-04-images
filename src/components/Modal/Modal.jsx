import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ selectedImage, onClose }) => {
  // console.log(selectedImage);
  useEffect(() => {
    const handleEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlay = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <Overlay onClick={handleOverlay}>
      <ModalWindow>
        <img src={selectedImage} alt="selectedImage" />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;
// ////////////////////////////////////////////
// import { Component } from 'react';
// import { ModalWindow, Overlay } from './Modal.styled';
// class Modal extends Component {
//   componentDidMount = () => {
//     window.addEventListener('keydown', this.handleEsc);
//   };

//   componentWillUnmount = () => {
//     window.removeEventListener('keydown', this.handleEsc);
//   };

//   handleEsc = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleOverlay = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { children } = this.props;

//     return (
//       <Overlay onClick={this.handleOverlay}>
//         <ModalWindow>{children}</ModalWindow>
//       </Overlay>
//     );
//   }
// }

// export default Modal;
