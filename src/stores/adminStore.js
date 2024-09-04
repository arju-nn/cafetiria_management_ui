import create from "zustand";
import { devtools } from "zustand/middleware";

const cafeteriaStore = (set) => ({
    items: [],

    addItem: (newitem) => {
        console.log('newitem: ', newitem);
        set((state) => ({
            items: [newitem, ...state.items],
        }));
    },
    setItems: (apiitems) => {
        set((state) => ({
            items: [...apiitems],
        }));
    },

    updateItem: (editData) => {
        set((state) => ({
            items: state.items.map((item) =>
                item.id === editData.id
                    ? { ...item, ...editData }
                    : item
            ),
        }));
    },

});

const useCafeteriaStore = create(devtools(cafeteriaStore));

export default useCafeteriaStore
