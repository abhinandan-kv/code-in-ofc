import Event from "../models/eventModel.js";
import Users from "../models/userModel.js";

export async function setNewEvent(req, res) {
  const { eventName, name, timeSlot, price, ticketLimit, date } = req.body;

  const { role } = req.user;

  try {
    if (role !== "Admin") {
      throw new Error("You are not authorized");
    }
    const result = await Event.create({ eventName: eventName, oranizerName: name, timeSlot: timeSlot, price: price, ticketLimit: ticketLimit, eventDate:date });

    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function editEvent(req, res) {
  const id = req.params.id;
  const { eventName, timeSlot, price, ticketLimit } = req.body;
  const { role } = req.user;

  try {
    if (role !== "Admin") {
      throw new Error("You are not authorized");
    }
    const result = await Event.update({ eventName: eventName, timeSlot: timeSlot, price: price, ticketLimit: ticketLimit }, { where: { id: id } });

    console.log(result);
    res.send("Data updated successfully");
  } catch (er) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function deleteEvent(req, res) {
  const id = req.params.id;
  const { role } = req.user;

  try {
    if (role !== "Admin") {
      throw new Error("You are not authorized");
    }
    const result = await Event.destroy({ where: { id: id } });

    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function assignOrgzer(req, res) {
  const id = req.params.id;
  const { role } = req.user;
  const { name } = req.body;

  try {
    if (role !== "Admin") {
      throw new Error("You are not authorized");
    }
    // const result = await Event.findAll({ where: { id: id }, attributes: ["eventName"], includes: [{ model: Users, attribute: ["name", "email"] }] });
    const findEvent = await Event.findAll({ where: { id: id }, includes: [{ model: Users, attribute: ["name", "email"] }] });

    const spreded = { ...findEvent };
    const oldOrgName = spreded[0].dataValues.oranizerName;
    console.log("strig : ", oldOrgName);

    const newOrgzerNameList = oldOrgName + "," + name;
    console.log(newOrgzerNameList);
    // console.log(typeof oldOrgName)

    const result = await Event.update({ oranizerName: newOrgzerNameList }, { where: { id: id } });
    console.log(result);

    res.status(200).send("Additional Organizer added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

export async function listAllEvents(req, res) {
  const { role } = req.user;

  try {
    if (role !== "Admin") {
      throw new Error("You are not authorized");
    }
    const result = await Event.findAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

//organizer functions

export async function addTimeSlots(req, res) {
  const { role } = req.user;
  const { timeSlot } = req.body;
  const id = req.params.id;

  try {
    if (role !== "Organizer") {
      throw new Error("Only Organizers are allowed! Thank You!");
    }
    if (typeof timeSlot !== "String") {
      throw new Error("Only Strings are allowed");
    }

    const getEventDetails = await Event.findByPk(id);
    // console.log(getEventDetails);
    const spreadGetEventDetails = { ...getEventDetails };
    const extractTimeSlot = spreadGetEventDetails.dataValues.timeSlot;
    const newTimeSlot = extractTimeSlot + "," + timeSlot;
    console.log(newTimeSlot);

    const result = await Event.update({ timeSlot: newTimeSlot }, { where: { id: id } });
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
}

export async function setSales(req, res) {
  const { role } = req.user;
  const { price, ticketLimit, lastDate } = req.body;
  const id = req.params.id;

  try {
    if (role !== "Organizer") {
      throw new Error("You are not an organizer, can't perform this operation.");
    }
    console.log(price, ticketLimit, lastDate);

    const result = await Event.update({ price: price, ticketLimit: ticketLimit, saleEndDate: lastDate }, { where: { id: id } });

    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
}

export async function allBookings(req, res) {
  const { role } = req.user;
  const { oranizerName } = req.body;

  try {
    if (role !== "Organizer") {
      throw new Error("You are not an organizer, cant perform this operation.");
    }
    const result = await Event.findAll({
      attributes: ["eventName", "oranizerName", "timeSlot", "price", "ticketLimit", "saleEndDate", "createdAt"],
      where: { oranizerName: oranizerName },
    });
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}
