import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Trash2, Pencil, Loader2 } from 'lucide-react';
import { appointmentAPI } from '../services/api';
import Badge from './Badge';
import AppointmentForm from './AppointmentForm';
import ConfirmDialog from './ConfirmDialog';

const PATIENT_NOTE = "The patient should arrive at the clinic 15 minutes before their appointment so that they do not have to wait too long and can have their check-up completed exactly at their scheduled appointment time.";

export default function Appointments() {
  const [appts,       setAppts]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formError,   setFormError]   = useState('');
  const [search,      setSearch]      = useState('');
  const [status,      setStatus]      = useState('All');

  // modals
  const [showNote,    setShowNote]    = useState(false);
  const [showForm,    setShowForm]    = useState(false);
  const [editAppt,    setEditAppt]    = useState(null);   // appointment being edited
  const [deleteAppt,  setDeleteAppt]  = useState(null);   // appointment pending delete confirm

  const fetchAppts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (status !== 'All') params.status = status;
      if (search) params.search = search;
      const { data } = await appointmentAPI.getAll(params);
      setAppts(data.appointments || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, status]);

  useEffect(() => { fetchAppts(); }, [fetchAppts]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentAPI.update(id, { status: newStatus });
      setAppts(p => p.map(a => a._id===id ? {...a, status:newStatus} : a));
    } catch (e) { console.error(e); }
  };

  const confirmDelete = async () => {
    if (!deleteAppt) return;
    try {
      await appointmentAPI.remove(deleteAppt._id);
      setAppts(p => p.filter(a => a._id !== deleteAppt._id));
    } catch (e) { console.error(e); }
    finally { setDeleteAppt(null); }
  };

  const handleCreate = async (data) => {
    setFormLoading(true);
    setFormError('');
    try {
      const { data: res } = await appointmentAPI.create(data);
      setAppts(p => [res.appointment, ...p]);
      setShowForm(false);
    } catch (e) {
      setFormError(e.response?.data?.message || 'Failed to book appointment.');
    } finally { setFormLoading(false); }
  };

  const handleEdit = async (data) => {
    setFormLoading(true);
    setFormError('');
    try {
      const { data: res } = await appointmentAPI.update(editAppt._id, data);
      setAppts(p => p.map(a => a._id === editAppt._id ? res.appointment : a));
      setEditAppt(null);
    } catch (e) {
      setFormError(e.response?.data?.message || 'Failed to update appointment.');
    } finally { setFormLoading(false); }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <Search size={14}/>
            <input className="search-input" value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="Search patients or services..."
              onKeyDown={e=>e.key==='Enter'&&fetchAppts()}/>
          </div>
          <select className="filter-select" value={status} onChange={e=>setStatus(e.target.value)}>
            {['All','Scheduled','In Progress','Completed','Cancelled'].map(s=><option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-sm" onClick={fetchAppts}>Search</button>
        </div>
        <button className="btn btn-primary" onClick={()=>setShowNote(true)}>
          <Plus size={15}/> New Appointment
        </button>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {['Patient','Service','Doctor','Date & Time','Status','Actions'].map(h=>(
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>
                <Loader2 size={24} style={{animation:'spin 1s linear infinite'}}/>
              </td></tr>
            ) : appts.length === 0 ? (
              <tr><td colSpan={6} style={{textAlign:'center',padding:44,color:'var(--text-muted)'}}>
                <Search size={28} style={{marginBottom:8,display:'block',margin:'0 auto 8px'}}/>
                No appointments found
              </td></tr>
            ) : appts.map(a => (
              <tr key={a._id}>
                <td>
                  <div style={{display:'flex',gap:10,alignItems:'center'}}>
                    <div className="patient-avatar">{a.patientName.charAt(0)}</div>
                    <div>
                      <div style={{fontWeight:600}}>{a.patientName}</div>
                      <div style={{fontSize:11,color:'var(--text-muted)'}}>{a.phone}</div>
                    </div>
                  </div>
                </td>
                <td style={{color:'var(--text-secondary)'}}>{a.service}</td>
                <td style={{color:'var(--text-secondary)'}}>{a.doctor}</td>
                <td>
                  <div style={{fontWeight:600}}>{a.date}</div>
                  <div style={{fontSize:11,color:'var(--text-muted)'}}>{a.time}</div>
                </td>
                <td><Badge status={a.status}/></td>
                <td>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <select className="filter-select" style={{fontSize:11,padding:'4px 8px'}}
                      value={a.status} onChange={e=>handleStatusChange(a._id,e.target.value)}>
                      {['Scheduled','In Progress','Completed','Cancelled'].map(s=><option key={s}>{s}</option>)}
                    </select>
                    <button
                      className="btn btn-icon btn-sm"
                      title="Edit appointment"
                      onClick={()=>{ setFormError(''); setEditAppt(a); }}
                      style={{color:'var(--primary)',borderColor:'#bfdbfe',background:'#eff6ff'}}
                    >
                      <Pencil size={13}/>
                    </button>
                    <button
                      className="btn btn-danger btn-icon btn-sm"
                      title="Delete appointment"
                      onClick={()=>setDeleteAppt(a)}
                    >
                      <Trash2 size={13}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient notice modal */}
      {showNote && (
        <div className="modal-overlay">
          <div className="modal modal-sm">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <div style={{width:38,height:38,borderRadius:10,background:'var(--warning-bg)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <Plus size={18} color="var(--warning)"/>
              </div>
              <h3 className="modal-title">Important Patient Notice</h3>
            </div>
            <div className="note-box">
              <p>{PATIENT_NOTE}</p>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={()=>setShowNote(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>{setShowNote(false);setShowForm(true);}}>
                I Understand — Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New appointment form */}
      {showForm && (
        <AppointmentForm
          onClose={()=>{ setShowForm(false); setFormError(''); }}
          onSubmit={handleCreate}
          loading={formLoading}
          error={formError}
        />
      )}

      {/* Edit appointment form */}
      {editAppt && (
        <AppointmentForm
          initialData={editAppt}
          onClose={()=>{ setEditAppt(null); setFormError(''); }}
          onSubmit={handleEdit}
          loading={formLoading}
          error={formError}
        />
      )}

      {/* Delete confirmation dialog */}
      {deleteAppt && (
        <ConfirmDialog
          title="Delete Appointment"
          message={`Remove ${deleteAppt.patientName}'s appointment on ${deleteAppt.date} at ${deleteAppt.time}?`}
          confirmLabel="Delete"
          danger
          onConfirm={confirmDelete}
          onCancel={()=>setDeleteAppt(null)}
        />
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
