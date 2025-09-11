import { io } from "socket.io-client";

const SERVER = import.meta.env.VITE_baseurl;

export const socket = io(SERVER);