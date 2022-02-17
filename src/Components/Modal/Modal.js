import s from "./Modal.module.css";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Component } from "react";
const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  state = {
    link: {},
  };
  componentDidMount() {
    const link = this.props.image.find((value) => value.id === this.props.id);
    this.setState({ link: link });

    window.addEventListener("keydown", this.handleModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleModal);
  }

  handleModal = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { link } = this.state;
    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <img className={s.img} src={link.largeImageURL} alt={link.tags} />
      </div>,
      modalRoot
    );
  }
}

Modal.proptTypes = {
  link: PropTypes.object,
};
