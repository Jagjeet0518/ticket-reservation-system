"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const router = useRouter();

    const [form, setForm] = useState({
        trainNo: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/trains/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.trainNo),
        });

        if (response.ok) {
            toast.success("Train deleted successfully!");
        } else {
            toast.error("Something went wrong!");
        }
    }
    return (
        <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-4 max-w-lg w-full m-auto gap-6">
            <div className="flex justify-between items-center w-full">
                <MoveLeft className="size-8 text-neutral-100" onClick={() => router.back()} />
                <h2 className="text-2xl font-bold">
                    Delete Train
                </h2>
                <div className="size-8" />
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="tno">Train Number</Label>
                    <Input type="number" id="tno" placeholder="Ex. 123" onChange={(e) => setForm({ ...form, trainNo: e.target.value })} value={form.trainNo} />
                </div>
                <Button className="w-full" variant={"secondary"} onClick={handleSubmit}>
                    Delete Train
                </Button>
            </div>
        </div>
    );
}