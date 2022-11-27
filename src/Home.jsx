import { AutoGraph } from "@mui/icons-material";
import { AppBar, Box, createTheme, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RootProvider from "./providers/RootProvider";
import { useNavigate } from "react-router-dom";

export default function Home({ body }) {

  const drawerWidth = 240;

  let navigate = useNavigate();

  const theme = createTheme(
    {
      palette: {
        primary: {
          main: '#bdbdbd',
          light: '#efefef',
          dark: '#8d8d8d',
          contrastText: '#000000'
        },
        secondary: {
          main: '#d50000',
          light: '#ff5131',
          dark: '#9b0000',
          contrastText: '#ffffff'
        },
        background: {
          default: grey[100],
          paper: '#ffffff'
        },
      },
    }
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        pt: 2,
        pb: 4
      }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <AutoGraph color="secondary" sx={{ fontSize: 35, marginRight: "1rem" }} />
            <Typography variant="h5" color="inherit" noWrap>Investing Toolbox</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <ListItem key={'Lazy'} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/lazy");
                }}
              >
                <ListItemIcon>
                  <HotelIcon />
                </ListItemIcon>
                <ListItemText primary={'Lazy'} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'Active'} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/active");
                }}
              >
                <ListItemIcon>
                  <DirectionsRunIcon />
                </ListItemIcon>
                <ListItemText primary={'Active'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{
          marginLeft: `${drawerWidth}px`,
          width: "60%"
        }}>
          {body}
        </Box>
        <Typography sx={{ pt: 2, marginLeft: `${drawerWidth}px`, }} variant="body2" color="text.secondary" align="center">
          Made By Mark. Copyright © 2022.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}