export type EntryType = {
  email: string;
  password: string;
  name?: string;
};

export type handlesParams = {
  inLogin: boolean;
  entry: EntryType;
  setErrors: (v: EntryType) => void;
};
