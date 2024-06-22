import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    console.log("calling fetch weather");
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=51.4416&lon=5.4697&appid=69d12097e5eb3ee7e7b6ae52751068c1"
    );

    const responseTemp = Math.round(response.data.main.temp - 273.15); // تصحيح درجة الحرارة
    const description = response.data.weather[0].description;
    const minTemp = Math.round(response.data.main.temp_min - 273.15);
    const maxTemp = Math.round(response.data.main.temp_max - 273.15);
    const icon = response.data.weather[0].icon; // الحصول على أيقونة الطقس

    console.log(response);

    // setTemp({
    //   number: responseTemp,
    //   description: description,
    //   min: minTemp,
    //   max: maxTemp,
    //   icon: icon
    // });
    return {
      number: responseTemp,
      description: description,
      min: minTemp,
      max: maxTemp,
      icon: icon
    };
  }
);
const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const { changeResult } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
