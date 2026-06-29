import { useNavigate } from 'react-router-dom';
import { Eye, Zap, Shield, Users, Award, ChevronRight, Phone, Mail, MapPin, Check, Star, Clock, HeartPulse } from 'lucide-react';

const SERVICES = [
  { icon: <Zap size={22}/>,       color:'#3b82f6', bg:'#eff6ff', title:'LASIK Surgery',       desc:'Blade-free laser correction. Permanent results with zero recovery downtime for most patients.' },
  { icon: <Eye size={22}/>,        color:'#8b5cf6', bg:'#f5f3ff', title:'SMILE Procedure',      desc:'Minimally invasive keyhole laser — no flap, less dry-eye risk, suitable for active lifestyles.' },
  { icon: <Shield size={22}/>,     color:'#10b981', bg:'#ecfdf5', title:'PRK Treatment',        desc:'Surface laser reshaping — ideal for patients with thin corneas or high prescriptions.' },
  { icon: <HeartPulse size={22}/>, color:'#f59e0b', bg:'#fffbeb', title:'Eye Consultation',     desc:'Comprehensive mapping and surgical planning with our senior ophthalmologist.' },
  { icon: <Users size={22}/>,      color:'#ef4444', bg:'#fef2f2', title:'Cataract Assessment',  desc:'Early detection and lens replacement planning for cataract patients.' },
  { icon: <Star size={22}/>,       color:'#06b6d4', bg:'#ecfeff', title:'Retina Screening',     desc:'Advanced OCT imaging to detect retinal conditions before they progress.' },
  { icon: <Clock size={22}/>,      color:'#84cc16', bg:'#f7fee7', title:'Post-Op Follow-up',    desc:'Dedicated recovery monitoring at 1-day, 1-week and 1-month milestones.' },
  { icon: <Award size={22}/>,      color:'#f43f5e', bg:'#fff1f2', title:'Glaucoma Check',       desc:'Intraocular pressure testing and optic nerve evaluation for glaucoma risk.' },
];

const WHY = [
  { icon:<Award size={20}/>,  title:'Award-Winning Clinic',   desc:'Recipient of the Pakistan Healthcare Excellence Award 3 years running.' },
  { icon:<Zap size={20}/>,    title:'Latest Technology',      desc:'FDA-approved WaveLight EX500 excimer laser — the gold standard in refractive surgery.' },
  { icon:<Shield size={20}/>, title:'99% Success Rate',        desc:'Over 10,000 successful procedures with an industry-leading satisfaction score.' },
  { icon:<Clock size={20}/>,  title:'15+ Years Experience',   desc:'Our senior surgeons have combined experience of over four decades in ophthalmology.' },
  { icon:<Users size={20}/>,  title:'Patient-First Care',     desc:'Personalised consultation, transparent pricing and lifetime aftercare guarantee.' },
  { icon:<HeartPulse size={20}/>,title:'Pain-Free Procedures', desc:'Most patients experience zero discomfort and return to normal activity the next day.' },
];

const TESTIMONIALS = [
  { name:'Sarah Ahmed',    role:'LASIK Patient',    text:'I had LASIK done here and my vision went from -4.5 to perfect 20/20 the very next morning. The team was incredibly professional.', stars:5 },
  { name:'Bilal Chaudhry', role:'SMILE Patient',    text:'After years of wearing glasses, I finally took the step. The procedure took less than 15 minutes and recovery was smooth. Highly recommend!', stars:5 },
  { name:'Nadia Hassan',   role:'PRK Patient',      text:'Dr. Usman walked me through every step. The results exceeded my expectations — crystal clear vision and no side effects.', stars:5 },
];

