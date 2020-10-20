import {useCallback, useEffect, useState} from "react";
import {DocumentData, FirestoreCollection, FirestoreDocument} from "..";
import {arrayNullUndefinedFilter} from "./miscellaneous";

export type RefreshCallback = () => {};

export function useFirestoreDocument<T extends DocumentData>(
    collection: FirestoreCollection<T>,
    docId: string
): [T | null, FirestoreDocument<T>, RefreshCallback] {
    const [docValue, setDocValue] = useState<T | null>(null);
    const doc = collection.document(docId); // return same FirestoreDocument instance for each docId
    const refreshCallback = useCallback(async () => {
        setDocValue(await doc.get());
    }, [doc]);
    useEffect(() => {
        refreshCallback().catch((e) => console.error(e));
    }, [refreshCallback]);
    return [docValue, doc, refreshCallback];
}

export function useFirestoreCollection<T extends DocumentData>(
    collection: FirestoreCollection<T>
): [T[], RefreshCallback] {
    const [docValues, setDocValues] = useState<T[]>([]);
    const refreshCallback = useCallback(async () => {
        const allDocument = await collection.get();
        setDocValues(allDocument.filter(arrayNullUndefinedFilter));
    }, [collection]);
    useEffect(() => {
        refreshCallback().catch((e) => console.error(e));
    }, [refreshCallback]);
    return [docValues, refreshCallback];
}
