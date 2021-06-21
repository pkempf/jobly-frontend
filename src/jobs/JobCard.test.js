import { render } from "@testing-library/react";
import JobCard from "./JobCard";

it("renders without crashing", () => {
  render(<JobCard job={{}} />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<JobCard job={{}} />);
  expect(asFragment()).toMatchSnapshot();
});
