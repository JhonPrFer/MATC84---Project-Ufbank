"use client";

import { useEffect, useState } from "react";

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

  return (
    <div>
      <p>{message || "Carregando..."}</p>
    </div>
  );
}
