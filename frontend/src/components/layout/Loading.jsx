import { CircularProgress , Box } from "@mui/material";

function Loading() {
  const styles = {
    LoadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      background: "var(--background-color)",
    },
  };
  return (
    <Box sx={styles.LoadingContainer}>
      <CircularProgress size={60} />
    </Box>
  );
}

export default Loading;
