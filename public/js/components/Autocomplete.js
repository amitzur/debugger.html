const React = require("react");
const { DOM: dom, PropTypes } = React;
const { filter } = require("fuzzaldrin-plus");
require("./Autocomplete.css");

const Autocomplete = React.createClass({
  propTypes: {
    selectItem: PropTypes.func,
    items: PropTypes.array
  },

  displayName: "Autocomplete",

  getInitialState() {
    return {
      inputValue: "",
      selectedIndex: -1
    };
  },

  componentDidMount() {
    this.refs.searchInput.focus();
  },

  renderSearchItem(result, index) {
    return dom.li(
      {
        onClick: () => this.props.selectItem(result),
        key: result.value,
        className: index === this.state.selectedIndex ? "selected" : "",
      },
      dom.div({ className: "title" }, result.title),
      dom.div({ className: "subtitle" }, result.subtitle)
    );
  },

  getSearchResults() {
    let inputValue = this.state.inputValue;

    if (inputValue == "") {
      return [];
    }
    return filter(this.props.items, this.state.inputValue, {
      key: "value"
    });
  },

  onKeyDown(e) {
    const searchResults = this.getSearchResults(),
      resultCount = searchResults.length;

    if (e.key === "ArrowUp") {
      this.setState({
        selectedIndex: Math.max(0, this.state.selectedIndex - 1)
      });
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      this.setState({
        selectedIndex: Math.min(resultCount - 1, this.state.selectedIndex + 1)
      });
      e.preventDefault();
    } else if (e.key === "Enter") {
      this.props.selectItem(searchResults[this.state.selectedIndex]);
      e.preventDefault();
    }
  },

  render() {
    const searchResults = this.getSearchResults();

    return dom.div(
      { className: "autocomplete" },
      dom.input(
        {
          ref: "searchInput",
          onChange: (e) => this.setState({
            inputValue: e.target.value,
            selectedIndex: -1
          }),
          onKeyDown: this.onKeyDown
        }
      ),
      dom.ul({ className: "results" },
        searchResults.map(this.renderSearchItem)
      )
    );
  }
});

module.exports = Autocomplete;
