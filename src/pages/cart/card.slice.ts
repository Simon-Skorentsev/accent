import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RawItem } from '../../api/mockApi';

export interface CartState {
    items: Item[],
    count: number,
}

const initialState: CartState = {
    items: getFromLS().arr,
    count: getFromLS().count,
};

export const cartSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    plusCount: (state, action: PayloadAction<{item: RawItem, plus: number}>) => {
        const [rawItem, plus] = [action.payload.item, action.payload.plus];
        const index = state.items.findIndex(i => i.id === rawItem.id);
        if (index !== -1) {
            const item = state.items[index];
            if (item.count + plus <= 0) {
                item.count = 0;
                state.items.splice(index, 1);
                state.count = getItemsCount(state.items);
            } else {
                item.count += plus;
            }
            state.count = getItemsCount(state.items);
            setToLS(state.items);
        } else {
            if (plus > 0) {
                const newItem: Item = { ...rawItem, count: plus };
                state.items.push(newItem);
                state.count = getItemsCount(state.items);
                setToLS(state.items);
            }
        }
    },
    reset: (state) => {
        state.items = [];
        state.count = 0;
        setToLS([]);
    },
  },
});

//в реальном проекте лучше в бд кнш
function getFromLS() {
    const items = localStorage.getItem("cartItems");
    if (items == null) {
        return {arr: [], count: 0};
    } else {
        const arr: Item[] = JSON.parse(items)
        return {arr, count: getItemsCount(arr)};
    }
}

function setToLS(items: Item[]) {
    localStorage.setItem("cartItems", JSON.stringify(items));
}

function getItemsCount(arr: Item[]) {
    let count = 0;
    arr.forEach(item => {
        count += item.count;
    })
    return count;
}

export interface Item extends RawItem {
    count: number
}

export const { plusCount, reset } = cartSlice.actions;

export default cartSlice.reducer;