import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";

import Collection from "../Collection";
import NoDataFound from "../components/NoDataFound";
import Table from "../Table";

// Mock redux store
const middlewares = [];
const mockStore = configureStore(middlewares);

describe("<Collection />", () => {
  it("should render parent component", () => {
    // Mock initial redux store
    const store = mockStore({ collection: {} });

    const component = shallow(
      <Provider store={store}>
        <Collection />
      </Provider>
    );

    expect(component.exists()).toBe(true);
  });

  it("should render table when there're pages", () => {
    // Mock initial redux store
    const store = mockStore({
      collection: { pages: null, selected: [], selectAll: false }
    });

    const component = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Collection />
        </Provider>
      </BrowserRouter>
    );

    expect(component.find(NoDataFound).exists()).toBe(true);
  });

  it("should render message when there're no pages ", () => {
    // Mock initial redux store
    const store = mockStore({
      collection: {
        pages: { id1: { title: "t" } },
        selected: [],
        selectAll: false
      }
    });

    const component = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Collection />
        </Provider>
      </BrowserRouter>
    );

    expect(component.find(Table).exists()).toBe(true);
  });
});
