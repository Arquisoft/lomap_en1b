import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


export default function Login(): JSX.Element {
  const [providerValue, setProviderValue] = useState<String>("");
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="provider"
              label="POD Provider URL"
              name="provider"
              autoFocus
              placeholder="https://example.com"
              value={providerValue}
            />
            
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>

            <Box>
                <Typography component="h1" variant="body1">
                    Or choose your provider:
                </Typography>
                <Button
                    color="secondary"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 0.25, mb: 2 }}
                    onClick={() => {
                      setProviderValue("https://solidcommunity.net/login")
                    }}
                >
                    Solid Community
                </Button>
                <Button
                    color="secondary"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 0.25, mb: 2 }}
                    onClick={() => {
                      setProviderValue("https://solidweb.org/login")
                    }}
                >
                    Solid Web
                </Button>
                <Button
                    color="secondary"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 0.25, mb: 2 }}
                    onClick={() => {
                      setProviderValue("https://inrupt.net/login")
                    }}
                >
                    Inrupt.net
                </Button>
                <Button
                    color="secondary"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 0.25, mb: 2 }}
                    onClick={() => {
                      setProviderValue("https://auth.inrupt.com/login?response_type=code&client_id=291nuca1atm91cstojs8ndsbkh&scope=openid+openid+profile&redirect_uri=https%3A%2F%2Flogin.inrupt.com%2Fcallback&state=1874cb6e-8358-4974-b916-2457141b23c4")
                    }}
                >
                    pod.Inrupt.net
                </Button>
            </Box>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}