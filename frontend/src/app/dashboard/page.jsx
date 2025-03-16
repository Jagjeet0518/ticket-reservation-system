"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center m-auto">
            <h1 className="text-3xl font-bold">
                Train Ticket Reservation System
            </h1>

            <div className="flex flex-wrap gap-2 max-w-lg justify-center">
                <Link href="/dashboard/add-train">
                    <Button>
                        Add Train
                    </Button>
                </Link>
                <Link href="/dashboard/update-train">
                    <Button>
                        Update Train
                    </Button>
                </Link>
                <Link href="/dashboard/delete-train">
                    <Button>
                        Delete Train
                    </Button>
                </Link>
                <Link href="/trains">
                    <Button>
                        All Trains
                    </Button>
                </Link>
                <Link href="/fare-enquiry">
                    <Button>
                        Check Fare
                    </Button>
                </Link>
                <Link href="/seat-availability">
                    <Button>
                        Seat Availability
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;