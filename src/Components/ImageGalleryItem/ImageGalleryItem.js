import { Component } from "react";
import s from "./ImageGalleryItem.module.css";
import ItemsCard from "../ImageGallery/ImageGallery";
export default class FetchItems extends Component {
  showModal = (e) => {
    const id = Number(e.target.id);
    this.props.modal(id);
  };

  render() {
    const { searchName } = this.props;
    return (
      <>
        <ItemsCard>
          {searchName.map(({ id, webformatURL, tags }) => {
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
    );
  }
}
