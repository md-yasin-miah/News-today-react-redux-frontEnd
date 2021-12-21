import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//use redux-persist to sink data in redux and localhost.
const initialState = {
  latestNews: [],
  allNews: [],
  singleNewsDetails: [],
  newsOnTopic: [],
  readLater: [],
};

export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatestNews',
  async () => {
    const response = await fetch('https://peaceful-river-87601.herokuapp.com/latestNews')
      .then(res => res.json());
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetchAllNews = createAsyncThunk(
  'news/fetchAllNews',
  async () => {
    const response = await fetch('http://localhost:5000/allLatestNews')
      .then(res => res.json());
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetchSingleNewsForDetails = createAsyncThunk(
  'news/fetchSingleNewsForDetails',
  async (id) => {
    const response = await fetch(`https://peaceful-river-87601.herokuapp.com/newsDetails/${id}`)
      .then(res => res.json())
    // The value we return becomes the `fulfilled` action payload
    return response;

  }
);
export const fetchNewsWithTopic = createAsyncThunk(
  'news/fetchNewsWithTopic',
  async (topic) => {
    const response = await fetch(`http://localhost:5000/news/${topic}`)
      .then(res => res.json())
    // The value we return becomes the `fulfilled` action payload
    return response;

  }
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addToReadLater: (state, action) => {
      if (state.readLater.length) {
        if (state.readLater.find(news => news._id === action.payload._id)) {
          alert('This News Already Added, Check Profile');
          return;
        }
      }
      state.readLater.push(action.payload);
    },
    removeFromReadLater: (state, { payload }) => {
      state.readLater = state.readLater.filter(singleNews => singleNews._id !== payload)
    },
  },

  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(fetchLatestNews.fulfilled, (state, action) => {
      state.latestNews = action.payload;
    })
    builder.addCase(fetchAllNews.fulfilled, (state, action) => {
      state.allNews = action.payload;
    })
    builder.addCase(fetchSingleNewsForDetails.fulfilled, (state, action) => {
      state.singleNewsDetails = action.payload;
    })
    builder.addCase(fetchNewsWithTopic.fulfilled, (state, action) => {
      state.newsOnTopic = action.payload;
    })
  },
});

export const { addToReadLater, removeFromReadLater } = newsSlice.actions;
export default newsSlice.reducer;
