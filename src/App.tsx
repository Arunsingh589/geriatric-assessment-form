import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { Container, MantineProvider, Paper, Title } from '@mantine/core';
import { AssessmentForm } from './features/assessment/AssessmentForm';
import { saveAssessment } from './features/assessment/saveAssessment';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Container size="sm" py="xl">
        <Paper withBorder shadow="sm" p="xl" radius="md">
          <Title order={2} mb="lg">
            Geriatric Care Assessment
          </Title>
          <AssessmentForm onSave={saveAssessment} />
        </Paper>
      </Container>
    </MantineProvider>
  );
}
