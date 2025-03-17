"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoveLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState({});
    const [bookingHistory, setBookingHistory] = useState([]);

    const getBookingHistory = async () => {
        const response = await fetch("http://localhost:8080/api/tickets/user/" + session?.user?.username);
        if (response.ok) {
            const data = await response.json();
            setBookingHistory(data);
        }
        
    }

    useEffect(() => {
        if (session) {
            setUser(session?.user);
            getBookingHistory();
        }
    }, [session]);
    
    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-4xl w-full m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    Profile
                </h2>
                <div className="size-8" />
            </div>
            <div className="flex flex-col gap-4 w-full bg-neutral-800 rounded-xl p-4">
                <h4 className="text-xl font-bold">
                    Your Profile
                </h4>
                <div className="grid items-center">
                    <h3 className="text-lg font-medium">
                        Name
                    </h3>
                    <p className="text-neutral-400">
                        {user.name}
                    </p>
                    <span className="text-neutral-400 text-sm">
                        {user.role == "ADMIN" ? "Role: Admin" : "Role: User"}
                    </span>
                </div>
                <div className="grid items-center">
                    <h3 className="text-lg font-medium">
                        Username
                    </h3>
                    <p className="text-neutral-400">
                        {user.username}
                    </p>
                </div>
                <div className="grid items-center">
                    <h3 className="text-lg font-medium">
                        Email
                    </h3>
                    <p className="text-neutral-400">
                        {user.email}
                    </p>
                </div>
                <div className="grid items-center">
                    <h3 className="text-lg font-medium">
                        Mobile
                    </h3>
                    <p className="text-neutral-400">
                        {user.mobile}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full bg-neutral-800 rounded-xl p-4">
                <h4 className="text-xl font-bold">
                    Booking History
                </h4>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket Id</TableHead>
                            <TableHead>Train Name</TableHead>
                            <TableHead>Ticket Status</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Seats Booked</TableHead>
                            <TableHead>Seat Type</TableHead>
                            <TableHead>Amount Payed</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Profile;