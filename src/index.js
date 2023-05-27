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

const S = {
  Container: styled.div`
    height: fit-content;
    background-color: #f5f5f5;  
  `,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <S.Container>
          <RouterProvider router={router} />
        </S.Container>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
