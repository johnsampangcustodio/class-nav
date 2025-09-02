import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { CssBaseline, Container, Typography, Grid, Card, CardContent, CardActions, Button, AppBar, Toolbar, Box, GlobalStyles, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScheduleData from './scheduleData.js';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7c4dff' }, // vibrant purple
    secondary: { main: '#ff4081' }, // playful pink
    background: { default: '#0b1020' },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: 0.2, fontSize: '2.25rem' },
    h5: { fontWeight: 700, letterSpacing: 0.2, fontSize: '1.75rem' },
    h6: { fontWeight: 600, fontSize: '1.3rem' },
    button: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },
  },
  components: {
    MuiContainer: { defaultProps: { maxWidth: 'md' } },
  },
});

function DaysList() {
  const days = Object.keys(ScheduleData).filter((d) => (ScheduleData[d] && ScheduleData[d].length !== undefined));
  // Phrase bank for the home page greeting
  const phrases = React.useMemo(() => [
    'Good Day!',
    'Hello!',
    'Hi John!',
    'Welcome back!',
    'Today is gonna be good!',
    'Let’s do this!',
  ], []);
  // Pick a random phrase on mount (each time the home is visited)
  const phrase = React.useMemo(() => phrases[Math.floor(Math.random() * phrases.length)], [phrases]);

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
        {phrase}
      </Typography>
      <Grid container spacing={2.5}>
        {days.map((day) => (
          <Grid item xs={12} sm={6} key={day}>
            <Card variant="outlined" sx={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-4px) scale(1.01)', boxShadow: 8, borderColor: 'primary.main' } }}>
              <CardContent sx={{ p: 3, pb: 1.5, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>{day}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {ScheduleData[day]?.length || 0} trip(s)
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pt: 0, pb: 2 }}>
                <Button component={Link} to={`/day/${day}`} size="small" variant="contained">Open</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function DayView() {
  const { day } = useParams();
  const navigate = useNavigate();
  const trips = ScheduleData[day?.toLowerCase?.() || ''] || [];
  const prettyDay = day ? day.charAt(0).toUpperCase() + day.slice(1) : '';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, position: 'relative' }}>
        <Typography variant="h4" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>{prettyDay || 'Unknown Day'}</Typography>
      </Box>

      {trips.length === 0 ? (
        <>
          <Typography color="text.secondary">No trips scheduled for {prettyDay}.</Typography>
        </>
      ) : (
        <Grid container spacing={2}>
          {trips.map((t, idx) => (
            <Grid item xs={12} key={idx}>
              <Card variant="outlined" sx={{ position: 'relative', overflow: 'hidden', transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: 8, borderColor: 'primary.main' } }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Top-right time range with duration beneath */}
                  {(t.timeStart && t.timeEnd) && (
                    <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, color: 'text.secondary' }}>
                      <Typography variant="caption" sx={{ px: 1, py: 0.5, borderRadius: 1, bgcolor: 'rgba(124,77,255,0.15)', border: '1px solid', borderColor: 'primary.main' }}>
                        {t.timeStart} - {t.timeEnd}
                      </Typography>
                      {t.duration && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                          Walk: {t.duration}
                        </Typography>
                      )}
                    </Box>
                  )}

                  <Typography variant="subtitle2" color="text.secondary">From</Typography>
                  <Typography variant="h6" gutterBottom>{t.from}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">To</Typography>
                  <Typography variant="h6" gutterBottom>{t.to}</Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => window.open(t.url, '_blank', 'noopener,noreferrer')}
                  >
                    Get Directions
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => navigate('/')} variant="outlined" size="small">Back</Button>
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b1020 100%)',
          backgroundAttachment: 'fixed',
        },
      }} />
      <BrowserRouter>
        <AppBar
          position="static"
          color="transparent"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <Toolbar sx={{ position: 'relative' }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/"
              sx={{
                mr: 1,
                transition: 'transform 200ms ease, filter 200ms ease',
                '&:hover': { transform: 'scale(1.06)', filter: 'drop-shadow(0 0 10px rgba(124,77,255,0.6))' }
              }}
              aria-label="Home"
            >
              <span className="material-icons">home</span>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
              Class Navigator
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<DaysList />} />
          <Route path="/day/:day" element={<DayView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
