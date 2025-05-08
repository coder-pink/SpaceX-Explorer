
import {
  Table,
  Loader,
  TextInput,
  Paper,
  Title,
  Container,
  Alert,
  Text,
  Select,
  Group,
  Pagination,
  Button,
  Box,
  Stack,
} from '@mantine/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLaunches } from '../../api/spacex';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/app.store'; // ✅ Zustand store import

export default function ResourceListPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore((state) => state);

  const {
    search,
    currentPage,
    sortBy,
    sortOrder,
    setSearch,
    setCurrentPage,
    setSortBy,
    setSortOrder,
  } = useAppStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isError } = useQuery(['launches'], fetchLaunches);

  useEffect(() => {
    const querySortBy = searchParams.get('sortBy') as 'name' | 'date' | 'success' | null;
    const querySortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | null;

    if (querySortBy) setSortBy(querySortBy);
    if (querySortOrder) setSortOrder(querySortOrder);
  }, []);

  useEffect(() => {
    setSearchParams({ sortBy, sortOrder });
  }, [sortBy, sortOrder, setSearchParams]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          Error loading launches. Please try again later.
        </Alert>
      </Container>
    );
  }

  const filtered = data.filter((launch: any) =>
    launch.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = filtered.sort((a: any, b: any) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
        : new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime();
    }
    if (sortBy === 'success') {
      return sortOrder === 'asc'
        ? (a.success ? 1 : 0) - (b.success ? 1 : 0)
        : (b.success ? 1 : 0) - (a.success ? 1 : 0);
    }
    return 0;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box
      style={{
        backgroundColor: '#0d1117',
        minHeight: '100vh',
        paddingTop: '2rem',
        paddingBottom: '4rem',
        color: '#c9d1d9',
      }}
    >
      <Container size="xl">
        <Paper
          shadow="md"
          radius="md"
          p="xl"
          withBorder
          style={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
          }}
        >
          <Group position="apart" mb="lg">
            <Title order={2} style={{ color: '#f0f6fc' }}>
              SpaceX Launches
            </Title>
            <Button color="red" variant="light" onClick={handleLogout}>
              Logout
            </Button>
          </Group>

          <Stack spacing="md">
            <TextInput
              label="Search for a launch"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              size="md"
              styles={{
                label: { color: '#c9d1d9' },
                input: {
                  backgroundColor: '#0d1117',
                  borderColor: '#30363d',
                  color: '#ffffff',
                },
              }}
            />

            <Group position="apart">
              <Select
                label="Sort by"
                value={sortBy}
                onChange={(val) => setSortBy(val as any)}
                data={[
                  { value: 'name', label: 'Name' },
                  { value: 'date', label: 'Date' },
                  { value: 'success', label: 'Success' },
                ]}
                size="md"
                style={{ width: '48%' }}
                styles={{ label: { color: '#c9d1d9' } }}
              />
              <Select
                label="Order"
                value={sortOrder}
                onChange={(val) => setSortOrder(val as any)}
                data={[
                  { value: 'asc', label: 'Ascending' },
                  { value: 'desc', label: 'Descending' },
                ]}
                size="md"
                style={{ width: '48%' }}
                styles={{ label: { color: '#c9d1d9' } }}
              />
            </Group>
          </Stack>

          <Table
            withBorder
            mt="xl"
            style={{
              backgroundColor: '#0d1117',
              border: '1px solidrgb(50, 54, 58)',
              color: '#c9d1d9',
            }}
          >
            <thead>
              <tr>
                <th style={{ color: '#c9d1d9' }}>Name</th>
                <th style={{ color: '#c9d1d9' }}>Date</th>
                <th style={{ color: '#c9d1d9' }}>Success</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((launch: any) => (
                  <tr
                    key={launch.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/resources/${launch.id}`)}
                  >
                    <td>{launch.name}</td>
                    <td>{new Date(launch.date_utc).toLocaleString()}</td>
                    <td style={{ color: launch.success ? 'limegreen' : 'tomato' }}>
                      {launch.success ? 'Yes' : 'No'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>
                    No launches found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <Group position="center" mt="xl">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              radius="xl"
              size="md"
              styles={{
                control: {
                  backgroundColor: '#0d1117',
                  borderColor: '#30363d',
                  color: '#f0f6fc',
                },
              }}
            />
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}
