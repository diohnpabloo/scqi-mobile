import { createContext, ReactNode, useState } from "react";
import { ConsultationDTO } from "@dtos/ConsultationDTO";
import { api } from "../service/api";

export type ConsultationContextDataProps = {
    consultationData: ConsultationDTO | undefined
    query: (cpf: string, name: string, surname: string, mother_name: string, date_of_birth: string) => Promise<void>
    isLoadingOffenderData: boolean
}

type ConsultationContextProviderProps = {
    children: ReactNode
}

export const ConsultationContext = createContext<ConsultationContextDataProps>({} as ConsultationContextDataProps)

export function ConsultationContextProvider({ children }: ConsultationContextProviderProps) {
    const [consultationData, setConsultationData] = useState<ConsultationDTO>()
    const [isLoadingOffenderData, setIsLoadingOffenderData] = useState(false)

    async function query(cpf: string, name: string, surname: string, mother_name: string, date_of_birth: string) {
        try {
            const params: any = {};

            if (cpf) params.cpf = cpf;
            if (name) params.name = name;
            if (surname) params.surname = surname;
            if (mother_name) params.mother_name = mother_name;
            if (date_of_birth) params.date_of_birth = date_of_birth;

            const { data } = await api.get("/offenders", { params });

            if (data.id) {
                setIsLoadingOffenderData(true);
                setConsultationData(data);
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingOffenderData(false)
        }
    }

    return (
        <ConsultationContext.Provider value={{ consultationData, query, isLoadingOffenderData }}>
            {children}
        </ConsultationContext.Provider>
    )
}