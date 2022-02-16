import s from "./Button.module.css";
import { Component } from "react";
export default class LoadMore extends Component {
  render() {
    return (
      <>
        <button className={s.loadMoreBtn} type="submit">
          Load more
        </button>
      </>
    );
  }
}
