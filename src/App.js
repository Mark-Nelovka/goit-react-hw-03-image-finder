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
      });
      setTimeout(() => {
        fetchApi(nextName, this.state.page)
          .then((res) => {
            this.setState({
              imageName: res,
              name: nextName,
              page: 2,
              status: "resolved",
              idImage: 0,
            });
          })
          .catch((error) => {
            this.setState({ status: "rejected" });
          });
      }, 1000);
    }
  }

  handleFormSubmit = (painting) => {
    this.setState({ imgName: painting });
  };

  loadMore = (e) => {
    e.preventDefault();
    const queryName = this.state.imgName;
    this.setState({ status: "pending" });
    setTimeout(() => {
      fetchApi(queryName, this.state.page)
        .then((res) => {
          return this.setState((prevState) => ({
            page: prevState.page + 1,
            imageName: [...prevState.imageName, ...res],
            status: "resolved",
          }));
        })
        .catch((error) => {
          this.setState({ status: "rejected" });
        });
    }, 1000);
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
          {status === "resolved" ? (
            <div className={s.containerBtn} onClick={this.loadMore}>
              <LoadMore />
            </div>
          ) : null}
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
