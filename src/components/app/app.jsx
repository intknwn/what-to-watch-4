import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page.jsx";

const btnClickHandler = () => {};

const App = (props) => {
  const {filmCards} = props;

  return (
    <MainPage filmCards={filmCards}
      btnClickHandler={btnClickHandler}
    />
  );
};

App.propTypes = {
  filmCards: PropTypes.array.isRequired
};

export default App;
