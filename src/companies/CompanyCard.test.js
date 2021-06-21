import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyCard from "./CompanyCard";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <CompanyCard company={{}} />
    </MemoryRouter>
  );
});

it("matches the snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard company={{}} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
