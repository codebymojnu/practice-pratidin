import { create } from "zustand";

const useResultStore = create((set) => ({
    resultData: null,
    setResultData: (data) => set({ resultData: data }),
}));

export default useResultStore;
