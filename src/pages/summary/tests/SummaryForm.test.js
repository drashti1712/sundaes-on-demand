import { render, screen } from "@testing-library/react";
//render to render the component
//screen to find the components
//fireEvent to fire some user events on the component
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("should test the functionality of T&C checkbox", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  expect(checkbox).not.toBeChecked();
  const confirmBtn = screen.getByRole("button", {
    name: "Confirm order",
  });
  expect(confirmBtn).toBeDisabled();
  await user.click(checkbox);
  expect(confirmBtn).toBeEnabled();
  await user.click(checkbox);
  expect(confirmBtn).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover is hidden initially
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const TCcheckbox = screen.getByText(/terms and conditions/i);
  await user.hover(TCcheckbox);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  await user.unhover(TCcheckbox);
  expect(popover).not.toBeInTheDocument();
});
