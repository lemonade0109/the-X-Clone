"use client";

import React from "react";
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
  const [formState, formAction] = React.useActionState(action, initialState);
  // const [isButtonDisabled, setIsButtonDisabled] = React.useState<boolean>(true);

  // const handleInputChange = async (e: FormEvent<HTMLFormElement>) => {
  //   const form = e.currentTarget;
  //   const textValue = form?

  //   setIsButtonDisabled(!textValue);
  // };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formDataToSend = new FormData(e.currentTarget);

  //   await formAction(formDataToSend);

  //   e.currentTarget.reset();
  //   setIsButtonDisabled(true);
  // };

  const { toast } = useToast();
  React.useEffect(() => {
    if (formState && formState.message) {
      toast({ description: formState.message });
    }
  }, [formState, toast]);

  return <form action={formAction}>{children}</form>;
};
export default FormContainer;
