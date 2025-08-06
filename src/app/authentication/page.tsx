
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 mx-auto p-5">
      <Tabs defaultValue="sign-up">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForm/> 
          {/* Formulário entrar com a conta */}
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUpForm/>
        {/* Formulário Criar a conta */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authentication;
