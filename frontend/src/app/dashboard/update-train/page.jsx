"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
    const router = useRouter();

    const [train, setTrain] = useState(null);
    const [trainNo, setTrainNo] = useState("");

    const getTrain = async () => {
        const response = await fetch(`http://localhost:8080/api/trains/${trainNo}`);

        if (response.ok) {
            const data = await response.json();
            setTrain(data);
        } else {
            toast.error("No train found!");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/trains/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(train),
        });

        if (response.ok) {
            toast.success("Train updated successfully!");
        } else {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-lg w-full m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    Update Train
                </h2>
                <div className="size-8" />
            </div>
            {
                train == null ? (
                    <div className="flex flex-col gap-2 items-center w-full">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="id">Train Number</Label>
                            <Input type="number" id="id" placeholder="Train No" value={trainNo} onChange={(e) => setTrainNo(e.target.value)} />
                        </div>
                        <Button className="w-full" variant={"secondary"} onClick={getTrain}>
                            Search
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 items-center w-full">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="tr-id">Train Number</Label>
                            <Input type="number" disabled id="tr-id" placeholder="Train No" value={train.id} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Train Name</Label>
                            <Input type="text" id="name" placeholder="Train Name" onChange={(e) => setTrain({ ...train, name: e.target.value })} value={train.name} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="from">From</Label>
                            <Input type="text" id="from" placeholder="Origin Station" onChange={(e) => setTrain({ ...train, from: e.target.value })} value={train.from} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="to">To</Label>
                            <Input type="text" id="to" placeholder="Destination Station" onChange={(e) => setTrain({ ...train, to: e.target.value })} value={train.to} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="time">Time</Label>
                            <Input type="text" id="time" placeholder="Departure Time" onChange={(e) => setTrain({ ...train, time: e.target.value })} value={train.time} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="seats">Seats</Label>
                            <Input type="text" id="seats" placeholder="Total Seats" onChange={(e) => setTrain({ ...train, seats: e.target.value })} value={train.seats} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="fare">Fare</Label>
                            <Input type="number" id="fare" placeholder="Seat Fare" onChange={(e) => setTrain({ ...train, fare: e.target.value })} value={train.fare} />
                        </div>
                        <Button className="w-full" variant={"secondary"} onClick={handleSubmit}>
                            Update
                        </Button>
                    </div >

                )
            }
        </div >
    )
}

export default Page;