import { create } from "zustand"; 

interface StoreState {
  likes: number;
}

const useStore = create<StoreState>(set => ({
  likes: 0,
  updateLikes: () => set(state => ({ likes: state.likes + 1 }))
}));

export default useStore;
