import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WrapContextProvider } from './context/WrapContext';
import { ResisterContextProvider } from './context/ResisterContext';
import { ChatContextProvider } from './context/ChatContext';

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
