"use client";
import React, { useState } from "react";
import { docType } from "./Home";
import { Trash } from "@phosphor-icons/react";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const DocIcon = ({ title, id }: docType) => {
  const { push } = useRouter();

  const deleteDoc = () => {
    axios.post("/api/removeDoc", {
      id: id,
    });
    setDoesExist(false);
  };

  const [doesExist, setDoesExist] = useState(true);
  return (
    <div className={`flex-col ${doesExist ? "" : "hidden"}`}>
      <div className="flex items-center">
        <button
          onClick={() => push(`/doc/${id}`)}
          className="text-lg text-white"
        >
          {title}
        </button>
        <button
          onClick={() => {
            confirm(`are you sure you want to remove ${title}?`) && deleteDoc();
          }}
          className="z-10"
        >
          <Trash size={32} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default DocIcon;
