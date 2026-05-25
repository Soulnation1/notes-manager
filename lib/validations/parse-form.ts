import { z } from "zod";

export function formDataToObject(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    values[key] = String(value);
  });
  return values;
}

export function getFieldErrors(error: z.ZodError): Record<string, string> {
  const { fieldErrors } = z.flattenError(error) as {
    fieldErrors: Record<string, string[] | undefined>;
  };
  const errors: Record<string, string> = {};

  for (const [field, messages] of Object.entries(fieldErrors)) {
    const message = messages?.[0];
    if (message) {
      errors[field] = message;
    }
  }

  return errors;
}

export function parseFormData<T extends z.ZodType>(
  schema: T,
  formData: FormData,
):
  | { success: true; data: z.infer<T> }
  | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(formDataToObject(formData));

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, errors: getFieldErrors(result.error) };
}
