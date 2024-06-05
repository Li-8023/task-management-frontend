import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async(userData) => {
    try{

    }catch(error){
        console.log("catch error: " + error);
    }
});