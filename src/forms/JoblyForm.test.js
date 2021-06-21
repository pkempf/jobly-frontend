import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JoblyForm from "./JoblyForm";

it("renders without crashing", () => {
  render(
    <MemoryRouter>
      <JoblyForm fields={[]} />
    </MemoryRouter>
  );
});

it("matches the snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <JoblyForm fields={[]} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
