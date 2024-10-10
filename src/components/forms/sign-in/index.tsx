"use client"

import { useAuthSignIn } from "@/hooks/auth"

interface Props {}

export default function SignInForm(props: Props) {
    const { errors, isPending, onAuthenticatedUser, register } = useAuthSignIn()
    return <></>
}
