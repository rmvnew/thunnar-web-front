

export class ToggleAnimate {
    private static instance: ToggleAnimate
    public static getInstance(): ToggleAnimate {
        if (!ToggleAnimate.instance) {
            ToggleAnimate.instance = new ToggleAnimate()
        }
        return ToggleAnimate.instance
    }

    public static toggle: boolean 

    

}