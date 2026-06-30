import { useState } from 'react';
import { X, Calendar, Pencil, AlertCircle } from 'lucide-react';

const SERVICES = ['LASIK Surgery','SMILE Procedure','PRK Treatment','Eye Consultation','Cataract Assessment','Post-Op Follow-up','Glaucoma Check','Retina Screening'];
const DOCTORS  = ['Dr. Usman Bhatti'];
const TIMES    = ['03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM','06:00 PM','06:30 PM','07:00 PM','07:30 PM','08:00 PM'];

const EMPTY = { patientName:'',phone:'',email:'',age:'',service:SERVICES[0],doctor:DOCTORS[0],date:'',time:TIMES[0],notes:'' };

function Field({ label, name, type='text', placeholder='', opts, value, error, onChange }) {
  return (
    <div className="form-group" style={{marginBottom:0}}>
      <label className="form-label">{label}</label>
      {opts ? (
        <select className="form-select" value={value} onChange={e=>onChange(name,e.target.value)}>
          {opts.map(o=><option key={o}>{o}</option>)}
        </select>
      ) : (
        <input className={`form-input${error?' error':''}`} type={type}
          value={value} onChange={e=>onChange(name,e.target.value)} placeholder={placeholder}/>
      )}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

export default function AppointmentForm({ onClose, onSubmit, loading, error, initialData }) {
  const isEdit = !!initialData;
  const [f, setF]       = useState(initialData ? {
    patientName: initialData.patientName || '',
    phone:       initialData.phone       || '',
    email:       initialData.email       || '',
    age:         initialData.age         || '',
    service:     initialData.service     || SERVICES[0],
    doctor:      initialData.doctor      || DOCTORS[0],
    date:        initialData.date        || '',
    time:        initialData.time        || TIMES[0],
    notes:       initialData.notes       || '',
  } : EMPTY);
  const [errs, setErrs] = useState({});

  const set = (k, v) => { setF(p=>({...p,[k]:v})); setErrs(p=>({...p,[k]:''})); };

  const validate = () => {
    const e = {};
    if (!f.patientName.trim()) e.patientName = 'Patient name is required';
    if (!f.phone.trim())       e.phone       = 'Phone number is required';
    if (!f.date)               e.date        = 'Date is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrs(e2); return; }
    onSubmit(f);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {isEdit ? 'Edit Appointment' : 'New Appointment'}
            </div>
            <div className="modal-subtitle">
              {isEdit ? 'Update the appointment details below' : 'Fill in the patient details below'}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={14}/></button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" style={{marginBottom:14}}>
              <AlertCircle size={15}/> {error}
            </div>
          )}
          <div className="form-grid">
            <Field label="Patient Name *" name="patientName" placeholder="Full name"              value={f.patientName} error={errs.patientName} onChange={set}/>
            <Field label="Phone *"        name="phone"       placeholder="+92 300 0000000"        value={f.phone}       error={errs.phone}       onChange={set}/>
            <Field label="Email"          name="email"       type="email" placeholder="patient@email.com" value={f.email} error={errs.email}    onChange={set}/>
            <Field label="Age"            name="age"         placeholder="Age"                    value={f.age}         error={errs.age}         onChange={set}/>
            <Field label="Service"        name="service"     opts={SERVICES}                      value={f.service}     error={errs.service}     onChange={set}/>
            <Field label="Doctor"         name="doctor"      opts={DOCTORS}                       value={f.doctor}      error={errs.doctor}      onChange={set}/>
            <Field label="Date *"         name="date"        type="date"                          value={f.date}        error={errs.date}        onChange={set}/>
            <Field label="Time Slot"      name="time"        opts={TIMES}                         value={f.time}        error={errs.time}        onChange={set}/>
          </div>
          <div className="form-group" style={{marginTop:14}}>
            <label className="form-label">Notes</label>
            <textarea className="form-textarea" value={f.notes}
              onChange={e=>set('notes',e.target.value)}
              placeholder="Additional notes or special requirements..."/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {isEdit
                ? <><Pencil size={14}/> {loading ? 'Saving...'   : 'Save Changes'}</>
                : <><Calendar size={14}/> {loading ? 'Booking...' : 'Book Appointment'}</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
