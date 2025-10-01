const nameHandler = (io, socket) => {
  const firstOrderCreate = (payload) => {
    console.log("firstOrderCreate called", payload);
    if (payload) {
      socket.emit("firstOrderReceived", { payload: "firstOrderReceived" });
      console.log("done sending");
    }
  };
  const secondOrderRead = (orderId, callback) => {};

  socket.on("handlerName:create", firstOrderCreate);
  socket.on("handlerName:read", secondOrderRead);
};

export { nameHandler };
