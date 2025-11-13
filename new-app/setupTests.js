import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

// Extend Jest's matchers with the jest-axe matcher
expect.extend(toHaveNoViolations);