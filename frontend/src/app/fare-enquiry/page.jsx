"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FareEnquiry = () => {

    const router = useRouter();

    const [form, setForm] = useState({
        trainNo: "",
        seatType: "",
    })

    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-4xl m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    Fare Enquiry
                </h2>
                <div className="size-8" />
            </div>
            <div className="flex flex-col gap-2 items-center w-lg">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="tno">Train Number</Label>
                    <Input type="text" id="tno" placeholder="Ex. 123" onChange={(e) => setForm({ ...form, trainNo: e.target.value })} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="seat">Seat Type</Label>
                    <Select id="seat" value={form.seatType} onValueChange={(value) => setForm({ ...form, seatType: value })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a seat type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1a">First AC (1A)</SelectItem>
                            <SelectItem value="2a">Second AC (2A)</SelectItem>
                            <SelectItem value="sl">Sleeper (SL)</SelectItem>
                            <SelectItem value="2s">Second Sitting (2S)</SelectItem>
                        </SelectContent>
                    </Select>
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

export default FareEnquiry;