import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";

export default function Authentication() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 p-5">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
