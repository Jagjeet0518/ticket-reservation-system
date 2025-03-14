"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SeatAvailability = () => {

    const router = useRouter();

    const [trainNo, setTrainNo] = useState("");

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-4xl m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    Seat Availability
                </h2>
                <div className="size-8" />
            </div>
            <div className="flex flex-col gap-2 items-center w-xl">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="tno">Train Number</Label>
                    <Input type="text" id="tno" placeholder="Ex. 123" onChange={(e) => setTrainNo(e.target.value)} />
                </div>
                <Button className="w-full" variant={"secondary"} onClick={
                    () => {
                        console.log(form);
                    }
                }>
                    Search
                </Button>
            </div>
        </div>
    )
}

export default SeatAvailability;