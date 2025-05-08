
import { useQuery } from '@tanstack/react-query';
import {
  Loader,
  Text,
  Card,
  Stack,
  Paper,
  Title,
  Container,
  Alert,
  Button,
} from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLaunch } from '../../api/spacex';

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(['launch', id], () => fetchLaunch(id!), {
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div
  style={{
    backgroundColor: '#0d1117',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }}
>
  <Loader color="#58a6ff" size="lg" variant="dots" />
  <Text mt="md" style={{ color: '#c9d1d9', fontSize: '1.1rem' }}>
    Loading launch details...
  </Text>
</div>

    );
  }

  if (isError || !data) {
    return (
      <Container size="xs" style={{ textAlign: 'center', marginTop: '30vh' }}>
        <Alert color="red" title="Error!" mb="md">
          Error loading launch details. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container size="md">
        <Paper
          p="xl"
          radius="md"
          withBorder
          style={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            color: '#c9d1d9',
          }}
        >
          <Title
            order={2}
            align="center"
            mb="xl"
            style={{ color: '#f0f6fc', fontWeight: 600 }}
          >
            {data.name}
          </Title>

          <Card
            padding="xl"
            radius="md"
            withBorder
            style={{
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
            }}
          >
            <Stack spacing="lg">
              <div>
                <Text size="sm" style={{ color: '#8b949e' }}>
                  Launch Date
                </Text>
                <Text size="lg" style={{ color: '#c9d1d9' }}>
                  {new Date(data.date_utc).toLocaleString()}
                </Text>
              </div>

              <div>
                <Text size="sm" style={{ color: '#8b949e' }}>
                  Rocket
                </Text>
                <Text size="lg" style={{ color: '#c9d1d9' }}>
                  {data.rocket}
                </Text>
              </div>

              <div>
                <Text size="sm" style={{ color: '#8b949e' }}>
                  Launch Success
                </Text>
                <Text
                  size="lg"
                  style={{ color: data.success ? 'limegreen' : 'tomato' }}
                >
                  {data.success ? 'Yes' : 'No'}
                </Text>
              </div>

              <div>
                <Text size="sm" style={{ color: '#8b949e' }}>
                  Description
                </Text>
                <Text size="lg" style={{ color: '#c9d1d9' }}>
                  {data.details || 'No description available.'}
                </Text>
              </div>
            </Stack>

            <Button
              variant="light"
              color="gray"
              fullWidth
              mt="xl"
              onClick={() => navigate('/resources')}
              styles={{
                root: {
                  backgroundColor: '#21262d',
                  color: '#c9d1d9',
                  borderColor: '#30363d',
                },
              }}
            >
              ← Back to Launches
            </Button>
          </Card>
        </Paper>
      </Container>
    </div>
  );
}
