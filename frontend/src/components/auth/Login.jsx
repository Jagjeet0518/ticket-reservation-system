"use client";

import { useSession, signIn } from "next-auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const Login = () => {
    const { data: session, status } = useSession();
    return (
        <div className="w-full max-w-sm flex flex-col justify-center items-center p-8 rounded-lg gap-2 bg-neutral-200 dark:bg-neutral-900">
            {status === "unauthenticated" && <LoginForm />}
            {status === "authenticated" && <p>You are logged in!</p>}
            {status === "loading" && <p>Loading...</p>}
        </div>
    )
}

const LoginForm = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })
    return (
        <>
            <Input type="text" placeholder="Username" className="w-full" onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <Input type="password" placeholder="Password" className="w-full" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Button className="w-full" variant={"secondary"} onClick={
                () => {
                    signIn("credentials", form);
                }
            }>
                Login
            </Button>
        </>
    )
}

export default Login;