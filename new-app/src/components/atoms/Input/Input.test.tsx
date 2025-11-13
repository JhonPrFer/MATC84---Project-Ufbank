import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Input from './Input';

// Add the jest-axe matcher to Jest
expect.extend(toHaveNoViolations);

describe('Input Atom Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    // 1. Render the component
    const { container } = render(
      <Input
        label="Test Input"
        id="test-input"
        name="testInput"
        type="text"
        value=""
        onChange={() => {}} // Pass an empty function for the prop
        required
      />
    );

    // 2. Run the axe-core audit on the rendered component tree
    const results = await axe(container);

    // 3. Assert that no accessibility violations were found
    expect(results).toHaveNoViolations();
  });
});