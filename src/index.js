import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WrapContextProvider } from './context/WrapContext';
import { ResisterContextProvider } from './context/ResisterContext';
import { ChatContextProvider } from './context/ChatContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WrapContextProvider>
    <ResisterContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </ResisterContextProvider>
  </WrapContextProvider>
);
