import { makeAutoObservable } from "mobx";

export class ActivityStore {
    filter = 'all';
    startDate = new Date().toISOString();
    sortOrder = 'asc';

    constructor() {
        makeAutoObservable(this)
    }

    setFilter = (filter: string) => {
        this.filter = filter;
    }

    setStartDate = (date: Date) => {
        this.startDate = date.toISOString();
    }

    setSortOrder = (sortOrder: string) => {
        this.sortOrder = sortOrder;
    }
}
