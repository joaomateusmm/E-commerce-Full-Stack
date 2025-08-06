"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent,CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
    email: z.email("Email inválido."),
    password: z.string("Senha inválida, tenha no mínimo 8 caracteres.").min(8, "Senha inválida, tenha no mínimo 8 caracteres."),
    passwordConfirmation: z.string("As senhas não são iguais.").min(8, "Senha inválida."),
})
.refine(
  (data) => {
    return data.password === data.passwordConfirmation;
  }, 
 {
  error: "As senhas não são iguais.",
  path: ["passwordConfirmation"]
 },
);

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email:"",
            password: "",
            passwordConfirmation: "",
        },
      })

      function onSubmit(values: FormValues) {
        console.log("FORMULARIOA VALIDO E ENVIOADO!")
        console.log(values)
      }


    return (
        <>
        <Card>
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>
                Crie uma conta para continuar.
              </CardDescription>
            </CardHeader>
            <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent className="grid gap-6">
                <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu Nome..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu Email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="Digite sua Senha..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repita sua Senha</FormLabel>
              <FormControl>
                <Input placeholder="Digite sua Senha Novamente..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            </CardContent>
            <CardFooter>
            <Button className="hover:bg-green-600 hover:scale-105 hover:active:scale-95 cursor-pointer" type="submit">Criar Conta</Button></CardFooter>
                </form>
            </Form>
            
          </Card>
        </>
    )
};


export default SignUpForm;