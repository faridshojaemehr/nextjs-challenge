const LoadingState = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.5rem",
      color: "#666",
    }}
  >
    Generating 500,000 items (via Web Worker)...
  </div>
);

export default LoadingState;
