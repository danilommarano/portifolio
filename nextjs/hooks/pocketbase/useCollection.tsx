import { useState, useEffect } from 'react';
import pb from './pocketbaseClient';

// Assuming you have types for your PocketBase data and error
interface PocketBaseData {
    // Define the structure of the data you expect from your collections
}
interface PocketBaseError {
    message: string;
    // Add other error properties as needed
}

export const useCollection = <T extends PocketBaseData>(
    collectionName: string,
    queryOptions: Record<string, any> = {}
) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<PocketBaseError | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const resultList = await pb.collection(collectionName).getList<T>(
                1, 200, { requestKey: collectionName, ...queryOptions }
            );
            setData(resultList.items);
            console.log("a")
        } catch (e) {
            setError(e as PocketBaseError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refetch: fetchData };
};
