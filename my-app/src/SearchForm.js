import React from "react";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.initialQuery || "", // fallback to empty string
    };
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  triggerSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) onSearch(this.state.query);
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // <-- prevent default form submission / page reload
      this.triggerSearch();
    }
  };

  render() {
    return React.createElement(
      "div",
      { className: "search-form" },
      React.createElement("input", {
        type: "text",
        value: this.state.query,
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown,
        placeholder: "Search..."
      }),
      React.createElement(
        "button",
        { type: "button", onClick: this.triggerSearch },
        "Search"
      )
    );
  }
}

export default SearchForm;
