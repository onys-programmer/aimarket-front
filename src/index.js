import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react"
import {
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import router from './router';
import reportWebVitals from './reportWebVitals';
import styled from '@emotion/styled';

import { store } from './app/store'
import { Provider } from 'react-redux'
import NavBar from './components/NavBar';
import { updateToken } from './app/slice';

const S = {
  IndexContainer: styled.div`
    height: fit-content;
    background-color: #f5f5f5;
    padding-top: 70px;
  `,
};

const token = localStorage.getItem('token'); // 로컬 스토리지 사용

const root = ReactDOM.createRoot(document.getElementById('root'));

if (token) {
  store.dispatch(updateToken(token)); // 예시: Redux 액션을 통한 업데이트
}

root.render(
  <ChakraProvider>
    <Provider store={store}>
      <NavBar />
      <S.IndexContainer >
        <RouterProvider router={router} style={{ marginTop: "70px" }} />
      </S.IndexContainer>
    </Provider>
  </ChakraProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
