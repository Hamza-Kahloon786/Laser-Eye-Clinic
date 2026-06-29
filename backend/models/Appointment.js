const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    phone:       { type: String, required: true, trim: true },
    email:       { type: String, trim: true, lowercase: true },
    age:         { type: String, trim: true },
    service: {
      type: String,
      required: true,
      enum: [
        'LASIK Surgery', 'SMILE Procedure', 'PRK Treatment',
        'Eye Consultation', 'Cataract Assessment', 'Post-Op Follow-up',
        'Glaucoma Check', 'Retina Screening',
      ],
    },
    doctor: { type: String, required: true },
    date:   { type: String, required: true },
    time:   { type: String, required: true },
    notes:  { type: String, default: '' },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);