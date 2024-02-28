import React, { useState, useEffect } from "react";
import { useCollection } from "@/hooks/pocketbase/useCollection";

import Image from "next/image";

const BACKEND_URL = "http://localhost:8080";

interface Word {
    collectionId: string,
    collectionName: string,
    created: string,
    icon: string,
    id: string,
    name: string,
    updated: string,
}

function WordCycler({ className }: { className?: string }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayWord, setDisplayWord] = useState<Word | null>(null); // Allow for null initial state
    const { data: words, loading, error, refetch } = useCollection('working_area')

    useEffect(() => {
        if (words) {
            if (words.length > 0) {
                setDisplayWord(words[currentWordIndex] as Word);

                const intervalId = setInterval(() => {
                    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                }, 2000);

                return () => clearInterval(intervalId);
            }
        }
    }, [words, currentWordIndex]);

    if (displayWord !== null) {
        return (
            <div className="flex items-center gap-4">
                <Image
                    alt="teste"
                    width={40}
                    height={40}
                    src={
                        BACKEND_URL +
                        "/api/files/" +
                        displayWord?.collectionId +
                        "/" +
                        displayWord?.id +
                        "/" +
                        displayWord?.icon
                    }

                />
                <p className={className}>
                    {displayWord?.name}
                </p>
            </div>
        );
    }
}

export default WordCycler;