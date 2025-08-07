"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("Email inválido!"),
  password: z
    .string("Senha inválida! Tenha no mínimo 8 caracteres.")
    .min(8, "Senha inválida! Tenha no mínimo 8 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

const SignInForm = ({ onSwitchToSignUp }: SignInFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: FormValues) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_NOT_FOUND") {
            toast.error("E-mail não encontrado.");
            return form.setError("email", {
              message: "E-mail não encontrado.",
            });
          }

          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("Conta não encontrada ou inválida.");
            form.setError("password", {
              message: "Senha inválida.",
            });
            return form.setError("email", {
              message: "E-mail inválido.",
            });
          }

          toast.error(ctx.error.message);
        },
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Não possui uma conta?{" "}
          <a
            onClick={onSwitchToSignUp}
            className="cursor-pointer font-semibold text-green-500 hover:underline"
          >
            Crie uma
          </a>{" "}
          é fácil e rápido!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
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
            <Button
              className="w-full cursor-pointer hover:scale-105 hover:bg-green-600 hover:active:scale-95"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignInForm;