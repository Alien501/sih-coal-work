import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAlert = async (req, res) => {
  const { alert_type, priority, date_created, assigned_to, status } = req.body;
  if(!alert_type || !priority || !date_created || !assigned_to || !status)
    return res.status(400).send({
      message: 'Something is miising!'
    })
  const whetherAlertAlreadyExist = await prisma.alert.findFirst({
    where: {
      AND: [
        {alert_type: alert_type},
        {date_created: date_created}
      ]
    }
  });

  if(whetherAlertAlreadyExist)
    return res.status(400).send({ message: 'Alert notified already' });

  const newAlert = await prisma.alert.create({
    data: {
      alert_type: alert_type,
      priority: priority,
      date_created: date_created,
      assigned_to: assigned_to,
      status: status
    }
  });
  return res.status(201).send({message: 'Created alert!'});
}

const getAllAlerts = async (req, res) => {
  const allAlerts =  await prisma.alert.findMany({alert_type: true});
  return res.status(200).send({
    message: 'Done!',
    data: allAlerts
  })
};

const getAlert = async (req, res) => {
  const { alert_id } = req.params;
  if(!alert_id)
    return res.status(400).send({message: "Missing alert id!"});
  const alert = await prisma.alert.findFirst({alert_id: alert_id});
  return res.status(200).send({
    message: 'Found',
    data: alert
  })
}

const updateAlertStatus = async (req, res) => {
  const { alert_id } = req.params;
  const { status } = req.body;

  if(!alert_id || !status)
    return res.status(400).send({message: "Missing alert id or status!"});

  const updateAlert = await prisma.alert.update({
    where: {alert_id: alert_id},
    data: { status: status }
  })

  if(!updateAlert)
      return res.status(404).send({message: 'Missing alerts'});
  return res.status(301).send({message: 'updated!'});
}

export {
  createAlert,
  getAlert,
  getAllAlerts,
  updateAlertStatus
}