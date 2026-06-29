const mongoose  = require('mongoose');
const dotenv    = require('dotenv');
const path      = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User        = require('../models/User');
const Appointment = require('../models/Appointment');

const today = () => {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
};
const shift = (n) => {
  const d = new Date(today() + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
};

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await User.deleteMany({});
  await Appointment.deleteMany({});
  console.log('Cleared existing data');

  const adminUser = await User.create({ username: 'admin', password: 'admin123', name: 'Dr. Usman Ahmed', role: 'Doctor' });
  const staffUser = await User.create({ username: 'staff', password: 'staff123', name: 'Ayesha Khan',    role: 'Receptionist' });
  const users   = [adminUser, staffUser];
  const adminId = adminUser._id;
  const staffId = staffUser._id;
  console.log('Users seeded:', users.map(u => u.username));

  await Appointment.insertMany([
    { patientName: 'Muhammad Ali',  phone: '+92 300 1111111', email: 'm.ali@email.com',  age: '35', service: 'LASIK Surgery',      doctor: 'Dr. Usman Ahmed',  date: today(),    time: '10:00 AM', notes: 'Pre-op assessment done', status: 'Scheduled',   createdBy: adminId },
    { patientName: 'Fatima Khan',   phone: '+92 300 2222222', email: 'f.khan@email.com', age: '28', service: 'Eye Consultation',    doctor: 'Dr. Sara Malik',   date: today(),    time: '11:30 AM', notes: '',                    status: 'Completed',   createdBy: staffId },
    { patientName: 'Ahmed Raza',    phone: '+92 300 3333333', email: 'a.raza@email.com', age: '42', service: 'PRK Treatment',       doctor: 'Dr. Bilal Khan',   date: shift(-1),  time: '09:30 AM', notes: '',                    status: 'Completed',   createdBy: adminId },
    { patientName: 'Sara Mahmood',  phone: '+92 300 4444444', email: 's.mah@email.com',  age: '31', service: 'SMILE Procedure',     doctor: 'Dr. Usman Ahmed',  date: shift(1),   time: '02:00 PM', notes: 'First visit',           status: 'Scheduled',   createdBy: staffId },
    { patientName: 'Omar Sheikh',   phone: '+92 300 5555555', email: 'o.sh@email.com',   age: '25', service: 'Glaucoma Check',      doctor: 'Dr. Fatima Rizvi', date: shift(2),   time: '03:30 PM', notes: '',                    status: 'Scheduled',   createdBy: adminId },
    { patientName: 'Zara Ali',      phone: '+92 300 6666666', email: 'z.ali@email.com',  age: '38', service: 'Cataract Assessment', doctor: 'Dr. Sara Malik',   date: shift(-2),  time: '10:30 AM', notes: '',                    status: 'Cancelled',   createdBy: staffId },
    { patientName: 'Bilal Chaudhry',phone: '+92 300 7777777', email: 'b.ch@email.com',   age: '45', service: 'Retina Screening',    doctor: 'Dr. Bilal Khan',   date: shift(3),   time: '09:00 AM', notes: 'Referred by GP',       status: 'Scheduled',   createdBy: adminId },
    { patientName: 'Nadia Hussain', phone: '+92 300 8888888', email: 'n.h@email.com',    age: '29', service: 'LASIK Surgery',      doctor: 'Dr. Usman Ahmed',  date: today(),    time: '02:30 PM', notes: 'Post-consultation',    status: 'In Progress', createdBy: staffId },
  ]);
  console.log('Sample appointments seeded');
  console.log('\nDone! Login credentials:');
  console.log('  Doctor:       admin / admin123');
  console.log('  Receptionist: staff / staff123');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });