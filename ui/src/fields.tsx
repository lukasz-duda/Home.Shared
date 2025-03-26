import { Form, Input } from "antd";
import { ChangeEvent } from "react";

export interface TextFieldProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

export function TextField({ value, onChange, label }: TextFieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value || null;
    onChange(newValue);
  }

  return (
    <Form.Item label={label}>
      <Input
        value={value ?? ""}
        onChange={handleChange}
      />
    </Form.Item>
  );
}

export interface PasswordFieldProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

export function PasswordField({ value, onChange, label }: PasswordFieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value || null;
    onChange(newValue);
  }

  return (
    <Form.Item label={label}>
      <Input.Password
        value={value ?? ""}
        onChange={handleChange}
      />
    </Form.Item>
  );
}
