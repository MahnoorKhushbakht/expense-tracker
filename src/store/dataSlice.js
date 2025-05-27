import { createDocument, getAllDocuments, getDocuments } from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getData = createAsyncThunk(
  "expenses/getData",
  async (_, thunkAPI) => {
    try {
      const expense = await getDocuments();
      return expense;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getAllData = createAsyncThunk(
  "expenses/getAllData",
  async (_, thunkAPI) => {
    try {
      const expense = await getAllDocuments();
      return expense;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addData = createAsyncThunk(
  "expenses/addData",
  async ({ data }, thunkAPI) => {
    try {
      const expense = await createDocument(data);
      return expense;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const initialState = {
  expensesData: [],           
  loading: true,
  totalExpense:0,
  totalIncome:0,
  totalAmount:0,
  error: null
};


const dataSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addAmount: (state,action) => {
      state.totalAmount = action.payload.reduce(
        (accumulator, item) => accumulator + parseFloat(item.amount),
        0
      )
    },
    addExpense: (state,action) => {
      state.totalExpense = action.payload.filter(item => (
        item.category === 'Expense'
      )).reduce(
        (accumulator, item) => accumulator + parseFloat(item.amount),
      0
      )
    },
    addIncome: (state,action) => {
      state.totalIncome =  action.payload.filter(item => (
        item.category === 'Income'
      )).reduce(
        (accumulator, item) => accumulator + parseFloat(item.amount),
      0
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.expensesData = action.payload; 
        state.loading = false;
      })
      .addCase(getData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

   
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => { 
        state.expensesData = action.payload;
        state.loading = false;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

 
      .addCase(addData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addData.fulfilled, (state, action) => {
        console.log("✅ Data in fulfilled:", action.payload);
        state.expensesData.push(action.payload); 
        state.loading = false;
      })
      .addCase(addData.rejected, (state, action) => {
        console.log("❌ Data in rejected:", action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { addAmount, addExpense, addIncome } = dataSlice.actions;
export default dataSlice.reducer;