export default function Landing() {
  const navigate = useNavigate();
  const goLogin  = () => navigate('/login');

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",color:'#0f172a',overflowX:'hidden'}}>

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <nav style={{
        position:'sticky',top:0,zIndex:100,
        background:'rgba(15,23,42,0.95)',
        backdropFilter:'blur(12px)',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
        padding:'0 5%',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        height:64,
      }}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:38,height:38,borderRadius:10,background:'#1d4ed8',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <Eye size={20} color="#fff"/>
          </div>
          <div>
            <div style={{color:'#f1f5f9',fontSize:14,fontWeight:700,letterSpacing:'-0.2px'}}>Usman Laser Eye Clinic</div>
            <div style={{color:'#475569',fontSize:10,letterSpacing:'0.5px'}}>VISION CARE EXCELLENCE</div>
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:32}}>
          <div style={{display:'flex',gap:28}}>
            {['Services','About','Contact'].map(l=>(
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{color:'#94a3b8',fontSize:13,textDecoration:'none',transition:'color 0.15s'}}
                onMouseEnter={e=>e.target.style.color='#e2e8f0'}
                onMouseLeave={e=>e.target.style.color='#94a3b8'}>
                {l}
              </a>
            ))}
          </div>
          <button onClick={goLogin} style={{
            background:'#1d4ed8',color:'#fff',border:'none',
            padding:'8px 20px',borderRadius:8,fontSize:13,fontWeight:600,
            cursor:'pointer',display:'flex',alignItems:'center',gap:6,
            transition:'background 0.15s',
          }}
            onMouseEnter={e=>e.currentTarget.style.background='#1e40af'}
            onMouseLeave={e=>e.currentTarget.style.background='#1d4ed8'}>
            Staff Login <ChevronRight size={14}/>
          </button>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────── */}
      <section style={{
        background:'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)',
        padding:'90px 5% 80px',
        position:'relative',overflow:'hidden',
      }}>
        {/* decorative blobs */}
        <div style={{position:'absolute',top:-120,right:-80,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:-100,left:-60,width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)',pointerEvents:'none'}}/>

        <div style={{maxWidth:760,margin:'0 auto',textAlign:'center',position:'relative'}}>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:8,
            background:'rgba(59,130,246,0.12)',border:'1px solid rgba(59,130,246,0.3)',
            borderRadius:100,padding:'6px 18px',marginBottom:28,
          }}>
            <Award size={13} color="#93c5fd"/>
            <span style={{color:'#93c5fd',fontSize:12,fontWeight:500}}>Trusted by 10,000+ patients across Pakistan</span>
          </div>

          <h1 style={{
            color:'#f8fafc',fontSize:'clamp(36px,5vw,58px)',fontWeight:800,
            lineHeight:1.12,letterSpacing:'-1px',marginBottom:22,
          }}>
            See The World<br/>
            <span style={{background:'linear-gradient(90deg,#60a5fa,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
              Perfectly Clear
            </span>
          </h1>

          <p style={{color:'#94a3b8',fontSize:17,lineHeight:1.75,maxWidth:560,margin:'0 auto 36px'}}>
            Advanced laser eye correction with Pakistan's most experienced ophthalmologists.
            LASIK, SMILE &amp; PRK procedures with a <strong style={{color:'#e2e8f0'}}>99% success rate</strong>.
          </p>

          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:64}}>
            <button onClick={goLogin} style={{
              background:'linear-gradient(135deg,#1d4ed8,#4f46e5)',
              color:'#fff',border:'none',padding:'14px 32px',
              borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer',
              display:'flex',alignItems:'center',gap:8,
              boxShadow:'0 4px 24px rgba(29,78,216,0.4)',transition:'transform 0.15s,box-shadow 0.15s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 32px rgba(29,78,216,0.5)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 24px rgba(29,78,216,0.4)';}}>
              Book Appointment <ChevronRight size={16}/>
            </button>
            <a href="#services" style={{
              background:'rgba(255,255,255,0.06)',color:'#e2e8f0',
              border:'1px solid rgba(255,255,255,0.14)',padding:'14px 32px',
              borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer',
              textDecoration:'none',display:'inline-flex',alignItems:'center',
              transition:'background 0.15s',
            }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}>
              Our Services
            </a>
          </div>

          {/* Stats bar */}
          <div style={{
            display:'grid',gridTemplateColumns:'repeat(4,1fr)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:16,overflow:'hidden',
            background:'rgba(255,255,255,0.03)',backdropFilter:'blur(8px)',
          }}>
            {[['10K+','Procedures Done'],['99%','Success Rate'],['15+','Years Experience'],['50+','Specialists']].map(([n,l],i)=>(
              <div key={n} style={{
                padding:'22px 0',textAlign:'center',
                borderRight: i<3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                <div style={{color:'#60a5fa',fontSize:28,fontWeight:800,letterSpacing:'-0.5px'}}>{n}</div>
                <div style={{color:'#475569',fontSize:11,marginTop:4,textTransform:'uppercase',letterSpacing:'0.6px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────── */}
      <section id="services" style={{padding:'80px 5%',background:'#f8fafc'}}>
        <div style={{textAlign:'center',marginBottom:52}}>
          <div style={{display:'inline-block',background:'#eff6ff',color:'#1d4ed8',fontSize:11,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'5px 14px',borderRadius:100,marginBottom:14}}>
            Our Services
          </div>
          <h2 style={{fontSize:'clamp(26px,3.5vw,38px)',fontWeight:800,letterSpacing:'-0.5px',marginBottom:12}}>
            World-Class Eye Care
          </h2>
          <p style={{color:'#64748b',fontSize:15,maxWidth:500,margin:'0 auto'}}>
            Every procedure is performed with cutting-edge technology and personalised care.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20,maxWidth:1100,margin:'0 auto'}}>
          {SERVICES.map(s=>(
            <div key={s.title} style={{
              background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,
              padding:'28px 24px',transition:'transform 0.2s,box-shadow 0.2s',cursor:'default',
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.1)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
              <div style={{width:48,height:48,borderRadius:12,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',color:s.color,marginBottom:18}}>
                {s.icon}
              </div>
              <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>{s.title}</div>
              <div style={{fontSize:13,color:'#64748b',lineHeight:1.7}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────── */}
      <section id="about" style={{padding:'80px 5%',background:'linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:52}}>
            <div style={{display:'inline-block',background:'rgba(59,130,246,0.12)',color:'#60a5fa',fontSize:11,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'5px 14px',borderRadius:100,marginBottom:14}}>
              Why Choose Us
            </div>
            <h2 style={{color:'#f1f5f9',fontSize:'clamp(26px,3.5vw,38px)',fontWeight:800,letterSpacing:'-0.5px',marginBottom:12}}>
              Pakistan's Most Trusted Eye Clinic
            </h2>
            <p style={{color:'#64748b',fontSize:15,maxWidth:500,margin:'0 auto'}}>
              Transforming lives through better vision for over 15 years.
            </p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
            {WHY.map(f=>(
              <div key={f.title} style={{
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:16,padding:'28px 26px',
                display:'flex',gap:16,alignItems:'flex-start',
                transition:'background 0.2s,border-color 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.07)';e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';}}>
                <div style={{width:42,height:42,borderRadius:10,background:'rgba(59,130,246,0.15)',display:'flex',alignItems:'center',justifyContent:'center',color:'#60a5fa',flexShrink:0}}>
                  {f.icon}
                </div>
                <div>
                  <div style={{color:'#e2e8f0',fontWeight:700,fontSize:15,marginBottom:6}}>{f.title}</div>
                  <div style={{color:'#64748b',fontSize:13,lineHeight:1.65}}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section style={{padding:'80px 5%',background:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:52}}>
            <div style={{display:'inline-block',background:'#fef3c7',color:'#92400e',fontSize:11,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'5px 14px',borderRadius:100,marginBottom:14}}>
              Patient Stories
            </div>
            <h2 style={{fontSize:'clamp(26px,3.5vw,38px)',fontWeight:800,letterSpacing:'-0.5px',marginBottom:12}}>
              What Our Patients Say
            </h2>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
            {TESTIMONIALS.map(t=>(
              <div key={t.name} style={{background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:16,padding:'28px 26px'}}>
                <div style={{display:'flex',gap:3,marginBottom:16}}>
                  {Array.from({length:t.stars}).map((_,i)=>(
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b"/>
                  ))}
                </div>
                <p style={{color:'#374151',fontSize:14,lineHeight:1.75,marginBottom:20,fontStyle:'italic'}}>
                  "{t.text}"
                </p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#1d4ed8,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:14}}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:13}}>{t.name}</div>
                    <div style={{fontSize:11,color:'#94a3b8'}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────── */}
      <section style={{
        margin:'0 5% 80px',borderRadius:20,
        background:'linear-gradient(135deg,#1d4ed8 0%,#4f46e5 100%)',
        padding:'52px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',
        flexWrap:'wrap',gap:24,boxShadow:'0 20px 60px rgba(29,78,216,0.35)',
      }}>
        <div>
          <h2 style={{color:'#fff',fontSize:'clamp(22px,3vw,32px)',fontWeight:800,marginBottom:8}}>
            Ready to See Clearly?
          </h2>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:15,maxWidth:440}}>
            Book a free consultation today. Our specialists will assess your vision and recommend the best treatment for you.
          </p>
          <div style={{display:'flex',gap:10,marginTop:14,flexWrap:'wrap'}}>
            {['Free initial consultation','Results from day one','Lifetime aftercare'].map(f=>(
              <div key={f} style={{display:'flex',alignItems:'center',gap:6,color:'rgba(255,255,255,0.85)',fontSize:13}}>
                <div style={{width:18,height:18,borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Check size={10} color="#fff"/>
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <button onClick={goLogin} style={{
          background:'#fff',color:'#1d4ed8',border:'none',
          padding:'14px 32px',borderRadius:10,fontSize:15,fontWeight:700,
          cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,
          boxShadow:'0 4px 16px rgba(0,0,0,0.15)',transition:'transform 0.15s',
        }}
          onMouseEnter={e=>e.currentTarget.style.transform='scale(1.03)'}
          onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
          Book Now →
        </button>
      </section>

      {/* ── CONTACT ────────────────────────────────────── */}
      <section id="contact" style={{padding:'0 5% 80px',background:'#f8fafc'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{display:'inline-block',background:'#eff6ff',color:'#1d4ed8',fontSize:11,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'5px 14px',borderRadius:100,marginBottom:14}}>
              Contact Us
            </div>
            <h2 style={{fontSize:'clamp(26px,3.5vw,38px)',fontWeight:800,letterSpacing:'-0.5px',marginBottom:12}}>
              Get In Touch
            </h2>
            <p style={{color:'#64748b',fontSize:15}}>We're here to help — reach out any time.</p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20}}>
            {[
              { icon:<MapPin size={22}/>,  color:'#3b82f6', bg:'#eff6ff', title:'Our Location',  lines:['123 Vision Street','Gulberg III, Lahore','Punjab, Pakistan'] },
              { icon:<Phone size={22}/>,   color:'#10b981', bg:'#ecfdf5', title:'Call Us',        lines:['+92 300 123 4567','+92 42 345 6789','Mon – Sat, 4 PM – 11 PM'] },
              { icon:<Mail size={22}/>,    color:'#8b5cf6', bg:'#f5f3ff', title:'Email Us',       lines:['info@usmanlaser.pk','appointments@usmanlaser.pk','Reply within 24 hrs'] },
              { icon:<Clock size={22}/>,   color:'#f59e0b', bg:'#fffbeb', title:'Working Hours',  lines:['Monday – Saturday','4:00 PM – 11:00 PM','Sunday: Closed'] },
            ].map(c=>(
              <div key={c.title} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:16,padding:'28px 24px',textAlign:'center'}}>
                <div style={{width:52,height:52,borderRadius:14,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',color:c.color,margin:'0 auto 16px'}}>
                  {c.icon}
                </div>
                <div style={{fontWeight:700,fontSize:15,marginBottom:10}}>{c.title}</div>
                {c.lines.map((l,i)=>(
                  <div key={i} style={{fontSize:13,color: i===2 ? '#94a3b8' : '#475569',lineHeight:1.8}}>{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer style={{background:'#0f172a',padding:'40px 5% 28px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:32,marginBottom:36}}>
            {/* Brand */}
            <div style={{maxWidth:280}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                <div style={{width:34,height:34,borderRadius:9,background:'#1d4ed8',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Eye size={17} color="#fff"/>
                </div>
                <span style={{color:'#f1f5f9',fontWeight:700,fontSize:14}}>Usman Laser Eye Clinic</span>
              </div>
              <p style={{color:'#475569',fontSize:12,lineHeight:1.75}}>
                Delivering world-class vision correction procedures with compassion and precision since 2009.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <div style={{color:'#94a3b8',fontSize:11,fontWeight:700,letterSpacing:'0.8px',textTransform:'uppercase',marginBottom:14}}>Quick Links</div>
              {['Services','About','Contact','Staff Portal'].map(l=>(
                <div key={l} style={{marginBottom:8}}>
                  <a href={l==='Staff Portal'?'/login':`#${l.toLowerCase()}`}
                    style={{color:'#475569',fontSize:13,textDecoration:'none',transition:'color 0.15s'}}
                    onMouseEnter={e=>e.target.style.color='#94a3b8'}
                    onMouseLeave={e=>e.target.style.color='#475569'}>
                    {l}
                  </a>
                </div>
              ))}
            </div>

            {/* Services */}
            <div>
              <div style={{color:'#94a3b8',fontSize:11,fontWeight:700,letterSpacing:'0.8px',textTransform:'uppercase',marginBottom:14}}>Treatments</div>
              {['LASIK Surgery','SMILE Procedure','PRK Treatment','Cataract Assessment'].map(l=>(
                <div key={l} style={{color:'#475569',fontSize:13,marginBottom:8}}>{l}</div>
              ))}
            </div>

            {/* Contact snippet */}
            <div>
              <div style={{color:'#94a3b8',fontSize:11,fontWeight:700,letterSpacing:'0.8px',textTransform:'uppercase',marginBottom:14}}>Contact</div>
              {[
                [<Phone size={12}/>,'+92 300 123 4567'],
                [<Mail size={12}/>,'info@usmanlaser.pk'],
                [<MapPin size={12}/>,'Gulberg III, Lahore'],
                [<Clock size={12}/>,'4 PM – 11 PM (Mon–Sat)'],
              ].map(([icon,text],i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,color:'#475569',fontSize:13,marginBottom:8}}>
                  <span style={{color:'#334155'}}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>

          <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <span style={{color:'#334155',fontSize:12}}>© {new Date().getFullYear()} Usman Laser Eye Clinic. All rights reserved.</span>
            <button onClick={goLogin} style={{
              background:'rgba(59,130,246,0.1)',color:'#60a5fa',
              border:'1px solid rgba(59,130,246,0.2)',
              padding:'7px 18px',borderRadius:8,fontSize:12,fontWeight:600,
              cursor:'pointer',transition:'background 0.15s',
            }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.18)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(59,130,246,0.1)'}>
              Staff Portal →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
