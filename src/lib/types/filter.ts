export class Filter {
    minViewers: number;
    maxViewers: number;
    maxMinutesStreamed: number;
    minutesToRaid: number;

    constructor() {
        this.minViewers = 0;
        this.maxViewers = 3000;
        this.maxMinutesStreamed = 120;
        this.minutesToRaid = 30;
    }
}
