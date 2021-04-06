import React, { Fragment } from "react";
import Dropdown from "./dropdown";
import { fetchApiItems } from "./server/itemsClient";

class Typeahead extends React.Component {
  state = {
    inputText: "",
    showDropdown: false,
    suggestions: [],
    addedItems: new Set()
  };

  fetchSuggestions = async () => {
    const response = await fetchApiItems({ query: this.state.inputText });
    this.setState({ suggestions: response });
  };

  onInputChange = (e) => {
    //TODO: instrumentation
    const value = e.target.value;
    if (value !== this.state.inputText) {
      this.setState({ inputText: value, showDropdown: true }, () => {
        this.fetchSuggestions();
      });
    }
  };

  hideDropdown = (e) => {
    this.setState({ showDropdown: false });
  };

  onItemSelected = (e) => {
    this.setState({
      addedItems: new Set([...this.state.addedItems, e.target.innerText]),
      showDropdown: false
    });
  };

  render() {
    const { inputText, showDropdown, suggestions, addedItems } = this.state;
    console.log("selected items", addedItems);
    return (
      <Fragment>
        <div>{[...addedItems].join(",")}</div>
        <div
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-owns="dropdown"
        >
          <input
            aria-autocomplete="list"
            aria-controls="dropdown"
            onChange={this.onInputChange}
            onBlur={this.hideDropdown}
            value={inputText}
          />
          {showDropdown && (
            <Dropdown items={suggestions} onItemClicked={this.onItemSelected} />
          )}
        </div>
      </Fragment>
    );
  }
}
Typeahead.propTypes = {};

export default Typeahead;
