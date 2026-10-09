import { makeAutoObservable } from "mobx";

export class UIStore{
    isLoading= false;
    pendingRequests = 0;
    private showTimer: ReturnType<typeof setTimeout> | null = null;

    constructor(){
        makeAutoObservable<UIStore, 'showTimer'>(this, { showTimer: false })
    }

    isBusy(){
        this.pendingRequests++;
        if (this.isLoading || this.showTimer) return;
        this.showTimer = setTimeout(() => this.showLoader(), 300);
    }

    isIdle(){
        this.pendingRequests = Math.max(0, this.pendingRequests - 1);
        if (this.pendingRequests > 0) return;
        if (this.showTimer) {
            clearTimeout(this.showTimer);
            this.showTimer = null;
        }
        this.isLoading= false;
    }

    private showLoader(){
        this.showTimer = null;
        this.isLoading = this.pendingRequests > 0;
    }
}
