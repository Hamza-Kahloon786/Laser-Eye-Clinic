const Appointment = require('../models/Appointment');

exports.getAll = async (req, res) => {
  try {
    const { status, date, search } = req.query;
    const query = {};
    if (status && status !== 'All') query.status = status;
    if (date) query.date = date;
    if (search) {
      query.$or = [
        { patientName: { $regex: search, $options: 'i' } },
        { service:     { $regex: search, $options: 'i' } },
        { phone:       { $regex: search, $options: 'i' } },
      ];
    }
    const appointments = await Appointment.find(query)
      .populate('createdBy', 'name role')
      .sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { date, time } = req.body;
    const conflict = await Appointment.findOne({
      date,
      time,
      status: { $in: ['Scheduled', 'In Progress'] },
    });
    if (conflict) {
      return res.status(409).json({
        message: `Time slot ${time} on ${date} is already booked. Please choose a different time.`,
      });
    }
    const appt = await Appointment.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, appointment: appt });
  } catch (err) {
    res.status(400).json({ message: 'Error creating appointment', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { date, time } = req.body;
    if (date && time) {
      const conflict = await Appointment.findOne({
        _id:    { $ne: req.params.id },
        date,
        time,
        status: { $in: ['Scheduled', 'In Progress'] },
      });
      if (conflict) {
        return res.status(409).json({
          message: `Time slot ${time} on ${date} is already booked. Please choose a different time.`,
        });
      }
    }
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ success: true, appointment: appt });
  } catch (err) {
    res.status(400).json({ message: 'Error updating appointment', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndDelete(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting appointment' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const [total, todayCount, scheduled, completed, cancelled, inProgress] =
      await Promise.all([
        Appointment.countDocuments(),
        Appointment.countDocuments({ date: today }),
        Appointment.countDocuments({ status: 'Scheduled' }),
        Appointment.countDocuments({ status: 'Completed' }),
        Appointment.countDocuments({ status: 'Cancelled' }),
        Appointment.countDocuments({ status: 'In Progress' }),
      ]);
    res.json({ success: true, stats: { total, today: todayCount, scheduled, completed, cancelled, inProgress } });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};