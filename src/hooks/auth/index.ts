import { useSignIn } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {  z } from "zod"
import { SignInSchema } from "./schema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

export const useAuthSignIn = () => {
    const { isLoaded, setActive, signIn } = useSignIn()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        mode: "onBlur",
    })
    const router = useRouter()

    const onClerkAuth  = async (email: string, password: string) => {
        if (!isLoaded) {
            return toast.error("Oops! algo salió mal")
        }
        try {
            // esto es lo importante 
            const authenticated = await signIn.create({
                identifier: email,
                password: password,
            })
            if (authenticated.status === "complete") {
                reset()
                await setActive({ session: authenticated.createdSessionId })
                toast.success("Bienvenido de vuelta!")
                router.push("/callback/sing-in")
            }
        } catch (e: any) {
            if (e.errors[0].message === "form_password_incorrect") {
                return toast.error("La contraseña es incorrecta")
            }
        }
    }
   const {mutate: InitiateLoginFlow, isPending} =useMutation({
    mutationFn: ({email, password}:{email:string, password:string}) => onClerkAuth(email, password)
   })
   const onAuthenticatedUser= handleSubmit(async(values)=>{
        InitiateLoginFlow({email:values.email, password:values.password});
   })
   return {
    onAuthenticatedUser, 
    isPending, 
    register, 
    errors,
   }
}
