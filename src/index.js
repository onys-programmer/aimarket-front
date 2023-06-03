import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";
import reportWebVitals from "./reportWebVitals";
import styled from "@emotion/styled";

import { store } from "./app/store";
import { Provider } from "react-redux";
import NavBar from "./components/NavBar";
import { updateToken, updateUser } from "./app/slice";
import axios from "axios";

const S = {
  IndexContainer: styled.div`
    height: fit-content;
    background-color: #f5f5f5;
    padding-top: 70px;
  `,
};

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const root = ReactDOM.createRoot(document.getElementById("root"));

if (token) {
  store.dispatch(updateToken(token));
}
if (user) {
  store.dispatch(updateUser(user));
}

// 전역 인터셉터를 추가합니다.
axios.interceptors.request.use(config => {
  document.body.style.cursor = "wait";
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  document.body.style.cursor = "default";
  return response;
}, error => {
  document.body.style.cursor = "default";
  return Promise.reject(error);
});


root.render(
  <ChakraProvider>
    <Provider store={store}>
      <NavBar />
      <S.IndexContainer>
        <RouterProvider router={router} style={{ marginTop: "70px" }} />
      </S.IndexContainer>
    </Provider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
