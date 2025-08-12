import { Router } from "express";
import { addTimeSlots, allBookings, assignOrgzer, deleteEvent, editEvent, listAllEvents, setNewEvent, setSales } from "../controllers/eventController.js";
import verifyToken from "../middlewares/verifyToken.js";

const eventRouter = Router();

eventRouter.post("/post", verifyToken, setNewEvent);

eventRouter.patch('/patch/:id', verifyToken, editEvent)

eventRouter.delete('/delete/:id', verifyToken, deleteEvent)

eventRouter.put('/put/:id', verifyToken, assignOrgzer)

eventRouter.get('/get', verifyToken, listAllEvents)


//organizer routes
eventRouter.patch('/org/time/:id', verifyToken, addTimeSlots)

eventRouter.post('/org/sale/:id', verifyToken, setSales)

eventRouter.get('/org/get', verifyToken,allBookings)

export default eventRouter;
