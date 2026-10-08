import { createContext } from "react";
import { UIStore } from "./UIStore";
import { ActivityStore } from "./activityStore";

interface Store{
    uiStore:UIStore
    activityStore: ActivityStore
}

export const store: Store= {
    uiStore: new UIStore(),
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);
