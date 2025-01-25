"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string } | undefined>;

const initialState = {
  message: "",
};

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, initialState);

  const { toast } = useToast();
  useEffect(() => {
    if (state && state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return (
    <form noValidate action={formAction}>
      {children}
    </form>
  );
};
export default FormContainer;
