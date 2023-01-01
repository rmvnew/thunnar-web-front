import { Pas } from "./Pas.interface";



export interface Device {
    device_id:number,
    device_brand: string,
    device_model: string,
    device_serial_number: string,
    device_imei: string,
    device_problem_reported: string,
    device_problem_detected?: string,
    parts_and_services?: Pas[]
}