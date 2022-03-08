import s from "./Button.module.css";
import { Component } from "react";
export default class LoadMore extends Component {
  loadMore = (e) => {
    this.props.onClick(e);
  };

  render() {
    return (
      <>
        <button onClick={this.loadMore} className={s.loadMoreBtn} type="submit">
          Load more
        </button>
      </>
    );
  }
}
