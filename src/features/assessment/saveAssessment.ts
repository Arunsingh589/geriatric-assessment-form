const SAVE_DELAY_MS = 800;

export const saveAssessment = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, SAVE_DELAY_MS);
  });
