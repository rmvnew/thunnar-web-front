

export enum AlertTypes {
    ERROR = 'error',
    WARNING = 'warning',
    INFORMATION = 'information',
    SUCCESS = 'success'
}

export enum ValidType {
    NO_SPACE = 'NO_SPACE',
    NO_MANY_SPACE = 'NO_MANY_SPACE',
    IS_STRING = 'IS_STRING',
    IS_NUMBER = 'IS_NUMBER',
    IS_NUMBER_FLOAT = 'IS_NUMBER_FLOAT',
    NO_SPECIAL_CHARACTER = 'NO_SPECIAL_CHARACTER',
    IS_EMAIL = 'IS_EMAIL',
    DATE = 'DATE',
    DATE_BR = 'DATE_BR',
    IS_CNPJ = 'IS_CNPJ'

}

export enum OrderStatus {
    CREATED = 'CREATED',
    UNDER_ANALYSIS = 'UNDER_ANALYSIS',
    WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
    CANCELED = 'CANCELED'
}
