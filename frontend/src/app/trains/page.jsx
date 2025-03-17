"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Trains = () => {
    const [trains, setTrains] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTrains = async () => {
            const response = await fetch("http://localhost:8080/api/trains/all");
            const data = await response.json();
            setTrains(data);
        }
        fetchTrains();
    }, []);

    const bookTicket = (trainId) => {
        return () => {
            router.push(`/trains/${trainId}/book-ticket`);
        }
    }

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-4xl w-full m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    All Trains Available
                </h2>
                <div className="size-8" />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>From Station</TableHead>
                        <TableHead>To Station</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Total Seats</TableHead>
                        <TableHead>Fare</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trains.length > 0 ? trains.map((train) => (
                        <TableRow key={train.id}>
                            <TableCell>{train.id}</TableCell>
                            <TableCell>{train.name}</TableCell>
                            <TableCell>{train.from}</TableCell>
                            <TableCell>{train.to}</TableCell>
                            <TableCell>{train.time}</TableCell>
                            <TableCell>{train.seats}</TableCell>
                            <TableCell>{train.fare}</TableCell>
                            <TableCell>
                                <Button variant={"secondary"} onClick={bookTicket(train.id)}>Book Ticket</Button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={8}>
                                <p className="text-center text-neutral-500">
                                    No Trains Available
                                </p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Trains;