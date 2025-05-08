import React from 'react';
import {
  Header,
  Group,
  Title,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();

  return (
    <Header height={60} p="md" style={{ backgroundColor: '#161b22', borderBottom: '1px solid #30363d' }}>
        <Group position="apart" style={{ height: '100%' }}>
          <Title order={3} style={{ color: '#fff', margin: 0 }}>
            🚀 SpaceX Explorer
          </Title>
          <Button component={Link} to="/login" variant="outline" color="blue" size="sm">
            Login
          </Button>
        </Group>
      </Header>
  );
};

export default HeaderComponent;
