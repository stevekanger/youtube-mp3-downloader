export type FormChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export type FormChangeFunction = (e: FormChangeEvent) => void;
