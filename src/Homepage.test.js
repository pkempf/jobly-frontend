import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Homepage from "./Homepage";
import UserContext from "./UserContext";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{}}>
        <Homepage />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

it("matches the snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={{}}>
        <Homepage />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
