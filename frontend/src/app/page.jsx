"use client";

import Login from "@/components/auth/Login";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { UserCircle2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col gap-4 items-center justify-center m-auto">
      <h1 className="text-3xl font-bold">
        Train Ticket Reservation System
      </h1>
      {
        status !== "authenticated" ? <Login /> : (
          <>
            <div className="flex flex-wrap gap-2 max-w-lg justify-center">
              <Link href="/trains">
                <Button>
                  View Trains
                </Button>
              </Link>
              <Link href="/train-between-stations">
                <Button>
                  Train Between Stations
                </Button>
              </Link>
              <Link href="/profile">
                <Button>
                  Ticket Booking History
                </Button>
              </Link>
              <Link href="/fare-enquiry">
                <Button>
                  Fare Enquiry
                </Button>
              </Link>
              <Link href="/seat-availability">
                <Button>
                  Seat Availability
                </Button>
              </Link>
              <Link href="/profile">
                <Button>
                  Profile
                </Button>
              </Link>
            </div>
          </>
        )
      }

    </div>
  )
}

export default Home;