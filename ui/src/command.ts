import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";

export interface CommandResult {
  success: boolean;
  error?: string;
}

export interface UseCommandProps {
  command: () => Promise<CommandResult>;
  onSuccess: () => void;
  warning: NotificationInstance["warning"];
  errorMessage: string;
}

export interface UseCommandResult {
  execute: () => void;
  pending: boolean;
}

export function useCommand({
  command,
  onSuccess,
  warning,
  errorMessage,
}: UseCommandProps) {
  const [pending, setPending] = useState(false);

  async function execute() {
    try {
      setPending(true);
      const result = await command();
      setPending(false);

      if (result.error) {
        warning({ message: errorMessage, description: result.error });
      } else {
        onSuccess();
      }
    } catch {
      setPending(false);
    }
  }

  const result: UseCommandResult = {
    execute,
    pending,
  };

  return result;
}
