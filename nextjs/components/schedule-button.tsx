import React, { useState } from "react";
import { InlineWidget, PopupWidget } from "react-calendly";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const ScheduleButton = () => {
    return (
        <Dialog>
            <DialogTrigger className="text-white font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 px-3 py-2 rounded-xl">
                contatar
            </DialogTrigger>
            <DialogContent className="w-full">
                <InlineWidget url="https://calendly.com/danilo-m-marano/contato-do-portifolio" />
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleButton;
