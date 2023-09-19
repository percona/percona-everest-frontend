const defaultInputTransformer = (value) => value;
const numberInputTransformer = (value: number): string => isNaN(value) || value === 0 ? "" : value.toString();
const defaultOutputTransformer = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): string => event.target.value;
const numberOutputTransformer = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): number => {
  const output = Number(event.target.value);
  console.log(output);
  return isNaN(output) ? 0 : output;
};

export const getOutputTransformerFromType = (type: React.HTMLInputTypeAttribute = 'text', event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  if (type === 'number') {
    return numberOutputTransformer(event);
  }

  return defaultOutputTransformer(event);
};

export const getInputTransformerFromType = (type: React.HTMLInputTypeAttribute = 'text', value) => {
  if (type === 'number') {
    return numberInputTransformer(value);
  }

  return defaultInputTransformer(value);
}