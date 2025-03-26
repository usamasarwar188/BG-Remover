import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

/**
 * Application header component
 * @returns {JSX.Element} The header component
 */
const AppHeader: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        bgcolor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyNTYzZWIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTZWOGE0IDQgMCAwIDAtNC00SDdhNCA0IDAgMCAwLTQgNHY4YTQgNCAwIDAgMCA0IDRoMTBhNCA0IDAgMCAwIDQtNHoiPjwvcGF0aD48Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEuNSI+PC9jaXJjbGU+PHBvbHlsaW5lIHBvaW50cz0iMjEgMTUgMTYgMTAgNSAyMSI+PC9wb2x5bGluZT48L3N2Zz4="
          sx={{ width: 32, height: 32, mr: 2 }}
          alt="Logo"
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            background: "linear-gradient(45deg, #2563eb, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
          }}
        >
          Background Remover & Replacer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
