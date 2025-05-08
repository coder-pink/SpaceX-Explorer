
import {
  Title,
  Button,
  Container,
  Paper,
  Text,
  Stack,
  Header,
  Footer,
  Group,
  Center,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';

export default function Landing() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d1117',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <HeaderComponent/>
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Container size="lg">
          <Paper
            shadow="xl"
            radius="lg"
            p="xl"
            style={{
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              textAlign: 'center',
            }}
          >
            <Stack spacing="lg" align="center">
              <Title order={1} style={{ fontWeight: 800, fontSize: '2.5rem' }}>
                🚀 SpaceX Explorer
              </Title>
              <Text size="lg" color="gray.4" style={{ maxWidth: 600 }}>
                Discover past and upcoming SpaceX missions. Explore mission data, success rates,
                rockets, and more with a beautifully crafted interface.
              </Text>
              <Button
                component={Link}
                to="/login"
                size="md"
                color="blue"
                radius="xl"
                style={{ paddingLeft: 32, paddingRight: 32, fontWeight: 600 }}
              >
                Get Started
              </Button>
            </Stack>
          </Paper>
        </Container>
      </div>

      {/* Footer */}
      <FooterComponent/>
    </div>
  );
}
