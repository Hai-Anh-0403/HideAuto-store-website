export type MessageValues = Record<string, string | number>;

export function formatMessage(template: string, values?: MessageValues) {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (placeholder, name) =>
    name in values ? String(values[name]) : placeholder,
  );
}
