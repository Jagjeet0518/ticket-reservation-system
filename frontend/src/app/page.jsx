"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col gap-4 items-center justify-center m-auto">
      <h1 className="text-3xl font-bold">
        Train Ticket Reservation System
      </h1>
      {
        status !== "authenticated" ? (
          <>
            <h4>Please login to access the system</h4>
            <Link href="/login">
              <Button>
                Login
              </Button>
            </Link>
          </>
        ) : (
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
            {
              session?.user?.role === "ADMIN" && (
                <Link href="/dashboard">
                  <Button>
                    Admin Dashboard
                  </Button>
                </Link>
              )
            }
          </>
        )
      }

    </div>
  )
}

export default Home;