/* eslint-disable @next/next/no-img-element */
import * as React from "react"

import { cn } from "@/lib/utils"
import { FilterContext, FilterProvider } from "@/contexts/filterAchivementsContext"
import {
    Achievements,
    AchievementsDescription,
    AchievementsHeader,
    AchievementsTitle,
} from "@/components/achievement";

import { Tech } from "@/interfaces/Technology";
import { Achievement } from "@/interfaces/Achievement";
import { GradientToggle } from "./gradient-toggle";
import { BACKEND_URL } from "@/tools/pocketbaseClient";


const AchievementsGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>((({ className, title, ...props }, ref) => (
    <FilterProvider>
        <div
            ref={ref}
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                className
            )}
            {...props}
        />
    </FilterProvider>
)))
AchievementsGroup.displayName = "AchievementsGroup"

const AchievementsGroupHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-3 p-6", className)}
        {...props}
    />
))
AchievementsGroupHeader.displayName = "AchievementsGroupHeader"

const AchievementsGroupTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
AchievementsGroupTitle.displayName = "AchievementsGroupTitle"

const AchievementsGroupFilter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement
    > & { techs: Tech[] }>(({ className, techs, ...props }, ref) => {

        function removeDuplicates(arr: Tech[]): Tech[] {
            return arr.reduce((acc, cur) => {
                if (!acc.some(obj => obj.id === cur.id)) {
                    acc.push(cur);
                }
                return acc;
            }, [] as Tech[]);
        }

        function sortByObjName(arr: Tech[]): Tech[] {
            return arr.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }

        const { selectedTechs, setSelectedTechs } = React.useContext(FilterContext);
        const uniqueTechs = removeDuplicates(techs);
        const orderedTechs = sortByObjName(uniqueTechs);

        const handleToggleChange = (tech: string) => {
            const newTechs = new Set(selectedTechs);
            if (newTechs.has(tech)) {
                newTechs.delete(tech);
            } else {
                newTechs.add(tech);
            }
            return newTechs;
        };

        return (
            <div ref={ref} className={cn("flex flex-wrap gap-2 text-sm text-muted-foreground", className)} {...props}>
                {uniqueTechs && uniqueTechs.map((tech, index) => (
                    <GradientToggle
                        key={index}
                        pressed={selectedTechs.has(tech.name)}
                        onPressedChange={() => setSelectedTechs(handleToggleChange(tech.name))}
                    >
                        <img
                            alt={tech.name + "'s logo"}
                            className="h-5 w-5"
                            src={
                                BACKEND_URL +
                                "/api/files/" +
                                tech.collectionId +
                                "/" +
                                tech.id +
                                "/" +
                                tech.logo
                            }
                        />
                        <p>{tech.name}</p>
                    </GradientToggle>
                ))}
            </div>
        );
    })
AchievementsGroupFilter.displayName = "AchievementsGroupFilter"

const AchievementsGroupContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        achievements: Achievement[];
    }
>(({ className, achievements, ...props }, ref) => {
    const { selectedTechs } = React.useContext(FilterContext);

    const filteredAchievements = achievements.filter((achievement) => {
        if (selectedTechs.size === 0) {
            return true;
        }
        return achievement.expand.tech.some((tech) => selectedTechs.has(tech.name));
    });
    return (
        <div ref={ref} className={cn("grid grid-cols-6 gap-4 p-6 pt-0", className)} {...props}>
            {filteredAchievements.map((cntt: any, index: number) => (
                <Achievements key={index} href={cntt.link} className={`rounded h-full col-span-2 hover:bg-primary-foreground ${index === 0 ? 'row-span-2' : ''}`}>
                    <AchievementsHeader className="gap-4">
                        <AchievementsTitle className="text-3xl text-secondary-foreground">
                            {cntt.title}
                        </AchievementsTitle>
                        <AchievementsDescription className="flex gap-2">
                            {index === 0
                                ? cntt.description
                                : cntt.subtitle}
                        </AchievementsDescription>
                    </AchievementsHeader>
                </Achievements>
            ))}
        </div>
    )
})

AchievementsGroupContent.displayName = "AchievementsGroupContent"

const AchievementsGroupFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
AchievementsGroupFooter.displayName = "AchievementsGroupFooter"

export {
    AchievementsGroup,
    AchievementsGroupHeader,
    AchievementsGroupFooter,
    AchievementsGroupTitle,
    AchievementsGroupFilter,
    AchievementsGroupContent
}
