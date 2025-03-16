"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { LogOut } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-8 max-w-sm w-full m-auto gap-4">
                <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
                <p>You are already logged in!</p>
                <Link href="/">
                    <Button>
                        <Home />
                        Go to Home
                    </Button>
                </Link>
                <Button onClick={() => signOut()} variant={"secondary"}>
                    <LogOut />
                    Logout
                </Button>
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result.error) {
                setError("Invalid username or password");
                setIsLoading(false);
                return;
            }

            router.push("/");
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-8 max-w-sm w-full m-auto gap-4">
            <h1 className="text-2xl font-bold text-center mb-2">Login</h1>

            {error && (
                <div className="text-red-700">
                    {error}
                </div>
            )}
            <div className="flex flex-col gap-2 items-center w-full">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" placeholder="Username" className="w-full" onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" placeholder="Password" className="w-full" onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <Button
                type="submit"
                disabled={isLoading}
                variant={"secondary"}
                className={"w-full"}
                onClick={handleSubmit}
            >
                {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center mt-4">
                <p>
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:text-blue-800">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}