import '@mantine/core/styles.css';

import { Container, MantineProvider, Paper, Title } from '@mantine/core';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container size="sm" py="xl">
        <Paper withBorder shadow="sm" p="xl" radius="md">
          <Title order={2}>Geriatric Care Assessment</Title>
        </Paper>
      </Container>
    </MantineProvider>
  );
}
