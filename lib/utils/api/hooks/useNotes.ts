import { useQuery } from "@tanstack/react-query"
import { getNotes } from "../notesApi";

export const useNotes = () => {
    const {data,isLoading   } = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
    });
    return {
        notes: data ,
        isLoadingNotes: isLoading,
    }
}
