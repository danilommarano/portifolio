"use client"

import { ListItem } from "@/components/list-item";
import Navbar from "@/components/navbar";
import Logo from "@/components/logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { useEffect, useState } from "react";
import pb from "@/tools/pocketbaseClient";
import { Boxes } from "@/components/ui/background-boxes";
import WordCycler from "@/components/word-cycler";
import { RecordModel } from "pocketbase";
import { AchievementsGroup, AchievementsGroupContent, AchievementsGroupHeader, AchievementsGroupTitle, AchievementsGroupFilter } from "@/components/achievements-group";
import { Achievement } from "@/interfaces/Achievement";
import { title } from "@/tools/title";
import { unique } from "@/tools/unique";
import ScheduleButton from "@/components/schedule-button";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [achievements, setachievements] = useState<RecordModel[]>();

  async function fetchachievements() {
    const expand = 'tech,type'
    const sort = 'priority'
    try {
      const responseResult = await pb.collection('achievements').getList(1, 50, {
        expand: expand, sort: sort
      })
      const achievementsList = responseResult.items;
      const uniqueContentTypes = unique(achievementsList.map((item) => item.expand?.type?.name))
      let result: any = uniqueContentTypes.reduce(
        (acc: any, stringValue) => [...acc, { name: stringValue, techs: [], achievements: [] }], []
      );

      uniqueContentTypes.map((contentType) => {
        achievementsList.map((content) => {
          if (content.expand?.type.name === contentType) {
            result.map((res: any, index: number) => {
              if (res.name === contentType) {
                result[index].achievements.push(content)
                result[index].techs = unique(
                  result[index].techs.concat(content.expand?.tech)
                )
              }
            })
          }
        })
      })
      setachievements(result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchachievements();
    setIsLoading(false);
  }, []);

  if (typeof window !== 'undefined') {
    window.addEventListener("scroll", function () {
      const firstSection = document.getElementById("first-section");
      const triggerPosition = 400;

      if (firstSection !== null) {
        if (window.scrollY >= triggerPosition) {
          firstSection.style.opacity = "0";
        } else {
          firstSection.style.opacity = "1";
        }

      }
    });
  }



  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(achievements)

  return (
    <>
      <Navbar>
        <Logo />
        <NavigationMenu>
          <NavigationMenuList>
            {achievements?.map((achievment, index: number) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{title(achievment.name)}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {achievment.achievements.map((achiv: Achievement, index: number) => (
                      <ListItem key={index} href="/docs" title={title(achiv.title)}>
                        {achiv.subtitle}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <ScheduleButton />
      </Navbar>

      <div className="container flex relative flex-col items-center gap-12">
        <Boxes className="-z-10 fixed" />
        <section
          id="first-section"
          className="container flex fixed justify-center items-center h-[400px] w-full mt-24 "
        >
          <div className="flex flex-col gap-4 items-left text-5xl font-bold">
            <p>Criando soluções digitais com</p>
            <WordCycler />
          </div>
        </section>
        <div className="flex flex-col gap-8 pt-[500px] z-10 pb-20">
          {achievements && achievements.map((achiv) => (
            <AchievementsGroup className="w-full" key={achiv.name}>
              <AchievementsGroupHeader>
                <AchievementsGroupTitle className="text-4xl capitalize">
                  {achiv.name}
                </AchievementsGroupTitle>
                <AchievementsGroupFilter techs={achiv.techs} />
              </AchievementsGroupHeader>
              <AchievementsGroupContent achievements={achiv.achievements} />
            </AchievementsGroup>
          ))}
        </div>
      </div>
    </>
  );
}
