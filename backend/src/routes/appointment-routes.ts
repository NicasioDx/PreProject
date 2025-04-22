// routes/appointment-routes.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/api/appointments/book', async (req: Request, res: Response) => {
  const { service, dateTime } = req.body;

  if (!service || !dateTime) {
    return res.status(400).json({ message: 'Service and dateTime are required' });
  }

  const bookingTime = new Date(dateTime);
  const bufferMinutes = service === 'ตรวจโรค' ? 30 : 15;

  const start = new Date(bookingTime.getTime() - bufferMinutes * 60 * 1000);
  const end = new Date(bookingTime.getTime() + bufferMinutes * 60 * 1000);

  const existing = await prisma.appointment.findFirst({
    where: {
      dateTime: {
        gte: start,
        lt: end,
      },
    },
  });

  if (existing) {
    return res.status(409).json({ message: 'Time slot already booked' });
  }

  const appointment = await prisma.appointment.create({
    data: {
      service,
      dateTime: bookingTime,
    },
  });

  return res.status(201).json({
    message: 'Appointment booked successfully',
    appointment,
  });
});

export default router;
