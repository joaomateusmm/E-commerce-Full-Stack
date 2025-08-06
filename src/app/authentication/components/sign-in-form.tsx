"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent,CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.email("Email inválido!"),
    password: z.string("Senha inválida! Tenha no mínimo 8 caracteres.").min(8, "Senha inválida! Tenha no mínimo 8 caracteres."),
})

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:"",
            password: "",
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
              <CardTitle>Entrar</CardTitle>
              <CardDescription>
                Não possui uma conta? <a className="cursor-pointer text-green-500" href="">Crie uma</a> é fácil e rápido!
              </CardDescription>
            </CardHeader>
            <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent className="grid gap-6">
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
            </CardContent>
            <CardFooter>
            <Button className="hover:bg-green-600 hover:scale-105 hover:active:scale-95 cursor-pointer" type="submit">Entrar</Button></CardFooter>
                </form>
            </Form>
            
          </Card>
        </>
    )
};


export default SignInForm;