export class Filter {
    category: string;
    minViewers: number;
    maxViewers: number;
    maxMinutesStreamed: number;
    minutesToRaid: number;

    constructor(initialFilter: any) {
        this.category = initialFilter?.category ? initialFilter.category : 'Music';
        this.minViewers = initialFilter?.minViewers ? initialFilter?.minViewers : 0;
        this.maxViewers = initialFilter?.maxViewers ? initialFilter?.maxViewers : 3000;
        this.maxMinutesStreamed = initialFilter?.maxMinutesStreamed ? initialFilter?.maxMinutesStreamed : 120;
        this.minutesToRaid = initialFilter?.minutesToRaid ? initialFilter?.minutesToRaid : 30;
    }
}
