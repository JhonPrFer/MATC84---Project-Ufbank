module.exports = {
  // Use the installed presets
  presets: [
    // 1. Convert modern JavaScript features
    '@babel/preset-env',
    // 2. Enable JSX syntax transformation for React components
    '@babel/preset-react',
    // 3. Handle TypeScript syntax (like interfaces and types)
    '@babel/preset-typescript',
  ],
  // Add plugins if necessary (e.g., for specific React features or Next.js polyfills)
  plugins: [],
};