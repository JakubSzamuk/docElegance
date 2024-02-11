"use client";
import React, { useEffect, useState } from "react";
import DocIcon from "./DocIcon";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PlusSquare, SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import Loading from "./Loading";

export type docType = {
  title: string;
  id: string;
  body?: string;
  uid?: string;
};

type userData = {
  docs: docType[];
  account: {
    image: string;
    email: string;
    name: string;
    id: string;
    emailVerified: boolean;
  };
};

const Home = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  const [userData, setUserData] = useState<userData>();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [session]);

  const createFile = async () => {
    await axios
      .post("/api/fetchdoc", {})
      .then((data) => push(`/doc/${data.data.documentId}`));
  };

  const fetchFileData = async () => {
    await axios
      .post("/api/fetchUserData", {})
      .then((data) => setUserData(data.data));
  };
  console.log(userData);

  useEffect(() => {
    fetchFileData();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-1/2 w-11/12 md:w-1/2 flex flex-col z-20 mono">
        <div className="flex items-center">
          <h1 className="self-end text-white">DocElegance</h1>
          <div className="flex items-center justify-center ml-auto gap-2 bg-primary w-28 h-14 rounded-md mb-2">
            {userData ? (
              <>
                <img
                  src={userData!.account!.image!}
                  width={40}
                  height={40}
                  alt="Profile Picture"
                />
                <button onClick={() => signOut()}>
                  <SignOut size={40} color="#fff" />
                </button>
              </>
            ) : (
              <Loading className="scale-50" />
            )}
          </div>
        </div>
        <div className="bg-primary rounded-md w-full p-4 min-h-64">
          <div className="flex items-center w-full">
            <p className="text-white text-xl">Your Documents</p>
            <button className="ml-auto" onClick={createFile}>
              <PlusSquare size={40} color="#fff" />
            </button>
          </div>

          {userData ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-4 grid-flow-row mt-2 px-4">
              {userData!.docs.length >= 1 ? (
                userData!.docs.map((doc: docType, key) => (
                  <DocIcon key={key} title={doc.title} id={doc.id} />
                ))
              ) : (
                <p className="text-white">Looks empty, Add a new document</p>
              )}
            </div>
          ) : (
            <Loading className="scale-50 mt-2" />
          )}
        </div>
      </div>
      <div className="absolute -top-64 -left-96">
        <Image
          src="/orb4.svg"
          width={800}
          height={800}
          alt="A background orb"
        />
      </div>
      <div className="absolute right-2 bottom-2">
        <Image
          src="/orb1.svg"
          width={800}
          height={800}
          alt="A background orb"
        />
      </div>
    </div>
  );
};

export default Home;
