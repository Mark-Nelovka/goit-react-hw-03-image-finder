import { Component } from "react";
import s from "./ImageGalleryItem.module.css";
import { ThreeDots } from "react-loader-spinner";
import ItemsCard from "../ImageGallery/ImageGallery";
import fetchApi from "../serviseApi.js/fecthApi";
import LoadMore from "../Button/Button";
import Modal from "../Modal/Modal";
export default class FetchItems extends Component {
  state = {
    imageName: [],
    name: "",
    page: 1,
    status: "resolved",
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
    this.setState((prevState) => ({
      page: prevState.page + 1,
      status: "pending",
    }));

    fetchApi(queryName, this.state.page)
      .then((res) => {
        return this.setState((prevState) => ({
          imageName: [...prevState.imageName, ...res],
          status: "resolved",
        }));
      })
      .catch((error) => {
        this.setState({ status: "rejected" });
      });
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
        {status === "pending" ? (
          <div className={s.loaderWrapper}>
            <ThreeDots color="#00BFFF" height={80} width={80} />
          </div>
        ) : null}

        {status === "resolved" ? (
          <>
            <ItemsCard>
              {imageName.map(({ id, webformatURL, tags }) => {
                return (
                  <li onClick={this.showModal} key={id}>
                    <img id={id} src={webformatURL} alt={tags} />
                  </li>
                );
              })}
            </ItemsCard>
            <div className={s.containerBtn} onClick={this.loadMore}>
              <LoadMore />
            </div>
          </>
        ) : null}
        {status === "rejected" ? (
          <p>{`Картинку с именем ${this.props.searchName} не найдено. Введите корректный запрос`}</p>
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
