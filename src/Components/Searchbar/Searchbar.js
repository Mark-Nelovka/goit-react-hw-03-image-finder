import { Component } from "react";
import s from "./Searchbar.module.css";
export default class Searchbar extends Component {
  state = {
    input: "",
  };

  handleInputChange = (e) => {
    const saveInputValue = e.currentTarget.value;
    this.setState({ input: saveInputValue });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.valueSubmit(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    const { input } = this.state;
    return (
      <>
        <header className={s.Searchbar}>
          <form onSubmit={this.handleSubmit} className={s.SearchForm}>
            <button type="submit" className={s.SearchFormButton}>
              <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              className={s.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              onChange={this.handleInputChange}
              value={input}
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}
