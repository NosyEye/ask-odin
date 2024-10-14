export class Filter {
    category: string;
    minViewers: number;
    maxViewers: number;
    maxMinutesStreamed: number;
    minutesToRaid: number;

    constructor() {
        this.category = 'Music';
        this.minViewers = 0;
        this.maxViewers = 3000;
        this.maxMinutesStreamed = 120;
        this.minutesToRaid = 30;
    }
}
