
// ============================================================
// 3. GLOBAL CSS (styles.ts)
// ============================================================
export const GLOBAL_CSS = `
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.0.0/dist/tabler-icons.min.css');
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',sans-serif;}
  .display{font-family:'Playfair Display',Georgia,serif;}
  .grid-bg{
    background-image:linear-gradient(rgba(22,163,74,0.05) 1px,transparent 1px),
      linear-gradient(90deg,rgba(22,163,74,0.05) 1px,transparent 1px);
    background-size:52px 52px;
  }
  .card-lift{transition:transform 0.22s ease,box-shadow 0.22s ease;cursor:pointer;}
  .card-lift:hover{transform:translateY(-5px);box-shadow:0 20px 60px rgba(22,163,74,0.12)!important;}
  .nav-link{transition:color 0.15s;}
  .nav-link:hover{color:#16A34A!important;}
  .btn-green{transition:background 0.15s,transform 0.12s;}
  .btn-green:hover{background:#15803D!important;transform:translateY(-1px);}
  .btn-outline{transition:all 0.15s;}
  .btn-outline:hover{border-color:#16A34A!important;color:#16A34A!important;transform:translateY(-1px);}
  .input-field:focus{border-color:#16A34A!important;outline:none;box-shadow:0 0 0 3px rgba(22,163,74,0.12);}
  .img-zoom{transition:transform 0.4s ease;}
  .card-lift:hover .img-zoom{transform:scale(1.05);}
  .tag{font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:#16A34A;}
  .pulse{animation:pulse 2s infinite;}
  @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
  @keyframes sparkleFloat{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-60px) scale(0.3);}}
  @keyframes slideDown{from{opacity:0;transform:translateY(-12px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes toastIn{from{opacity:0;transform:translateX(60px);}to{opacity:1;transform:translateX(0);}}
  @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
  @keyframes expandIn{from{opacity:0;max-height:0;}to{opacity:1;max-height:400px;}}
  .slide-down{animation:slideDown 0.2s ease;}
  .fade-in{animation:fadeIn 0.3s ease;}
  .toast-in{animation:toastIn 0.3s ease;}
  .expand-in{animation:expandIn 0.25s ease;overflow:hidden;}
  .event-row{transition:background 0.15s;border-radius:10px;padding:1rem 0.75rem;margin:0 -0.75rem;}
  .event-row:hover{background:#F8FAFB;}
  .tab-btn{transition:all 0.15s;border:none;background:none;cursor:pointer;padding:0.6rem 1.2rem;border-radius:8px;font-size:0.82rem;font-weight:600;color:#6B7280;}
  .tab-btn.active{background:#DCFCE7;color:#166534;}
  .tab-btn:hover:not(.active){background:#F3F4F6;}
  .notif-row{transition:background 0.15s;}
  .notif-row:hover{background:#FAFBFC;}
  .icon-btn{transition:all 0.15s;}
  .icon-btn:hover{background:#F3F4F6!important;}
  textarea{resize:vertical;}
  .shimmer-line{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;}
  
  .section-pad{padding:7rem 2.5rem;}
  .section-pad-sm{padding:5rem 1.25rem 3rem;}
  .footer-pad{padding:5rem 2.5rem 2.5rem;}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);}
  .hero-section{padding:0 2.5rem;min-height:95vh;display:flex;align-items:center;}
  .hero-grid{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:5rem;}
  .hero-stats-row{display:flex;gap:2.5rem;flex-wrap:wrap;}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;}
  .desktop-nav{display:flex;gap:1.75rem;}
  .mobile-nav-toggle{display:none;}
  .mobile-nav-panel{display:none;width:100%;}
  .mobile-nav-panel.open{display:flex;}
  .section-heading{font-size:2.4rem;}
  
  @media (max-width:1024px){
    .grid-3{grid-template-columns:repeat(2,1fr);}
  }
  @media (max-width:860px){
    .hero-grid{grid-template-columns:1fr;gap:2.5rem;}
    .grid-2{grid-template-columns:1fr;gap:2rem;}
    .footer-grid{grid-template-columns:1fr 1fr;gap:2.5rem;}
  }
  @media (max-width:768px){
    .section-pad{padding:3.5rem 1.25rem;}
    .footer-pad{padding:3rem 1.25rem 1.75rem;}
    .hero-section{padding:0 1.25rem;min-height:auto;padding-top:2rem;padding-bottom:2.5rem;}
    .grid-3{grid-template-columns:1fr;gap:1.25rem;}
    .grid-4{grid-template-columns:repeat(2,1fr);}
    .section-heading{font-size:1.85rem;}
    .desktop-nav{display:none;}
    .mobile-nav-toggle{display:flex;}
    .mobile-nav-panel.open{display:flex;}
    .hide-on-mobile{display:none!important;}
    .notif-panel-mobile{width:calc(100vw - 2rem)!important;right:-0.5rem!important;}
    .modal-shell-mobile{padding:1rem!important;}
  }
  @media (max-width:600px){
    .footer-bottom-row{flex-direction:column;text-align:center;}
    .grid-4{grid-template-columns:repeat(2,1fr);}
    .footer-grid{grid-template-columns:1fr;gap:2rem;}
    .admin-tabs-row{overflow-x:auto;flex-wrap:nowrap!important;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
    .admin-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
    .toast-mobile{left:1rem!important;right:1rem!important;max-width:none!important;bottom:1rem!important;}
  }
`;