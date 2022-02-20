import { Component } from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";
import { ThreeDots } from "react-loader-spinner";
import ItemsCard from "../ImageGallery/ImageGallery";
import fetchApi from "../serviseApi.js/fecthApi";
import LoadMore from "../Button/Button";
import Modal from "../Modal/Modal";
import imgNotCorrectly from "../../images/Упс.jpeg";
export default class FetchItems extends Component {
  state = {
    imageName: [],
    name: "",
    page: 1,
    status: "idle",
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

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

  loadMore = (e) => {
    e.preventDefault();
    const queryName = this.props.searchName;
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

  showModal = (e) => {
    const id = Number(e.target.id);
    this.setState({
      showModal: true,
      idImage: id,
    });
  };

  toggleModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { imageName, status, showModal, idImage } = this.state;
    return (
      <>
        {status === "resolved" || status === "pending" ? (
          <>
            <ItemsCard>
              {imageName.map(({ id, webformatURL, tags }) => {
                return (
                  <li className={s.item} key={id}>
                    <img
                      width="300px"
                      height="250px"
                      onClick={this.showModal}
                      id={id}
                      src={webformatURL}
                      alt={tags}
                    />
                  </li>
                );
              })}
            </ItemsCard>
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
                <b>{`Картинку с именем ${this.props.searchName} не найдено или они закончились`}</b>
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
      </>
    );
  }
}

FetchItems.propTypes = {
  name: PropTypes.string,
  page: PropTypes.number,
  status: PropTypes.string,
  showModal: PropTypes.bool,
};
