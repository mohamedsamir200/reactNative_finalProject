import{createSlice} from'@reduxjs/toolkit';
const profileSlice=createSlice({
name :"profileid",
initialState:{
    id:null,
},
reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
})
export const { setId } = profileSlice.actions;
export default profileSlice.reducer;
