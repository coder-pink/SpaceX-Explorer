
import {
  Button,
  TextInput,
  Paper,
  Title,
  Text,
  Box,
  Alert,
  Stack,
  Container,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const { login, errorMessage, isAuthenticated } = useAuthStore((state) => ({
    login: state.login,
    errorMessage: state.errorMessage,
    isAuthenticated: state.isAuthenticated,
  }));

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/resources');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <Box
      style={{
        backgroundColor: '#0d1117',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <Container size={420}>
        <Paper
          shadow="xl"
          radius="md"
          p="xl"
          style={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            color: '#ffffff',
          }}
        >
          <Stack spacing="md">
            <Title order={2} align="center" style={{ color: '#f0f6fc' }}>
              Sign in to SpaceX Explorer
            </Title>

            {errorMessage && (
              <Alert color="red" variant="light">
                {errorMessage}
              </Alert>
            )}

            <TextInput
              label="Username"
              placeholder="Enter your username - admin"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              styles={{
                label: { color: '#c9d1d9' },
                input: { backgroundColor: '#0d1117', borderColor: '#30363d', color: 'white' },
              }}
            />

            <TextInput
              label="Password"
              type="password"
              placeholder="Enter your password - 12345"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              styles={{
                label: { color: '#c9d1d9' },
                input: { backgroundColor: '#0d1117', borderColor: '#30363d', color: 'white' },
              }}
            />

            <Button
              fullWidth
              mt="md"
              radius="xl"
              color="blue"
              onClick={handleLogin}
              style={{ fontWeight: 600 }}
            >
              Sign In
            </Button>
          </Stack>
        </Paper>

        <Text align="center" color="dimmed" mt="md" size="sm">
          Don't have an account? This is a demo app.
        </Text>
      </Container>
    </Box>
  );
}
