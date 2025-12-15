import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "jest-axe"
import Button from "./Button"

// Note: The toHaveNoViolations matcher is extended globally in setupTests.js

describe("Button Atom", () => {
  // --- Accessibility Test (Axe-core) ---
  it("should not have any accessibility violations when enabled", async () => {
    const onClickMock = jest.fn()
    const { container } = render(
      <Button onClick={onClickMock} type="button">
        Submit Form
      </Button>
    )

    // Use the custom matcher to assert accessibility compliance
    expect(await axe(container)).toHaveNoViolations()
  })

  describe("Button Atom Functional Tests", () => {
    it("should render the children content correctly", () => {
      const buttonText = "Click Me"
      const onClickMock = jest.fn()

      render(<Button onClick={onClickMock}>{buttonText}</Button>)

      // Check if the button content is visible to the user
      expect(screen.getByRole("button", { name: buttonText })).toBeInTheDocument()
    })

    it("should call the onClick handler when clicked", () => {
      const onClickMock = jest.fn() // Jest mock function to track calls

      render(<Button onClick={onClickMock}>Save</Button>)

      const button = screen.getByRole("button", { name: "Save" })

      // Simulate a user click event
      fireEvent.click(button)

      // Assert that the mock function was called once
      expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    it("should be disabled when the disabled prop is true and not clickable", () => {
      const onClickMock = jest.fn()

      render(
        <Button onClick={onClickMock} disabled={true}>
          Disabled Button
        </Button>
      )

      const button = screen.getByRole("button", { name: "Disabled Button" })

      // Assert that the button has the disabled attribute
      expect(button).toBeDisabled()

      // Try to click the disabled button
      fireEvent.click(button)

      // Assert that the click handler was NOT called
      expect(onClickMock).not.toHaveBeenCalled()
    })
  })
  // --- Functional Tests (React Testing Library) ---
})
