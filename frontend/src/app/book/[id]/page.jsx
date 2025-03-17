"use client";

import { use, useEffect, useState } from "react";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";


const BookTicket = ({ params }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { id } = use(params);

    const [train, setTrain] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        const fetchTrain = async () => {
            const response = await fetch(`http://localhost:8080/api/trains/${id}`);
            const data = await response.json();
            setTrain(data);
        }
        fetchTrain();
    }, []);

    const handleBook = async () => {
        const data = {
            trainId: id,
            userId: session?.user?.id,
            passengerName: session?.user?.name,
            passengerEmail: session?.user?.email,
            passengerPhone: session?.user?.mobile,
            bookingDate: date,
        }
        const response = await fetch("http://localhost:8080/api/tickets/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            toast.success("Ticket booked successfully!");
            const ticket = await response.json();
            console.log(ticket);
            router.push(`/tickets/${ticket.id}`);
        } else {
            toast.error("Ticket booking failed! Please try again.");
        }
    }

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-lg w-full m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    Book Ticket
                </h2>
                <div className="size-8" />
            </div>
            {
                train &&
                <div className="flex flex-col gap-2 items-center w-full px-2">
                    <div className="grid grid-cols-2 gap-4 items-center w-full">
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Passenger
                            </h3>
                            <p className="text-neutral-400">
                                {session?.user?.name}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Mobile
                            </h3>
                            <p className="text-neutral-400">
                                {session?.user?.mobile}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Train Name
                            </h3>
                            <p className="text-neutral-400">
                                {train.name}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Train Fare
                            </h3>
                            <p className="text-neutral-400">
                                {train.fare} INR
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                From
                            </h3>
                            <p className="text-neutral-400">
                                {train.from}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                To
                            </h3>
                            <p className="text-neutral-400">
                                {train.to}
                            </p>
                        </div>
                        <div className="flex flex-col w-full">
                            <h3 className="text-lg font-medium">
                                Train Time
                            </h3>
                            <p className="text-neutral-400">
                                {train.time}
                            </p>
                        </div>
                        <div></div>
                        <Input type={"date"} className="w-full col-span-2" onChange={(e) => setDate(e.target.value)} />
                        <Button className="w-full col-span-2" onClick={handleBook}>
                            Book Ticket
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default BookTicket;