import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const filmCards = [{
  movieName: `The Grand Budapest Hotel`,
  productionDate: `1984`,
  genre: `Drama`,
  id: 0
}];

it(`Render App`, () => {
  const tree = renderer
  .create(<App filmCards={filmCards}
  />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
