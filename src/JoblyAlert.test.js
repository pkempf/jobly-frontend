import { render } from "@testing-library/react";
import JoblyAlert from "./JoblyAlert";
import AlertContext from "./AlertContext";

it("renders without crashing", () => {
  render(
    <AlertContext.Provider
      value={{ message: { text: "", variant: "" }, setMessage: undefined }}
    >
      <JoblyAlert />
    </AlertContext.Provider>
  );
});

it("matches the snapshot", () => {
  const { asFragment } = render(
    <AlertContext.Provider
      value={{ message: { text: "", variant: "" }, setMessage: undefined }}
    >
      <JoblyAlert />
    </AlertContext.Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
