import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Summarizer from './components/Summarizer';
import History from './components/History';
import LandingSection from './components/landing';
import About from './components/About';
import Footer from './components/Footer';

import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: `'Cairo', sans-serif`,
  },
  direction: 'rtl', 
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* Header/Navbar */}
        <AppBar position="static" sx={{ backgroundColor: '#567e9e' }}>
          <Toolbar
            sx={{
              minHeight: '300px',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                flexGrow: 1,
                letterSpacing: '2px',
              }}
            >
              سُطُور
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => {
                  const el = document.getElementById('about');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{ fontSize: '1.25rem' }}
              >

من نحن  
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/History"
                sx={{ fontSize: '1.25rem' }}
              >
                السجل
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ fontSize: '1.25rem' }}
              >
                الرئيسية
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box>
          <Routes>
            <Route
              path="/"
              element={
                <Box >
                  <Summarizer />

                  <Box my={4} />
                  <LandingSection />

                  <Box my={6} />
                  <About />

                  <Box mb={9} />
                </Box>
              }
            />
            <Route path="/History" element={<History />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
