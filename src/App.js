import s from "./App.module.css";
import PropTypes from "prop-types";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { Component } from "react";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";

class App extends Component {
  state = {
    imgName: "",
  };

  handleFormSubmit = (painting) => {
    this.setState({ imgName: painting });
  };

  render() {
    const { imgName } = this.state;
    return (
      <>
        <Searchbar valueSubmit={this.handleFormSubmit} />
        <main className={s.App}>
          <ImageGalleryItem searchName={imgName} />
        </main>
      </>
    );
  }
}

export default App;

App.propTypes = {
  imageName: PropTypes.string,
};
