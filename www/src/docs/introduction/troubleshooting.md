# Troubleshooting

## Comments in JSX/TSX

**Problem:** I get an error when I try to use comments in my JSX/TSX code.

**Solution:** The syntax for comments within JSX/TSX is `{/* ... */}`, different from the syntax for comments in JavaScript/TypeScript `// ...`. You can use the following syntax to add comments in JSX/TSX:

```tsx
export default () => (
  <div>
    // This is an INVALID comment
    {/* This is a VALID comment */}
  </div>
)
```
