
import { ValidType } from "../enums/enums";


export class Validations {

    private static instance: Validations
    public static getInstance(): Validations {
        if (!Validations.instance) {
            Validations.instance = new Validations();
        }
        return Validations.instance;
    }

    validateWithRegex(str: string, ...valid: any[]) {

        valid.forEach(data => {

            if (data === ValidType.IS_NUMBER) {
                if (this.validRegex(/[a-zA-Z!@#$%^&*(),.?":{}|<>]/gm, str)) {
                    return false
                } else {
                    return true
                }
            }

            if (data === ValidType.IS_STRING) {
                if (this.validRegex(/[\d]/g, str)) {
                    return false
                } else {
                    return true
                }
            }

            if (data === ValidType.NO_SPACE) {
                if (this.validRegex(/\s+/g, str)) {
                    return false
                } else {
                    return true
                }
            }

            if (data === ValidType.NO_MANY_SPACE) {
                if (this.validRegex(/\s +/g, str)) {
                    return false
                } else {
                    return true
                }
            }

            if (data === ValidType.NO_SPECIAL_CHARACTER) {
                if (this.validRegex(/[!@#$%^&*(),.?":{}|<>-]/g, str)) {
                    return false
                } else {
                    return true
                }
            }

            if (data === ValidType.IS_EMAIL) {
                if (!this.validRegex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i, str)) {
                    return false
                } else {
                    return true
                }
            }

            if (data === ValidType.DATE) {
                if (!this.validRegex(/\d{2}\/\d{2}\/\d{4}/g, str)) {
                    return false
                } else {
                    return true
                }
            }

            if (data === ValidType.DATE_BR) {
                if (!this.validRegex(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g, str)) {
                    return false
                } else {
                    return true
                }
            }

        })
    }

    verifyLength(value: string, description: string = 'campo', min: number = 0, max: number = 0) {

        let checkOne = false
        let checkTwo = false
        let checkThree = false

        if (value === null || value === undefined || value === '') {
            checkOne = false
        } else {
            checkOne = true
        }



        if (min !== null) {
            if (value.length < min) {
                checkTwo = false
            } else {
                checkTwo = true
            }
        }

        if (max !== null) {
            if (value.length > max) {
                checkThree = false
            } else {
                checkThree = true
            }

        }

        if (checkOne && checkTwo && checkThree) {
            return true
        }

        return false

    }

    validRegex(regex: RegExp, value: string): boolean {
        return regex.test(value);
    }

}