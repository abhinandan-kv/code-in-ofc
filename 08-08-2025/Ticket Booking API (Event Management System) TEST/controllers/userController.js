import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";
import Event from "../models/eventModel.js";

export async function postNewUser(req, res) {
  const { name, email, password, role } = req.body;
  const SaltRound = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, SaltRound);
    // console.log("hashedPassword :-", hashedPassword);

    const result = await Users.create({ name: name, email: email, hashedPassword: hashedPassword, role: role });

    res.status(200).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function getSignIn(req, res) {
  const { name, email, password } = req.body;
  try {
    const getUserFromDB = await Users.findOne({ where: { email: email } });
    const hashedPassword = getUserFromDB.hashedPassword;

    const matchPassword = await bcrypt.compare(password, hashedPassword);
    console.log("matchedPassord:-", matchPassword);

    const token = jwt.sign({ id: getUserFromDB.id, name: getUserFromDB.name, role: getUserFromDB.role }, "default_secret", { expiresIn: "6h" });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function getAllUser(req, res) {
  const { role } = req.user;

  try {
    if (role !== "Admin") {
      throw new Error("You are not authorized");
    }
    const result = await Users.findAll();
    // console.log(result)
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

//user event browse

export async function listAllEvents(req, res) {
  try {
    const result = await Event.findAll({ attributes: ["id", "eventName", "oranizerName", "timeSlot", "price", "saleEndDate"] });

    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function listEventTimeSlots(req, res) {
  const pId = req.params.id;

  try {
    const result = await Event.findByPk(pId, { attributes: ["id", "eventName", "timeSlot"] });
    // const result = await Event.findAll({ where: { id: pId } }, { attributes: ["id", "eventName", "timeSlot"] });
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function bookTicket(req, res) {
  const { pId, pSlot } = req.body; //event id
  const { id } = req.user; //useid

  try {
    const getEventDetails = await Event.findByPk(pId);
    const spreadEventDetails = { ...getEventDetails };
    const { eventName, oranizerName, price } = spreadEventDetails.dataValues;
    // console.log("data:-",eventName,oranizerName, price)
    const eventId = pId.toString();

    // console.log(typeof eventId)
    console.log("event id ", eventId);
    const result = await Users.update({ ticketBooked: eventId, bookingStatus: true, ticketTimeSlot: pSlot }, { where: { id: id } });

    res.status(200).send(`Ticket Booked successfully for "${eventName}" organizer name:"${oranizerName}" on ${pSlot}th timeSlot at:$${price} `);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function viewBooking(req, res) {
  const { id } = req.user;
  try {
    const result = await Users.findByPk(id, {
      attributes: ["name", "email", "bookingStatus", "ticketBooked"],
      // include: [{ model: Event, attributes: ["eventName", "oranizerName", "timeSlot"] }],
    });
    console.log(result);
    const spreadTicket = { ...result };
    const { ticketBooked } = spreadTicket.dataValues;

    const eventFetch = await Event.findByPk(ticketBooked);
    const spreadEventFetch = { ...eventFetch };
    const { eventName, oranizerName, eventDate } = spreadEventFetch.dataValues;

    res.status(200).json({ result, eventName, oranizerName, eventDate });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function cancelBooking(req, res) {
  const { id } = req.user;
  const { pId } = req.body;
  let msg;
  try {
    const eventDetails = await Event.findByPk(pId);
    const spreadEventDetails = { ...eventDetails };
    const { eventDate } = spreadEventDetails.dataValues;

    //FORMAT = MM-DD-YYYY
    const date = new Date();
    const eventDateInstance = new Date(eventDate);
    // console.log("date", date, "event Actual Date", eventDateInstance);

    const timeDiff = eventDateInstance.getTime() - date.getTime();
    console.log(timeDiff);

    if (timeDiff > 86400000) {
      const result = await Users.update({ bookingStatus: false }, { where: { id: id } });
      if (result === true) {
        msg = "Booking cancelled successfully";
      } else {
        msg = "Booking already Cancelled";
      }
    } else {
      throw new Error("Too late can't cancel ticket now!");
    }

    res.status(200).send(msg);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
