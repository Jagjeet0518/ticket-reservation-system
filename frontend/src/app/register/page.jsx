"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        mobile: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.name) {
            newErrors.name = "Name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Please enter a valid 10-digit mobile number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            router.push("/login");
        } catch (error) {
            console.error("Registration error:", error);
            setServerError(error.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-8 max-w-sm w-full m-auto gap-4">
            <h1 className="text-2xl font-bold text-center mb-2">Create an account</h1>

            {serverError && (
                <div className="text-red-700">
                    {serverError}
                </div>
            )}

            <div className="flex flex-col gap-2 w-full">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        className="w-full"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        className="w-full"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="w-full"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                        id="mobile"
                        name="mobile"
                        type="text"
                        className="w-full"
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                    {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
                </div>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                variant={"secondary"}
                className={"w-full"}
                onClick={handleSubmit}
            >
                {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-center mt-4">
                <p>
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:text-blue-800">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}