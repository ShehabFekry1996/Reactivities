import { makeAutoObservable } from "mobx";

export class ActivityStore {
    filter = 'all';
    startDate = new Date().toISOString();
    sortOrder = 'asc';
    category = '';
    search = '';

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

    setCategory = (category: string) => {
        this.category = category;
    }

    setSearch = (search: string) => {
        this.search = search;
    }

    resetFilters = () => {
        this.filter = 'all';
        this.startDate = new Date().toISOString();
        this.sortOrder = 'asc';
        this.category = '';
        this.search = '';
    }

    get activeFilterCount() {
        return [this.filter !== 'all', this.sortOrder !== 'asc', !!this.category, !!this.search]
            .filter(Boolean).length;
    }
}
