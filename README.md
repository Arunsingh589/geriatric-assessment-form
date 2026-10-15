# Geriatric Care Assessment Form

A one-page form a visiting nurse fills in when checking on an elderly patient at home. Built with React 19, TypeScript, Mantine (`@mantine/form`, `@mantine/dates`) and Zod 4, starting from the Mantine Vite template.

**Live demo:** https://geriatric-assessment-form-tndc.vercel.app/

All patient data in this repo is invented.

## Running it

Requires Node 24 (pinned in `.node-version`) and Yarn 4 (enable with `corepack enable`).

```bash
yarn install
yarn dev      # start the dev server
yarn test     # typecheck, lint, format check, tests and build
yarn vitest   # tests only
```

## Structure

```
src/
  App.tsx                         Container, Paper and heading around the form
  utils/toLabel.ts                'home_visit' -> 'Home visit'
  features/assessment/
    schema.ts                     the given Zod schema, rules and messages unchanged
    formValues.ts                 form input type derived from Assessment, empty initial values
    sampleAssessment.ts           the valid fixture used by "Load sample patient"
    saveAssessment.ts             fake save (~800ms)
    AssessmentForm.tsx            fields and form wiring
    schema.test.ts                age boundary: exactly 60 vs one day short
    AssessmentForm.test.tsx       load sample, submit, save handler gets parsed values
```

## Decisions

- **Input type vs parsed type.** `Assessment` (from `z.infer`) is the parsed output. Empty fields cannot satisfy it, so `AssessmentFormValues` is a mapped type over `Assessment`: number fields also accept `string` (what `NumberInput` emits when empty), date and select fields also accept `null`, booleans stay booleans. Field names and value types still come from the schema, so there is no second hand-written interface.
- **Parsed values on submit.** `schemaResolver(assessmentSchema)` produces the errors; `transformValues` runs `assessmentSchema.parse`, which only happens after validation has passed. The submit handler, the save handler and the success alert therefore all receive what Zod returned (trimmed strings, typed enum), not the raw form state.
- **No silent clamping.** Mantine's `NumberInput` clamps to `min`/`max` on blur by default. Both number inputs use `clampBehavior="none"`, so a typed 105 stays 105 and Zod rejects it with its own message.
- **Validation timing.** `validateInputOnBlur` validates the field being left, and submit validates everything. Untouched fields stay quiet. An empty submit gives exactly 9 errors. Zod skips the object-level `.refine()` checks while any field is invalid, so cross-field errors (age, follow-up date, polypharmacy) appear once all fields are filled in.
- **Mobility options** are generated from the `MOBILITY` array with `toLabel`, so adding a value to the array adds it to the dropdown.
- **Consent label.** The brief gives both "Consent" and "Patient or representative has given consent". The checkbox label is "Consent" and the sentence is its description.
- **Save handler injection.** `AssessmentForm` takes `onSave` as a prop. The app passes the fake 800ms save, and the test passes a mock to assert on the parsed values.
- **Template cleanup.** The template's demo components, router and `react-router-dom` were removed (routing is out of scope). With no CSS files left, stylelint exits with an error on empty input, so its script has `--allow-empty-input`. No lint or format rules were changed.

## Unfinished

Nothing. All requirements in the brief are implemented.

## Time spent

About 1.5 hours in total:

- ~20 min: reading the brief and the Mantine / Zod docs
- ~15 min: environment setup (an older global Node 22 was shadowing Node 24; enabling Yarn 4 via Corepack)
- ~25 min: schema wiring, form, tests and README, with an AI assistant; I reviewed every line
- ~30 min: deploying to Vercel (Yarn 4 + Corepack needed a custom install command)
