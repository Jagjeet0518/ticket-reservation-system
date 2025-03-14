"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const trainData = [
    {
        name: "ICE 1",
        number: 123,
        from: "Mumbai",
        to: "Pune",
        departure: "11:30",
        arrival: "15:00",
        seats: 100,
        fare: 150,
    },
    {
        name: "ICE 2",
        number: 124,
        from: "Mumbai",
        to: "Pune",
        departure: "11:30",
        arrival: "15:00",
        seats: 100,
        fare: 150,
    },
    {
        name: "ICE 3",
        number: 125,
        from: "Mumbai",
        to: "Pune",
        departure: "11:30",
        arrival: "15:00",
        seats: 100,
        fare: 150,
    }
]

const Trains = () => {
    const [trains, setTrains] = useState([]);
    const router = useRouter();

    useEffect(() => {
        setTrains(trainData);
    }, []);

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-4xl m-auto gap-6">
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
                        <TableHead>Name</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>From Station</TableHead>
                        <TableHead>To Station</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Seats Available</TableHead>
                        <TableHead>Fare</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trains.map((train) => (
                        <TableRow key={train.number}>
                            <TableCell>{train.name}</TableCell>
                            <TableCell>{train.number}</TableCell>
                            <TableCell>{train.from}</TableCell>
                            <TableCell>{train.to}</TableCell>
                            <TableCell>{train.departure}</TableCell>
                            <TableCell>{train.seats}</TableCell>
                            <TableCell>{train.fare}</TableCell>
                            <TableCell>
                                <Button variant={"secondary"}>Book Ticket</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Trains;