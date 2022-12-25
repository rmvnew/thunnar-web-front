
export const parseStatus = (order: string) => {
    switch (order) {
        case 'CREATED':
            return 'CRIADA'
        case 'UNDER_ANALYSIS':
            return 'SOB ANÁLISE'
        case 'WAITING_FOR_APPROVAL':
            return 'ESPERANDO APROVAÇÃO'
        case 'IN_PROGRESS':
            return 'EM PROGRESSO'
        case 'FINISHED':
            return 'FINALIZADA'
        default:
            return 'CANCELADA'
    }

    
}


