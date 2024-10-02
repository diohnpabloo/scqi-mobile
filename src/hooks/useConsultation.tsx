import { useContext } from "react";
import { ConsultationContext } from "@contexts/ConsultationContext";

export function useConsultation() {
    const context = useContext(ConsultationContext)

    return context
}