import { cn } from "@/lib/utils"
import React, { createContext, useState } from 'react';

const Achievements = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { href: string } // Add link prop type
>(({ className, href, ...props }, ref) => {

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(
            "",
            className
        )}>
            <div
                ref={ref}
                className="rounded-lg border bg-card text-card-foreground shadow-sm h-full hover:bg-primary-foreground"
                {...props}
            />
        </a>
    );
});

Achievements.displayName = "Achievements"

const AchievementsHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
AchievementsHeader.displayName = "AchivementHeader"

const AchievementsTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight truncate",
            className
        )}
        {...props}
    />
))
AchievementsTitle.displayName = "AchivementTitle"

const AchievementsDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
AchievementsDescription.displayName = "AchivementDescription"

const AchievementsContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
AchievementsContent.displayName = "AchivementContent"

const AchievementsFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
AchievementsFooter.displayName = "AchivementFooter"

export {
    Achievements,
    AchievementsHeader,
    AchievementsFooter,
    AchievementsTitle,
    AchievementsDescription,
    AchievementsContent,
}
