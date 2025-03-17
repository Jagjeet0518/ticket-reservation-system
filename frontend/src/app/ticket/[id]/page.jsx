"use client";

import { use, useEffect, useState } from "react";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


const Ticket = ({ params }) => {
    const router = useRouter();
    const { id } = use(params);

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            const response = await fetch(`http://localhost:8080/api/tickets/${id}`);
            const data = await response.json();
            setTicket(data);
        }
        fetchTicket();
    }, []);

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-lg w-full m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    E-Ticket
                </h2>
                <div className="size-8" />
            </div>
            {
                ticket &&
                <div className="flex flex-col gap-2 items-center w-full px-2">
                    <div className="grid grid-cols-2 gap-4 items-center w-full">
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Passenger
                            </h3>
                            <p className="text-neutral-400">
                                {ticket.passengerName}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Seat Number
                            </h3>
                            <p className="text-neutral-400">
                                {ticket.seatNumber}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Train
                            </h3>
                            <p className="text-neutral-400">
                                {ticket.train.name}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Amount
                            </h3>
                            <p className="text-neutral-400">
                                {ticket.train.fare} INR
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                From
                            </h3>
                            <p className="text-neutral-400">
                                {ticket.train.from}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                To
                            </h3>
                            <p className="text-neutral-400">
                                {ticket.train.to}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Train Time
                            </h3>
                            <p className="text-neutral-400">
                                {ticket.train.time}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Booking Date
                            </h3>
                            <p className="text-neutral-400">
                                {new Date(ticket.bookingDate).toLocaleDateString("en-IN", {day: "2-digit", month: "short", year: "numeric"})}
                            </p>
                        </div>
                        <div className="w-full col-span-2 px-4 py-2 flex items-center justify-center bg-neutral-800 rounded-lg">
                            Status: Confirmed
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Ticket;