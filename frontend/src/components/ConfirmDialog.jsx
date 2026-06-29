import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ title, message, onConfirm, onCancel, confirmLabel = 'Delete', danger = true }) {
  return (
    <div className="modal-overlay">
      <div className="modal modal-sm" style={{maxWidth:400}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{
              width:38,height:38,borderRadius:10,flexShrink:0,
              background: danger ? 'var(--danger-bg)' : 'var(--warning-bg)',
              display:'flex',alignItems:'center',justifyContent:'center',
            }}>
              <AlertTriangle size={18} color={danger ? 'var(--danger)' : 'var(--warning)'}/>
            </div>
            <div>
              <div className="modal-title" style={{fontSize:15}}>{title}</div>
              <div className="modal-subtitle">{message}</div>
            </div>
          </div>
          <button className="modal-close" onClick={onCancel}><X size={13}/></button>
        </div>

        <div className="modal-footer" style={{marginTop:8}}>
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button
            className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
            style={{background: danger ? 'var(--danger)' : undefined, color: danger ? '#fff' : undefined, borderColor: danger ? 'var(--danger)' : undefined}}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
