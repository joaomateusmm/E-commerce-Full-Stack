"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Header } from "../../components/common/header";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = () => {
  const [activeTab, setActiveTab] = useState("sign-up");

  const switchToSignIn = () => setActiveTab("sign-in");
  const switchToSignUp = () => setActiveTab("sign-up");

  return (
    <>
      <Header />
      <div className="mx-auto mt-19 flex w-full max-w-sm flex-col gap-6 p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-2 shadow-md">
            <TabsTrigger className="cursor-pointer" value="sign-in">
              Entrar
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="sign-up">
              Criar Conta
            </TabsTrigger>
          </TabsList>
          <TabsContent className="rounded-2xl shadow-lg" value="sign-in">
            <SignInForm onSwitchToSignUp={switchToSignUp} />
          </TabsContent>
          <TabsContent className="rounded-2xl shadow-lg" value="sign-up">
            <SignUpForm onSwitchToSignIn={switchToSignIn} />
          </TabsContent>
        </Tabs>
        <div className="my-5 mt-24 px-5"></div>
      </div>
    </>
  );
};

export default Authentication;
