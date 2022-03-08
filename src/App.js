import s from "./App.module.css";
import PropTypes from "prop-types";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from "react";
import Searchbar from "./Components/Searchbar/Searchbar";
import LoadMore from "../src/Components/Button/Button";
import Modal from "../src/Components/Modal/Modal";
import imgNotCorrectly from "../src/images/Упс.jpeg";
import { ThreeDots } from "react-loader-spinner";
import fetchApi from "../src/Components/serviseApi.js/fecthApi";
import ImageGalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";

class App extends Component {
  state = {
    imgName: "",
    status: "idle",
    showModal: false,
    imageName: [],
    idImage: 0,
    name: "",
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imgName;
    const nextName = this.state.imgName;
    if (prevName !== nextName) {
      this.setState({
        page: 1,
        status: "pending",
        imageName: [],
      });
      await fetchApi(nextName, 1)
        .then((res) => {
          this.setState({
            imageName: res,
            name: nextName,
            status: "resolved",
            idImage: 0,
          });
        })
        .catch((error) => {
          this.setState({ status: "rejected" });
        });
      return;
    }
    if (prevState.page !== this.state.page && prevName === this.state.name) {
      this.setState({
        status: "pending",
      });
      fetchApi(nextName, this.state.page)
        .then((res) => {
          this.setState((prevState) => ({
            imageName: [...prevState.imageName, ...res],
            name: nextName,
            status: "resolved",
            idImage: 0,
          }));
        })
        .catch((error) => {
          this.setState({ status: "rejected" });
        });
    }
  }

  handleFormSubmit = (painting) => {
    this.setState({ imgName: painting });
  };

  loadMore = (e) => {
    e.preventDefault();
    return this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  showModalFunc = (id) => {
    this.setState({
      showModal: !this.state.showModal,
      idImage: id,
    });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { showModal, status, imageName, idImage, imgName } = this.state;
    return (
      <>
        <Searchbar valueSubmit={this.handleFormSubmit} />
        <main className={s.App}>
          {status === "resolved" || status === "pending" ? (
            <>
              <ImageGalleryItem
                searchName={imageName}
                modal={this.showModalFunc}
              />
            </>
          ) : null}
          {status === "pending" ? (
            <div className={s.loaderWrapper}>
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
          ) : null}
          {status === "resolved" ? <LoadMore onClick={this.loadMore} /> : null}
          {status === "rejected" ? (
            <>
              <div className={s.containerDontCorrectly}>
                <p>
                  <b>{`Картинку с именем ${imgName} не найдено или они закончились`}</b>
                </p>

                <img
                  src={imgNotCorrectly}
                  alt={"Pictures is not fined"}
                  width="400px"
                  height="400px"
                />
              </div>
            </>
          ) : (
            ""
          )}

          {showModal ? (
            <Modal image={imageName} onClose={this.toggleModal} id={idImage} />
          ) : null}
        </main>
      </>
    );
  }
}

export default App;

App.propTypes = {
  imageName: PropTypes.string,
  name: PropTypes.string,
  page: PropTypes.number,
  status: PropTypes.string,
  showModal: PropTypes.bool,
};
