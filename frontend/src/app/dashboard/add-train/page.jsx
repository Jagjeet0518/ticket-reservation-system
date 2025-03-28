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

    const [form, setForm] = useState({
        name: "",
        from: "",
        to: "",
        time: "",
        seats: "",
        fare: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            name: form.name,
            from: form.from,
            to: form.to,
            time: form.time,
            seats: form.seats,
            fare: form.fare,
        }

        const response = await fetch("http://localhost:8080/api/trains/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            toast.success("Train added successfully!");
        } else {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-lg w-full m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    Add Train
                </h2>
                <div className="size-8" />
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Train Name</Label>
                    <Input type="text" id="name" placeholder="Train Name" onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="from">From</Label>
                    <Input type="text" id="from" placeholder="Origin Station" onChange={(e) => setForm({ ...form, from: e.target.value })} value={form.from} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="to">To</Label>
                    <Input type="text" id="to" placeholder="Destination Station" onChange={(e) => setForm({ ...form, to: e.target.value })} value={form.to} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="time">Time</Label>
                    <Input type="text" id="time" placeholder="Departure Time" onChange={(e) => setForm({ ...form, time: e.target.value })} value={form.time} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="seats">Seats</Label>
                    <Input type="text" id="seats" placeholder="Total Seats" onChange={(e) => setForm({ ...form, seats: e.target.value })} value={form.seats} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="fare">Fare</Label>
                    <Input type="number" id="fare" placeholder="Seat Fare" onChange={(e) => setForm({ ...form, fare: e.target.value })} value={form.fare} />
                </div>
                <Button className="w-full" variant={"secondary"} onClick={handleSubmit}>
                    Add Train
                </Button>
            </div>
        </div>
    )
}

export default Page;