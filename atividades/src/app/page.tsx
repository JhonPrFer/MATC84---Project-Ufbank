"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton as Button } from "../components/Button";
import Input from "../components/Input";

export default function HelloPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHello = async () => {
      const res = await fetch("/api/hello");
      const data = await res.json();
      setMessage(data.message);
    };

    fetchHello();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Record<string, string>>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = (data: Record<string, string>) => {
    console.log(errors);
    console.log(data);
  };

  return <></>;
}
