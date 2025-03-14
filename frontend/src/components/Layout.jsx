"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { UserCircle2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Layout = ({ children }) => {

    const { data: session, status } = useSession();

    return (
        <main className="grid gap-4 w-screen min-h-screen dark:bg-neutral-950/90 bg-neutral-50/90 dark:text-neutral-50/90 text-neutral-900/90 pt-16">
            <video autoPlay muted loop className="fixed top-0 left-0 w-full h-full object-cover opacity-100 -z-10" src="/video.webm" />
            <nav className="w-screen h-16 flex justify-between items-center px-8 bg-blue-600 fixed top-0 z-50">
                <Link href="/">
                    <h1 className="text-2xl font-semibold">
                        Train Ticket Reservation System
                    </h1>
                </Link>

                {status == "authenticated" && (
                    <div className="flex gap-2 items-center">
                        <Link href="/profile">
                            <UserCircle2 className="w-8 h-8 text-neutral-100" />
                        </Link>
                        <p className="text-neutral-100 mr-2 font-medium">
                            {session.user.name}
                        </p>
                        <Button onClick={() => signOut()}>
                            <LogOut className="w-8 h-8 text-neutral-900" />
                            Logout
                        </Button>
                    </div>
                )}
            </nav>
            <section className="w-full h-full p-8 flex flex-col">
                {children}
            </section>
        </main >
    )
}

export default Layout;