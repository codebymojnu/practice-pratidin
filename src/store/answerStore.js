import { create } from "zustand";

const useAnswerStore = create((set) => ({
    answerData: null,
    setAnswerData: (data) => set({ answerData: data }),
}));

export default useAnswerStore;
