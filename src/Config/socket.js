import React from "react";
import io from "socket.io-client";
import { baseURL } from "./server";

export const socket = io.connect(baseURL);
export const SocketContext = React.createContext();