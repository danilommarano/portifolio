
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { Toggle } from "./ui/toggle"

const GradientToggle = React.forwardRef<
    React.ElementRef<typeof TogglePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, children, ...props }, ref) => {
    return (
        <Toggle
            ref={ref}
            className={`flex gap-2 p-0.5 h-fit items-center rounded transition ease-in duration-500 hover:bg-gradient-to-l hover:from-indigo-400 hover:to-pink-400 ${props.pressed ? 'bg-gradient-to-l from-indigo-500 to-pink-500' : 'bg-gray-300'}`} // Update here
            {...props}
        >
            <div className="flex gap-2 h-8 px-2 py-1 items-center rounded bg-background">
                {children}
            </div>
        </Toggle>
    )
})

GradientToggle.displayName = 'GradientToggle'

export { GradientToggle }
