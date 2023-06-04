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
import { updateUser, logOut } from "./app/slice";
import axios from "axios";

const S = {
  IndexContainer: styled.div`
    height: fit-content;
    background-color: #f5f5f5;
    padding-top: 70px;
  `,
};

const user = JSON.parse(localStorage.getItem("user"));

const root = ReactDOM.createRoot(document.getElementById("root"));

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

// Axios 인터셉터
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // 오류가 401(Unauthorized)일 때 처리
    if (error.response.status === 401) {
      // Redux 상태에서 사용자 정보 확인
      const user = store.getState().user;
      if (user) {
        // 사용자 정보가 있을 경우 로그아웃 처리
        store.dispatch(logOut());
        if (window.confirm('로그인이 만료되었습니다. 다시 로그인해주세요.')) {
          window.location.href = '/';
        }
      }
    }

    return Promise.reject(error);
  }
);


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
