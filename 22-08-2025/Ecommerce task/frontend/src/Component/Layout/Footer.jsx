import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#cfe8fc", height: "200px", width: "100vw" }} />
      </Container>
    </>
  );
}
// <ThemeProvider
//   theme={{
//     palette: {
//       primary: {
//         main: "#007FFF",
//         dark: "#0066CC",
//       },
//     },
//   }}
// >
//   <Box
//     sx={{
//       flexGrow: 1,
//       display: { xs: "flex", md: "none" },
//       borderRadius: 1,
//       bgcolor: "primary.main",
//       "&:hover": {
//         bgcolor: "primary.dark",
//       },
//     }}
//   >

//   </Box>

// </ThemeProvider>
