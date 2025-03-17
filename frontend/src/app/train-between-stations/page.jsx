"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const TrainBetweenStations = () => {

    const router = useRouter();

    const [form, setForm] = useState({
        origin: "",
        destination: "",
    })
    const [trains, setTrains] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/trains/between/" + form.origin + "/" + form.destination);
        const data = await response.json();
        if (data?.trains && data.trains.length > 0) {
            setTrains(data.trains);
        } else {
            toast.error("No trains found!");
        }
    }

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-4xl m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    Train Between Stations
                </h2>
                <div className="size-8" />
            </div>
            {
                trains.length > 0 ? (
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trains.map((train) => (
                                <TableRow key={train.id}>
                                    <TableCell>{train.id}</TableCell>
                                    <TableCell>{train.name}</TableCell>
                                    <TableCell>{train.from}</TableCell>
                                    <TableCell>{train.to}</TableCell>
                                    <TableCell>{train.time}</TableCell>
                                    <TableCell>{train.seats}</TableCell>
                                    <TableCell>{train.fare}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex flex-col gap-2 items-center w-full">
                        <div className="flex gap-2 items-center w-full">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="origin">From Station</Label>
                                <Input type="text" id="origin" placeholder="Ex. BBS" onChange={(e) => setForm({ ...form, origin: e.target.value })} />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="destination">To Station</Label>
                                <Input type="text" id="destination" placeholder="Ex. BLR" onChange={(e) => setForm({ ...form, destination: e.target.value })} />
                            </div>
                        </div>
                        <Button className="w-full" variant={"secondary"} onClick={handleSubmit}>
                            Search
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default TrainBetweenStations;