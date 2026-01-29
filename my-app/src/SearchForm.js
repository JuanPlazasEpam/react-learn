import React from "react";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.initialQuery,
    };
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  triggerSearch = () => {
    this.props.onSearch(this.state.query);
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.triggerSearch();
    }
  };

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement("input", {
        type: "text",
        value: this.state.query,
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown,
        placeholder: "Search...",
      }),
      React.createElement(
        "button",
        { onClick: this.triggerSearch },
        "Search"
      )
    );
  }
}

export default SearchForm;
