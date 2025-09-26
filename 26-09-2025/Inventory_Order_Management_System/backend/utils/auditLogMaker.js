import AdminAuditModel from "../models/adminAuditModel.js";

export default async function auditFunctionality(id, name, role, email, eventName) {
  try {
    const eventDescription = `${eventName} operation performed by ${name} having id:${id} holding role:${role}, contact here email:${email} `;
    const pushingLog = await AdminAuditModel.create({ performedBy: name, eventName: eventName, eventDescription: eventDescription });
  } catch (err) {
    console.log(err);
  }
}
