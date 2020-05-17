import React from "react";
import ReactDOM from "react-dom";
import PregledTransakcija from "./components/transactions/PregledTransakcija.js";
import { render } from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RegistrationForm from "./components/registration/RegistrationForm";

Enzyme.configure({ adapter: new Adapter() });

test("component should render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PregledTransakcija />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("component should contain table (for transactions)", () => {
  const transactions = render(<PregledTransakcija></PregledTransakcija>);
  expect(transactions.container.querySelector("table")).not.toBeNull();
});

test("registration form should have two password fields", () => {
  const component = shallow(<RegistrationForm></RegistrationForm>);
  expect(component.find('[name="password"]')).toHaveLength(1);
  expect(component.find('[name="confirm"]')).toHaveLength(1);
});
