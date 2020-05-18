import React from "react";
import ReactDOM from "react-dom";
import PregledTransakcija from "./components/transactions/PregledTransakcija.js";
import { render } from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RegistrationForm from "./components/registration/RegistrationForm";
import Prijava from "./components/Prijava";

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

test("component should render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PregledTransakcija />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("component should contain table (for transactions)", () => {
  const transactions = shallow(<PregledTransakcija />);
  expect(transactions.find("Table")).toHaveLength(1);
});

test("registration form should have two password fields", () => {
  const component = shallow(<RegistrationForm />);
  expect(component.find('[name="password"]')).toHaveLength(1);
  expect(component.find('[name="confirm"]')).toHaveLength(1);
});
