import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { toLabel } from '@/utils/toLabel';
import { emptyAssessmentValues } from './formValues';
import { sampleAssessment } from './sampleAssessment';
import { assessmentSchema, MOBILITY, type Assessment } from './schema';

const mobilityOptions = MOBILITY.map((value) => ({ value, label: toLabel(value) }));

interface AssessmentFormProps {
  onSave: (assessment: Assessment) => Promise<void>;
}

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [savedAssessment, setSavedAssessment] = useState<Assessment | null>(null);

  const form = useForm({
    initialValues: emptyAssessmentValues,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
    transformValues: (values) => assessmentSchema.parse(values),
  });

  const handleSubmit = async (assessment: Assessment) => {
    setSavedAssessment(null);
    await onSave(assessment);
    setSavedAssessment(assessment);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack>
        <TextInput
          label="Medical record number"
          placeholder="MRN-004821"
          {...form.getInputProps('mrn')}
        />
        <TextInput label="Patient name" {...form.getInputProps('patientName')} />
        <DateInput label="Date of birth" {...form.getInputProps('dateOfBirth')} />
        <DateInput
          label="Assessment date"
          maxDate={dayjs().format('YYYY-MM-DD')}
          {...form.getInputProps('assessmentDate')}
        />
        <Select label="Mobility" data={mobilityOptions} {...form.getInputProps('mobility')} />
        <NumberInput
          label="Barthel Index"
          step={5}
          min={0}
          max={100}
          clampBehavior="none"
          {...form.getInputProps('barthelIndex')}
        />
        <NumberInput
          label="Regular medications"
          min={0}
          max={30}
          clampBehavior="none"
          {...form.getInputProps('medicationCount')}
        />
        <Checkbox
          label="Pharmacist review requested"
          {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
        />
        <DateInput label="Next review date" {...form.getInputProps('followUpDate')} />
        <Checkbox
          label="Consent"
          description="Patient or representative has given consent"
          {...form.getInputProps('consentObtained', { type: 'checkbox' })}
        />
        <Group justify="space-between">
          <Button variant="default" onClick={() => form.setValues(sampleAssessment)}>
            Load sample patient
          </Button>
          <Button type="submit" loading={form.submitting}>
            Save assessment
          </Button>
        </Group>
        {savedAssessment && (
          <Alert color="green" title="Assessment saved">
            <Code block>{JSON.stringify(savedAssessment, null, 2)}</Code>
          </Alert>
        )}
      </Stack>
    </form>
  );
}
