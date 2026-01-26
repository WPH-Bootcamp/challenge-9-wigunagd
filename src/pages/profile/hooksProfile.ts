import { useQuery } from "@tanstack/react-query"
import { getProfile } from "./apiProfile";
import type { IProfileResponse } from "./typeProfile";
import type { AxiosError } from "axios";

export const useGetProfile = () => {
    return useQuery<IProfileResponse, AxiosError>({
        queryKey: ['profile'],
        queryFn: () => getProfile()
    });
}