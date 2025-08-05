import Header from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";

export default async function Authentication() {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-6 p-5">
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="w-full">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register" className="w-full">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
