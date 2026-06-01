import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const G = {
  gold: "#C9A84C", goldDark: "#8B6914", goldLight: "#E2C06A",
  bg: "#080808", card: "#111111",
  border: "#1e1e1e", borderGold: "rgba(201,168,76,0.3)",
  text: "#f0ebe0", muted: "#7a7060", faint: "#2a2520",
};

const ADMIN_PASSWORD = "imperio2026";

// ─────────────────────────────────────────────────────────────
// DADOS SIMULADOS
// ─────────────────────────────────────────────────────────────
const DADOS_INICIAIS = {
  recados: [
    { id:1, titulo:"Boas-vindas ao Império", data:"28 Mai 2026", tag:"PRESIDÊNCIA", texto:"É com muito propósito que iniciamos mais um ciclo do Império Café com Mães. Este é o nosso espaço oficial de comunicação. Fiquem atentas aos recados — aqui estão as diretrizes, os próximos passos e as informações mais importantes para o nosso crescimento coletivo.", link:"", linkLabel:"" },
    { id:2, titulo:"Café Estratégico — Junho confirmado", data:"25 Mai 2026", tag:"EVENTO", texto:"O Café Estratégico de junho acontecerá na primeira segunda-feira do mês. Confirmem presença até 30 de maio. Vagas limitadas para garantir qualidade no networking.", link:"https://wa.me/5500000000000", linkLabel:"Confirmar presença" },
  ],
  agenda: [
    { id:1, nome:"Café Estratégico", data:"01 Jun 2026", diaSemana:"SEG", horario:"13h30 – 17h30", local:"A confirmar — São Paulo, SP", descricao:"Encontro mensal presencial com rodada de negócios, networking estratégico e desenvolvimento empresarial.", tipo:"presencial", recorrencia:"Toda 1ª segunda-feira" },
    { id:2, nome:"Chave Mestra", data:"04 Jun 2026", diaSemana:"QUA", horario:"13h30 – 14h30", local:"Online — Link via WhatsApp", descricao:"Encontro semanal online com conteúdo estratégico, mentalidade empresarial e troca entre as membros.", tipo:"online", recorrencia:"Toda quarta-feira" },
    { id:3, nome:"Integração / Rodada Online", data:"25 Jun 2026", diaSemana:"QUA", horario:"13h30 – 14h30", local:"Online — Link via WhatsApp", descricao:"Última quarta do mês: rodada de negócios online e integração das credenciadas de todo o Brasil.", tipo:"online", recorrencia:"Última quarta do mês" },
  ],
  credenciadas: [
    { id:1, nome:"Carla Mendonça", empresa:"CM Consultoria", segmento:"Consultoria Empresarial", cidade:"São Paulo, SP", instagram:"@carlamendonca", whatsapp:"5511999990001", bio:"Especialista em estruturação de negócios para mulheres. Mais de 10 anos ajudando empreendedoras a crescerem com estratégia.", iniciais:"CM", cor:"#7a5c00" },
    { id:2, nome:"Fernanda Alves", empresa:"FA Digital", segmento:"Marketing Digital", cidade:"Rio de Janeiro, RJ", instagram:"@fernandaalves.mkt", whatsapp:"5521999990002", bio:"Criadora de estratégias de presença digital para negócios femininos. Especialista em posicionamento e autoridade online.", iniciais:"FA", cor:"#5a4400" },
    { id:3, nome:"Ana Beatriz Souza", empresa:"AB Finanças", segmento:"Consultoria Financeira", cidade:"Belo Horizonte, MG", instagram:"@anabeafinancas", whatsapp:"5531999990003", bio:"Finanças sem drama para mães empreendedoras. Ajudo negócios a saírem do vermelho e construírem caixa com consistência.", iniciais:"AB", cor:"#6b4f00" },
    { id:4, nome:"Juliana Costa", empresa:"Costa Advocacia", segmento:"Advocacia Empresarial", cidade:"Curitiba, PR", instagram:"@julianacosta.adv", whatsapp:"5541999990004", bio:"Advogada especialista em direito empresarial para MEIs e pequenas empresas.", iniciais:"JC", cor:"#7a5c00" },
    { id:5, nome:"Patrícia Lima", empresa:"Studio Lima", segmento:"Estética e Bem-Estar", cidade:"Brasília, DF", instagram:"@patricialima.estetica", whatsapp:"5561999990005", bio:"Empresária do setor de estética há 8 anos.", iniciais:"PL", cor:"#5a4400" },
  ],
  manuais: [
    { id:1, titulo:"Manual Ela x Ela", subtitulo:"Relacionamento entre credenciadas", categoria:"RELACIONAMENTO", descricao:"O Manual Ela x Ela define as diretrizes de relacionamento entre as credenciadas do Império.", secoes:[{ titulo:"O que é o Ela x Ela", conteudo:"O Ela x Ela é o código de convivência entre as mulheres do Império. Não é um regulamento frio — é um pacto." },{ titulo:"Princípios fundamentais", conteudo:"1. Colaboração antes de competição.\n2. Ética sem exceção.\n3. Presença com propósito.\n4. Respeito à jornada de cada uma." },{ titulo:"O que não pertence ao Império", conteudo:"Fofoca, comparação, sabotagem velada e comportamento que diminui outras credenciadas não têm espaço aqui." }] },
    { id:2, titulo:"Manual da Sua Jornada", subtitulo:"Guia completo da credenciada", categoria:"ONBOARDING", descricao:"Guia de boas-vindas e orientação para todas as credenciadas do Império.", secoes:[{ titulo:"Bem-vinda ao Império", conteudo:"Você não entrou para uma comunidade qualquer. Você entrou para uma estrutura de desenvolvimento empresarial construída especificamente para mães empreendedoras." },{ titulo:"O que você tem acesso", conteudo:"— Café Estratégico mensal\n— Chave Mestra semanal\n— Rodada de Negócios\n— Cafeflix\n— Biblioteca Imperial\n— Grupo oficial" },{ titulo:"Próximos passos", conteudo:"1. Complete seu perfil.\n2. Apresente-se no grupo.\n3. Confirme presença no próximo Café Estratégico.\n4. Acesse o Cafeflix." }] },
  ],
  // ── CONVITES ──────────────────────────────────────────────
  // Para atualizar: substitua o campo "link" pelo link real de pagamento
  convites: [
    {
      id:1,
      cidade:"Itu",
      estado:"SP",
      descricao:"Café Estratégico presencial em Itu. Networking, rodada de negócios e desenvolvimento empresarial.",
      data:"Toda 1ª segunda-feira do mês",
      horario:"13h30 – 17h30",
      link:"https://link-de-pagamento-itu.com.br",
      vagas:"Vagas limitadas",
      cor:"#7a5c00",
    },
    {
      id:2,
      cidade:"Porto Feliz",
      estado:"SP",
      descricao:"Café Estratégico presencial em Porto Feliz. Encontro de mães empreendedoras com foco em crescimento e estratégia.",
      data:"Toda 1ª segunda-feira do mês",
      horario:"13h30 – 17h30",
      link:"https://link-de-pagamento-portofeliz.com.br",
      vagas:"Vagas limitadas",
      cor:"#5a4400",
    },
  ],
  // ── CAFEFLIX ──────────────────────────────────────────────
  // Para adicionar vídeos reais: substitua o youtubeId pelo ID do vídeo do YouTube
  // Ex: https://www.youtube.com/watch?v=ABC123 → youtubeId: "ABC123"
  cafeflix: [
    {
      id:1, categoria:"Mentalidade Empresarial", cor:"#7a5c00",
      aulas:[
        { id:101, titulo:"A virada de mentalidade que muda tudo", descricao:"Como sair do modo sobrevivência e entrar no modo crescimento.", duracao:"28 min", youtubeId:"dQw4w9WgXcQ" },
        { id:102, titulo:"Identidade antes de estratégia", descricao:"Quem você precisa se tornar para ter o negócio que deseja.", duracao:"34 min", youtubeId:"dQw4w9WgXcQ" },
        { id:103, titulo:"O preço da estagnação", descricao:"Por que ficar na zona de conforto custa mais do que crescer.", duracao:"22 min", youtubeId:"dQw4w9WgXcQ" },
      ],
    },
    {
      id:2, categoria:"Negócios e Estratégia", cor:"#5a4400",
      aulas:[
        { id:201, titulo:"Estrutura antes de escala", descricao:"Os pilares que todo negócio precisa ter antes de crescer.", duracao:"41 min", youtubeId:"dQw4w9WgXcQ" },
        { id:202, titulo:"Precificação com autoridade", descricao:"Como cobrar o que você vale sem sentir culpa.", duracao:"31 min", youtubeId:"dQw4w9WgXcQ" },
        { id:203, titulo:"Networking que gera resultado", descricao:"Como transformar relacionamentos em negócios reais.", duracao:"25 min", youtubeId:"dQw4w9WgXcQ" },
        { id:204, titulo:"Posicionamento de autoridade", descricao:"Como ser reconhecida como referência no seu segmento.", duracao:"38 min", youtubeId:"dQw4w9WgXcQ" },
      ],
    },
    {
      id:3, categoria:"Maternidade e Negócio", cor:"#6b4f00",
      aulas:[
        { id:301, titulo:"Mãe e empresária — sem culpa", descricao:"Como integrar maternidade e negócio sem perder nenhum dos dois.", duracao:"36 min", youtubeId:"dQw4w9WgXcQ" },
        { id:302, titulo:"Rotina que funciona de verdade", descricao:"Organização prática para mães que constroem impérios.", duracao:"29 min", youtubeId:"dQw4w9WgXcQ" },
        { id:303, titulo:"O legado que você está construindo", descricao:"Negócio como instrumento de propósito e impacto familiar.", duracao:"33 min", youtubeId:"dQw4w9WgXcQ" },
      ],
    },
    {
      id:4, categoria:"Fé e Propósito", cor:"#4a3800",
      aulas:[
        { id:401, titulo:"Negócio com propósito bíblico", descricao:"Como alinhar sua missão empresarial com seus valores de fé.", duracao:"27 min", youtubeId:"dQw4w9WgXcQ" },
        { id:402, titulo:"Provérbios 31 na prática", descricao:"A mulher virtuosa como modelo de empreendedora.", duracao:"44 min", youtubeId:"dQw4w9WgXcQ" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { font-size:16px; }
  body { background:#080808; color:#f0ebe0; font-family:'Inter',sans-serif; -webkit-font-smoothing:antialiased; font-size:15px; line-height:1.6; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:#0d0d0d; }
  ::-webkit-scrollbar-thumb { background:#8B6914; border-radius:2px; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
  .fade-up { animation:fadeUp 0.45s ease forwards; }
  .fade-in { animation:fadeIn 0.3s ease forwards; }
  button, a, input, textarea, select { font-family:'Inter',sans-serif; font-size:14px; }
  textarea { resize:vertical; }
  .yt-wrapper { position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; }
  .yt-wrapper iframe { position:absolute; top:0; left:0; width:100%; height:100%; border:0; }
`;

// ─────────────────────────────────────────────────────────────
// ÍCONES SVG
// ─────────────────────────────────────────────────────────────
const Icon = ({ name, size=22, color="currentColor" }) => {
  const s = { width:size, height:size, display:"block", flexShrink:0 };
  const icons = {
    book:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    users:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    calendar:  <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    bell:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    play:      <svg style={s} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    playCircle:<svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill={color} stroke="none"/></svg>,
    shield:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    arrowLeft: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    chevDown:  <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
    chevRight: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    extLink:   <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    search:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    location:  <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    clock:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    whatsapp:  <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
    instagram: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    briefcase: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    fileText:  <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    check:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    plus:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
    lock:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    logOut:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    phone:     <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    film:      <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
    tag:       <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    x:         <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    ticket:    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/><line x1="9" y1="2" x2="9" y2="22"/></svg>,
  };
  return icons[name] || null;
};

// ─────────────────────────────────────────────────────────────
// PRIMITIVOS
// ─────────────────────────────────────────────────────────────
const Divider = ({ my=18 }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8, margin:`${my}px 0` }}>
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${G.gold})` }}/>
    <div style={{ width:4, height:4, background:G.gold, transform:"rotate(45deg)" }}/>
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${G.gold},transparent)` }}/>
  </div>
);

const Tag = ({ children, variant="default" }) => {
  const v = {
    default:       { bg:"rgba(255,255,255,0.05)", border:"#2a2a2a", color:"#666" },
    gold:          { bg:"rgba(201,168,76,0.12)",  border:G.borderGold, color:G.gold },
    presencial:    { bg:"rgba(201,168,76,0.12)",  border:G.borderGold, color:G.goldLight },
    online:        { bg:"rgba(255,255,255,0.04)", border:"#252525", color:"#666" },
    presidencia:   { bg:"rgba(201,168,76,0.1)",   border:G.borderGold, color:G.gold },
    evento:        { bg:"rgba(220,180,40,0.08)",  border:"rgba(220,180,40,0.2)", color:"#c09820" },
    rede:          { bg:"rgba(100,180,100,0.07)", border:"rgba(100,180,100,0.2)", color:"#5a9d5a" },
    onboarding:    { bg:"rgba(100,140,220,0.08)", border:"rgba(100,140,220,0.2)", color:"#6080c0" },
    relacionamento:{ bg:"rgba(180,100,140,0.08)", border:"rgba(180,100,140,0.2)", color:"#b06080" },
    admin:         { bg:"rgba(201,168,76,0.15)",  border:G.gold, color:G.gold },
  };
  const s = v[variant.toLowerCase()] || v.default;
  return <span style={{ display:"inline-block", padding:"4px 11px", borderRadius:20, border:`1px solid ${s.border}`, background:s.bg, color:s.color, fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase" }}>{children}</span>;
};

const Btn = ({ children, onClick, variant="gold", size="md", icon, disabled=false, style:sx={} }) => {
  const variants = {
    gold:   { bg:`linear-gradient(135deg,${G.gold},${G.goldDark})`, color:"#0a0a0a", border:"none" },
    outline:{ bg:"transparent", color:G.gold, border:`1px solid ${G.borderGold}` },
    ghost:  { bg:"transparent", color:G.muted, border:`1px solid ${G.border}` },
    danger: { bg:"rgba(180,50,50,0.15)", color:"#c06060", border:"1px solid rgba(180,50,50,0.3)" },
  };
  const sizes = { sm:{ padding:"8px 16px", fontSize:11 }, md:{ padding:"13px 22px", fontSize:13 }, lg:{ padding:"16px 30px", fontSize:14 } };
  const vv = variants[variant]; const ss = sizes[size];
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ display:"inline-flex", alignItems:"center", gap:7, borderRadius:9, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.4:1, transition:"opacity 0.2s", ...vv, ...ss, ...sx }}>
      {icon && <Icon name={icon} size={13} color="currentColor"/>}{children}
    </button>
  );
};

const Input = ({ label, value, onChange, placeholder, type="text", multiline=false }) => (
  <div style={{ marginBottom:14 }}>
    {label && <div style={{ fontSize:11, color:G.gold, letterSpacing:2, fontWeight:700, marginBottom:7, textTransform:"uppercase" }}>{label}</div>}
    {multiline
      ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3}
          style={{ width:"100%", padding:"13px 16px", background:"#0e0e0e", border:`1px solid ${G.border}`, borderRadius:9, color:G.text, fontSize:14, outline:"none", lineHeight:1.7 }}
          onFocus={e=>e.target.style.borderColor=G.borderGold}
          onBlur={e=>e.target.style.borderColor=G.border}/>
      : <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={{ width:"100%", padding:"13px 16px", background:"#0e0e0e", border:`1px solid ${G.border}`, borderRadius:9, color:G.text, fontSize:14, outline:"none" }}
          onFocus={e=>e.target.style.borderColor=G.borderGold}
          onBlur={e=>e.target.style.borderColor=G.border}/>
    }
  </div>
);

// ─────────────────────────────────────────────────────────────
// HEADER PADRÃO
// ─────────────────────────────────────────────────────────────
function Header({ titulo, subtitulo, voltar, labelVoltar="Início", right }) {
  return (
    <div style={{ background:"linear-gradient(170deg,#0c0c0c 0%,#120e00 100%)", padding:"44px 22px 26px", borderBottom:`1px solid ${G.border}`, position:"sticky", top:0, zIndex:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <button onClick={voltar}
          style={{ background:"none", border:`1px solid ${G.border}`, borderRadius:8, padding:"7px 14px", color:G.muted, fontSize:11, letterSpacing:1, cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=G.gold;e.currentTarget.style.color=G.gold;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.color=G.muted;}}>
          <Icon name="arrowLeft" size={14} color="currentColor"/> {labelVoltar}
        </button>
        {right}
      </div>
      <div style={{ fontSize:10, color:G.gold, letterSpacing:3, marginBottom:7, fontWeight:700 }}>IMPÉRIO CAFÉ COM MÃES</div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:G.text, lineHeight:1.1, marginBottom:6 }}>{titulo}</h2>
      {subtitulo && <p style={{ fontSize:13, color:G.muted }}>{subtitulo}</p>}
      <Divider my={16}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TELA INICIAL
// ─────────────────────────────────────────────────────────────
const MENU = [
  { id:"biblioteca", label:"Biblioteca Imperial",       icon:"book",     desc:"Manuais e guias oficiais" },
  { id:"mapa",       label:"Mapa das Credenciadas",     icon:"users",    desc:"Perfis, contatos e segmentos" },
  { id:"painel",     label:"Painel do Império",         icon:"bell",     desc:"Avisos, datas e recados" },
  { id:"agenda",     label:"Agenda Oficial",            icon:"calendar", desc:"Compromissos do mês" },
  { id:"convites",   label:"Convite Café Estratégico",  icon:"ticket",   desc:"Links de pagamento por cidade" },
  { id:"cafeflix",   label:"Cafeflix",                  icon:"film",     desc:"Cursos e aulas gravadas" },
];

function TelaInicial({ ir, isAdmin }) {
  const [hover, setHover] = useState(null);
  return (
    <div className="fade-in" style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      {/* HERO */}
      <div style={{ background:"linear-gradient(160deg,#080808 0%,#160f00 50%,#080808 100%)", padding:"60px 28px 50px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 70% 50% at 50% 65%,rgba(201,168,76,0.09) 0%,transparent 75%)", pointerEvents:"none" }}/>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:30 }}>
          <div style={{ height:1, width:40, background:`linear-gradient(90deg,transparent,${G.faint})` }}/>
          <div style={{ width:3, height:3, background:G.goldDark, transform:"rotate(45deg)" }}/>
          <span style={{ color:G.gold, fontSize:9, letterSpacing:4, fontWeight:700 }}>EST. 2024</span>
          <div style={{ width:3, height:3, background:G.goldDark, transform:"rotate(45deg)" }}/>
          <div style={{ height:1, width:40, background:`linear-gradient(90deg,${G.faint},transparent)` }}/>
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, letterSpacing:6, color:G.muted, marginBottom:8, textTransform:"uppercase" }}>Bem-vinda ao</p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:54, fontWeight:700, lineHeight:1, color:G.text, letterSpacing:2, marginBottom:6 }}>Império</h1>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:500, letterSpacing:6, color:G.gold, textTransform:"uppercase", marginBottom:28 }}>Café com Mães</div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, marginBottom:22 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ height:1, width:60, background:`linear-gradient(90deg,transparent,${G.gold})` }}/>
            <div style={{ width:4, height:4, background:G.gold, transform:"rotate(45deg)" }}/>
            <div style={{ height:1, width:60, background:`linear-gradient(90deg,${G.gold},transparent)` }}/>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ height:1, width:40, background:`linear-gradient(90deg,transparent,${G.goldDark})` }}/>
            <div style={{ width:2, height:2, background:G.goldDark, borderRadius:"50%" }}/>
            <div style={{ height:1, width:40, background:`linear-gradient(90deg,${G.goldDark},transparent)` }}/>
          </div>
        </div>
        <p style={{ color:G.muted, fontSize:14, lineHeight:2, letterSpacing:0.3, maxWidth:300, margin:"0 auto 24px" }}>
          Desenvolvimento empresarial e networking estratégico para mães empreendedoras.
        </p>
        <div style={{ background:"rgba(201,168,76,0.06)", border:`1px solid ${G.borderGold}`, borderRadius:12, padding:"16px 20px", maxWidth:320, margin:"0 auto" }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:15, color:"#b09060", lineHeight:1.8 }}>
            "Ela é revestida de força e dignidade, e ri dos dias vindouros."
          </p>
          <p style={{ fontSize:10, color:G.goldDark, letterSpacing:2, marginTop:8, fontWeight:700 }}>PROVÉRBIOS 31:25</p>
        </div>
        {isAdmin && <div style={{ marginTop:16, display:"flex", justifyContent:"center" }}><Tag variant="admin">Modo Administradora</Tag></div>}
      </div>

      {/* MENU */}
      <div style={{ flex:1, background:"#090909", padding:"30px 20px 48px" }}>
        <p style={{ fontSize:10, color:"#333", letterSpacing:3, textTransform:"uppercase", textAlign:"center", marginBottom:20, fontWeight:700 }}>Acesso rápido</p>

        {/* Grid 2x2 + destaque Cafeflix */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
          {MENU.filter(m=>m.id!=="cafeflix").map((item, i) => {
            const h = hover === item.id;
            return (
              <button key={item.id} onClick={()=>ir(item.id)}
                onMouseEnter={()=>setHover(item.id)}
                onMouseLeave={()=>setHover(null)}
                style={{ background:h?"linear-gradient(145deg,#1e1600,#140e00)":"linear-gradient(145deg,#141414,#0f0f0f)", border:`1px solid ${h?G.gold:G.border}`, borderRadius:14, padding:"22px 16px", cursor:"pointer", textAlign:"left", transition:"all 0.2s", animation:`fadeUp 0.45s ease ${i*0.07}s forwards`, opacity:0 }}>
                <div style={{ marginBottom:12, color:h?G.gold:G.muted, transition:"color 0.2s" }}>
                  <Icon name={item.icon} size={24} color="currentColor"/>
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:700, color:G.text, marginBottom:5, lineHeight:1.2 }}>{item.label}</div>
                <div style={{ fontSize:11, color:"#3e3e3e", lineHeight:1.5 }}>{item.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Cafeflix — botão destaque largura total */}
        <button onClick={()=>ir("cafeflix")}
          onMouseEnter={()=>setHover("cafeflix")}
          onMouseLeave={()=>setHover(null)}
          style={{
            width:"100%", padding:"20px 22px",
            background: hover==="cafeflix" ? "linear-gradient(135deg,#1e1600,#140e00)" : "linear-gradient(135deg,#181200,#100c00)",
            border:`1px solid ${hover==="cafeflix" ? G.gold : G.borderGold}`,
            borderRadius:14, cursor:"pointer", textAlign:"left",
            display:"flex", alignItems:"center", gap:16,
            transition:"all 0.2s",
            animation:"fadeUp 0.45s ease 0.32s forwards", opacity:0,
            marginBottom:12,
          }}>
          <div style={{ width:52, height:52, borderRadius:12, background:"rgba(201,168,76,0.12)", border:`1px solid ${G.borderGold}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <Icon name="play" size={24} color={G.gold}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:G.goldLight }}>Cafeflix</span>
              <span style={{ fontSize:9, background:`linear-gradient(135deg,${G.gold},${G.goldDark})`, color:"#0a0a0a", padding:"2px 7px", borderRadius:10, fontWeight:700, letterSpacing:1 }}>NOVO</span>
            </div>
            <div style={{ fontSize:12, color:G.muted }}>Cursos e aulas gravadas · acesso livre</div>
          </div>
          <Icon name="chevRight" size={18} color={G.gold}/>
        </button>

        {/* Acesso admin */}
        <button onClick={()=>ir("admin")}
          style={{ width:"100%", padding:"14px 20px", background:"transparent", border:`1px solid ${isAdmin?G.borderGold:"#1a1a1a"}`, borderRadius:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, transition:"all 0.2s", animation:"fadeUp 0.45s ease 0.42s forwards", opacity:0 }}
          onMouseEnter={e=>e.currentTarget.style.borderColor=G.borderGold}
          onMouseLeave={e=>e.currentTarget.style.borderColor=isAdmin?G.borderGold:"#1a1a1a"}>
          <Icon name={isAdmin?"shield":"lock"} size={14} color={isAdmin?G.gold:"#333"}/>
          <span style={{ fontSize:10, color:isAdmin?G.gold:"#333", letterSpacing:2, fontWeight:700 }}>{isAdmin?"PAINEL ADMINISTRATIVO":"ACESSO ADMIN"}</span>
        </button>
        <div style={{ textAlign:"center", marginTop:28 }}>
          <span style={{ fontSize:10, color:"#222", letterSpacing:2 }}>IMPÉRIO CAFÉ COM MÃES · 2026</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CAFEFLIX
// ─────────────────────────────────────────────────────────────
function PlayerAula({ aula, categoria, voltar }) {
  const totalAulas = categoria.aulas.length;
  const idx = categoria.aulas.findIndex(a=>a.id===aula.id);

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:"#050505" }}>
      {/* Botão voltar simples */}
      <div style={{ padding:"44px 20px 16px" }}>
        <button onClick={voltar}
          style={{ background:"none", border:`1px solid ${G.border}`, borderRadius:8, padding:"7px 14px", color:G.muted, fontSize:11, letterSpacing:1, cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=G.gold;e.currentTarget.style.color=G.gold;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.color=G.muted;}}>
          <Icon name="arrowLeft" size={14} color="currentColor"/> {categoria.categoria}
        </button>
      </div>

      {/* Player YouTube */}
      <div style={{ padding:"0 0 0 0" }}>
        <div className="yt-wrapper" style={{ borderRadius:0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${aula.youtubeId}?rel=0&modestbranding=1&color=white`}
            title={aula.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Info da aula */}
      <div style={{ padding:"24px 20px 40px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ fontSize:9, color:G.gold, letterSpacing:2, fontWeight:700 }}>{categoria.categoria.toUpperCase()}</span>
          <span style={{ fontSize:9, color:G.muted }}>· Aula {idx+1} de {totalAulas}</span>
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:G.text, lineHeight:1.2, marginBottom:10 }}>{aula.titulo}</h2>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14 }}>
          <Icon name="clock" size={15} color={G.muted}/><span style={{ fontSize:13, color:G.muted }}>{aula.duracao}</span>
        </div>
        <p style={{ fontSize:15, color:"#b0a898", lineHeight:1.8, fontWeight:300 }}>{aula.descricao}</p>

        <Divider my={20}/>

        {/* Outras aulas da categoria */}
        <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:14 }}>MAIS DESTA CATEGORIA</div>
        {categoria.aulas.filter(a=>a.id!==aula.id).map(a=>(
          <button key={a.id} onClick={()=>voltar(a)}
            style={{ width:"100%", padding:"14px 16px", background:"linear-gradient(145deg,#111,#0e0e0e)", border:`1px solid ${G.border}`, borderRadius:10, marginBottom:8, cursor:"pointer", display:"flex", alignItems:"center", gap:12, textAlign:"left", transition:"border-color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=G.gold}
            onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>
            <div style={{ width:32, height:32, borderRadius:8, background:"rgba(201,168,76,0.08)", border:`1px solid ${G.borderGold}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon name="play" size={12} color={G.gold}/>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, color:G.text, fontWeight:500, lineHeight:1.3, marginBottom:2 }}>{a.titulo}</div>
              <div style={{ fontSize:10, color:G.muted }}>{a.duracao}</div>
            </div>
            <Icon name="chevRight" size={14} color={G.muted}/>
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoriaDetalhe({ cat, voltar, isAdmin, onExcluirAula, onAdicionarAula }) {
  const [aulaAberta, setAulaAberta] = useState(null);
  const [novoForm, setNovoForm] = useState(false);
  const [form, setForm] = useState({ titulo:"", descricao:"", duracao:"", youtubeId:"" });

  const adicionar = () => {
    if (!form.titulo || !form.youtubeId) return;
    onAdicionarAula(cat.id, { id:Date.now(), ...form });
    setForm({ titulo:"", descricao:"", duracao:"", youtubeId:"" });
    setNovoForm(false);
  };

  if (aulaAberta) {
    return <PlayerAula aula={aulaAberta} categoria={cat} voltar={(outraAula)=>{ if(outraAula && outraAula.id) setAulaAberta(outraAula); else setAulaAberta(null); }}/>;
  }

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      <div style={{ background:"linear-gradient(170deg,#0c0c0c,#130e00)", padding:"44px 22px 28px", borderBottom:`1px solid ${G.border}` }}>
        <button onClick={voltar}
          style={{ background:"none", border:`1px solid ${G.border}`, borderRadius:8, padding:"7px 14px", color:G.muted, fontSize:11, letterSpacing:1, cursor:"pointer", marginBottom:22, display:"flex", alignItems:"center", gap:8 }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=G.gold;e.currentTarget.style.color=G.gold;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.color=G.muted;}}>
          <Icon name="arrowLeft" size={14} color="currentColor"/> Cafeflix
        </button>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:6 }}>CAFEFLIX · CATEGORIA</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:G.text, lineHeight:1.2, marginBottom:4 }}>{cat.categoria}</h2>
            <p style={{ fontSize:11, color:G.muted }}>{cat.aulas.length} aulas</p>
          </div>
          {isAdmin && <Btn variant="outline" icon="plus" size="sm" onClick={()=>setNovoForm(!novoForm)}>Aula</Btn>}
        </div>
        <Divider my={16}/>
      </div>

      <div style={{ padding:"24px 20px 48px" }}>
        {isAdmin && novoForm && (
          <div className="fade-in" style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"22px 20px", marginBottom:20 }}>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:16 }}>NOVA AULA</div>
            <Input label="Título" value={form.titulo} onChange={e=>setForm(f=>({...f,titulo:e.target.value}))} placeholder="Título da aula"/>
            <Input label="Descrição" value={form.descricao} onChange={e=>setForm(f=>({...f,descricao:e.target.value}))} placeholder="Descrição breve..." multiline/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="Duração" value={form.duracao} onChange={e=>setForm(f=>({...f,duracao:e.target.value}))} placeholder="Ex: 32 min"/>
              <Input label="YouTube ID" value={form.youtubeId} onChange={e=>setForm(f=>({...f,youtubeId:e.target.value}))} placeholder="Ex: dQw4w9WgXcQ"/>
            </div>
            <p style={{ fontSize:10, color:G.muted, marginBottom:14, lineHeight:1.6 }}>
              O ID do YouTube é a parte após <strong style={{color:G.gold}}>?v=</strong> na URL do vídeo.
              Ex: youtube.com/watch?v=<strong style={{color:G.gold}}>ABC123</strong>
            </p>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="gold" onClick={adicionar} sx={{ flex:1 }}>Adicionar</Btn>
              <Btn variant="ghost" onClick={()=>setNovoForm(false)} sx={{ flex:1 }}>Cancelar</Btn>
            </div>
          </div>
        )}

        {cat.aulas.map((aula, i) => (
          <div key={aula.id}
            style={{ background:`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${G.border}`, borderRadius:14, marginBottom:12, overflow:"hidden", transition:"border-color 0.2s", animation:`fadeUp 0.45s ease ${i*0.08}s forwards`, opacity:0 }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=G.gold}
            onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>
            {/* Thumbnail simulada */}
            <div onClick={()=>setAulaAberta(aula)}
              style={{ position:"relative", background:`linear-gradient(135deg,${cat.cor},#050300)`, paddingBottom:"40%", cursor:"pointer", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(201,168,76,0.2)", backdropFilter:"blur(4px)", border:`2px solid rgba(201,168,76,0.5)`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.2s" }}>
                  <Icon name="play" size={22} color={G.gold}/>
                </div>
              </div>
              <div style={{ position:"absolute", bottom:10, right:12 }}>
                <span style={{ fontSize:10, color:"rgba(240,235,224,0.8)", background:"rgba(0,0,0,0.6)", padding:"3px 8px", borderRadius:6, fontWeight:600 }}>{aula.duracao}</span>
              </div>
              <div style={{ position:"absolute", top:10, left:12 }}>
                <span style={{ fontSize:8, color:G.gold, background:"rgba(0,0,0,0.7)", padding:"3px 8px", borderRadius:6, fontWeight:700, letterSpacing:1 }}>AULA {i+1}</span>
              </div>
            </div>
            {/* Info */}
            <div style={{ padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:600, color:G.text, lineHeight:1.3, marginBottom:4, cursor:"pointer" }}
                    onClick={()=>setAulaAberta(aula)}>
                    {aula.titulo}
                  </div>
                  <p style={{ fontSize:13, color:G.muted, lineHeight:1.6, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{aula.descricao}</p>
                </div>
                {isAdmin && (
                  <button onClick={()=>onExcluirAula(cat.id, aula.id)}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"#555", padding:4, flexShrink:0 }}>
                    <Icon name="trash" size={14} color="currentColor"/>
                  </button>
                )}
              </div>
              <button onClick={()=>setAulaAberta(aula)}
                style={{ marginTop:12, display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", background:`linear-gradient(135deg,${G.gold},${G.goldDark})`, borderRadius:8, color:"#0a0a0a", fontSize:10, fontWeight:700, letterSpacing:1.5, border:"none", cursor:"pointer", textTransform:"uppercase" }}>
                <Icon name="play" size={11} color="#0a0a0a"/> Assistir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaCafeflix({ voltar, isAdmin, dados, setDados }) {
  const [catSel, setCatSel] = useState(null);
  const [novaCategoria, setNovaCategoria] = useState(false);
  const [formCat, setFormCat] = useState({ categoria:"", cor:"#7a5c00" });
  const CORES = ["#7a5c00","#5a4400","#6b4f00","#4a3800","#8a6a00","#3a2800"];

  const adicionarCategoria = () => {
    if (!formCat.categoria) return;
    setDados(d=>({ ...d, cafeflix:[...d.cafeflix, { id:Date.now(), ...formCat, aulas:[] }] }));
    setFormCat({ categoria:"", cor:"#7a5c00" });
    setNovaCategoria(false);
  };

  const excluirCategoria = (id, e) => { e.stopPropagation(); setDados(d=>({ ...d, cafeflix:d.cafeflix.filter(c=>c.id!==id) })); };

  const adicionarAula = (catId, aula) => setDados(d=>({ ...d, cafeflix:d.cafeflix.map(c=>c.id===catId?{ ...c, aulas:[...c.aulas,aula] }:c) }));
  const excluirAula = (catId, aulaId) => setDados(d=>({ ...d, cafeflix:d.cafeflix.map(c=>c.id===catId?{ ...c, aulas:c.aulas.filter(a=>a.id!==aulaId) }:c) }));

  if (catSel!==null) {
    const cat = dados.cafeflix.find(c=>c.id===catSel);
    return <CategoriaDetalhe cat={cat} voltar={()=>setCatSel(null)} isAdmin={isAdmin} onAdicionarAula={adicionarAula} onExcluirAula={excluirAula}/>;
  }

  const totalAulas = dados.cafeflix.reduce((sum,c)=>sum+c.aulas.length,0);

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      {/* Header Cafeflix customizado */}
      <div style={{ background:"linear-gradient(160deg,#080808 0%,#160f00 60%,#080808 100%)", padding:"44px 22px 28px", borderBottom:`1px solid ${G.border}`, position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <button onClick={voltar}
            style={{ background:"none", border:`1px solid ${G.border}`, borderRadius:8, padding:"7px 14px", color:G.muted, fontSize:11, letterSpacing:1, cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=G.gold;e.currentTarget.style.color=G.gold;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.color=G.muted;}}>
            <Icon name="arrowLeft" size={14} color="currentColor"/> Início
          </button>
          {isAdmin && <Btn variant="outline" icon="plus" size="sm" onClick={()=>setNovaCategoria(!novaCategoria)}>Categoria</Btn>}
        </div>
        {/* Logo Cafeflix */}
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:44, height:44, borderRadius:10, background:"rgba(201,168,76,0.12)", border:`1px solid ${G.borderGold}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon name="play" size={20} color={G.gold}/>
          </div>
          <div>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:2 }}>IMPÉRIO CAFÉ COM MÃES</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:G.text, lineHeight:1 }}>Cafeflix</h2>
          </div>
        </div>
        <Divider my={16}/>
        <div style={{ display:"flex", gap:20 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:G.gold }}>{dados.cafeflix.length}</div>
            <div style={{ fontSize:9, color:G.muted, letterSpacing:1, marginTop:2 }}>CATEGORIAS</div>
          </div>
          <div style={{ width:1, background:G.border }}/>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:G.gold }}>{totalAulas}</div>
            <div style={{ fontSize:9, color:G.muted, letterSpacing:1, marginTop:2 }}>AULAS</div>
          </div>
          <div style={{ width:1, background:G.border }}/>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:G.gold }}>∞</div>
            <div style={{ fontSize:9, color:G.muted, letterSpacing:1, marginTop:2 }}>ACESSO LIVRE</div>
          </div>
        </div>
      </div>

      <div style={{ padding:"24px 20px 48px" }}>
        {isAdmin && novaCategoria && (
          <div className="fade-in" style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"22px 20px", marginBottom:20 }}>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:16 }}>NOVA CATEGORIA</div>
            <Input label="Nome da categoria" value={formCat.categoria} onChange={e=>setFormCat(f=>({...f,categoria:e.target.value}))} placeholder="Ex: Finanças e Crescimento"/>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:9, color:G.gold, letterSpacing:2, fontWeight:700, marginBottom:8, textTransform:"uppercase" }}>Cor</div>
              <div style={{ display:"flex", gap:8 }}>
                {CORES.map(cor=>(
                  <button key={cor} onClick={()=>setFormCat(f=>({...f,cor}))}
                    style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${cor},#050300)`, border:`2px solid ${formCat.cor===cor?G.gold:"transparent"}`, cursor:"pointer" }}/>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="gold" onClick={adicionarCategoria} sx={{ flex:1 }}>Criar categoria</Btn>
              <Btn variant="ghost" onClick={()=>setNovaCategoria(false)} sx={{ flex:1 }}>Cancelar</Btn>
            </div>
          </div>
        )}

        {dados.cafeflix.map((cat, i) => (
          <div key={cat.id}
            onClick={()=>setCatSel(cat.id)}
            style={{ background:`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${G.border}`, borderRadius:14, marginBottom:12, overflow:"hidden", cursor:"pointer", transition:"border-color 0.2s", animation:`fadeUp 0.45s ease ${i*0.09}s forwards`, opacity:0 }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=G.gold}
            onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>
            {/* Banner da categoria */}
            <div style={{ background:`linear-gradient(135deg,${cat.cor},#080500)`, padding:"20px 20px 16px", position:"relative" }}>
              <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"40%", backgroundImage:"radial-gradient(ellipse at right,rgba(201,168,76,0.08),transparent)", pointerEvents:"none" }}/>
              <div style={{ fontSize:9, color:"rgba(201,168,76,0.7)", letterSpacing:3, fontWeight:700, marginBottom:6 }}>CAFEFLIX</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:G.text, lineHeight:1.2 }}>{cat.categoria}</h3>
            </div>
            {/* Info */}
            <div style={{ padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <Icon name="playCircle" size={14} color={G.gold}/>
                  <span style={{ fontSize:11, color:G.muted }}>{cat.aulas.length} aula{cat.aulas.length!==1?"s":""}</span>
                </div>
                {cat.aulas.length > 0 && (
                  <span style={{ fontSize:10, color:G.faint }}>
                    {cat.aulas.reduce((sum,a)=>{ const m=parseInt(a.duracao||"0"); return sum+m; },0)} min no total
                  </span>
                )}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                {isAdmin && <button onClick={e=>excluirCategoria(cat.id,e)} style={{ background:"none", border:"none", cursor:"pointer", color:"#555", padding:4 }}><Icon name="trash" size={14} color="currentColor"/></button>}
                <Icon name="chevRight" size={18} color={G.gold}/>
              </div>
            </div>
            {/* Preview das aulas */}
            {cat.aulas.length > 0 && (
              <div style={{ borderTop:`1px solid ${G.border}`, padding:"10px 20px 14px" }}>
                {cat.aulas.slice(0,2).map(a=>(
                  <div key={a.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0" }}>
                    <div style={{ width:4, height:4, background:G.faint, borderRadius:"50%", flexShrink:0 }}/>
                    <span style={{ fontSize:13, color:"#666", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1 }}>{a.titulo}</span>
                    <span style={{ fontSize:11, color:G.faint, flexShrink:0 }}>{a.duracao}</span>
                  </div>
                ))}
                {cat.aulas.length > 2 && (
                  <div style={{ fontSize:10, color:G.gold, marginTop:4, paddingLeft:14 }}>+ {cat.aulas.length-2} aulas</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADMIN
// ─────────────────────────────────────────────────────────────
function TelaAdminLogin({ onLogin, onLogout, isAdmin, voltar }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  if (isAdmin) return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      <Header titulo="Painel Admin" subtitulo="Você está como administradora" voltar={voltar}/>
      <div style={{ padding:"32px 20px 48px" }}>
        <div style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"24px 20px", marginBottom:20, textAlign:"center" }}>
          <Icon name="shield" size={32} color={G.gold}/>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:G.text, marginTop:12, marginBottom:6 }}>Acesso Administrativo Ativo</h3>
          <p style={{ fontSize:12, color:G.muted, lineHeight:1.7 }}>Você pode publicar e gerenciar conteúdo em todas as seções, incluindo o Cafeflix.</p>
        </div>
        {[
          { label:"Painel do Império", desc:"Publicar recados e avisos", tela:"painel", icon:"bell" },
          { label:"Agenda Oficial",    desc:"Adicionar e editar eventos", tela:"agenda", icon:"calendar" },
          { label:"Mapa das Credenciadas", desc:"Gerenciar perfis da rede", tela:"mapa", icon:"users" },
          { label:"Biblioteca Imperial",  desc:"Adicionar manuais e guias", tela:"biblioteca", icon:"book" },
          { label:"Cafeflix",             desc:"Gerenciar cursos e aulas", tela:"cafeflix", icon:"film" },
        ].map((item, i, arr) => (
          <button key={item.tela} onClick={()=>voltar(item.tela)}
            style={{ width:"100%", padding:"16px 20px", background:`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${G.border}`, borderRadius:12, marginBottom:8, cursor:"pointer", display:"flex", alignItems:"center", gap:14, textAlign:"left", transition:"border-color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=G.gold}
            onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>
            <Icon name={item.icon} size={16} color={G.gold}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, color:G.text, fontWeight:500 }}>{item.label}</div>
              <div style={{ fontSize:10, color:G.muted, marginTop:2 }}>{item.desc}</div>
            </div>
            <Icon name="chevRight" size={16} color={G.muted}/>
          </button>
        ))}
        <div style={{ marginTop:8 }}><Btn variant="danger" icon="logOut" onClick={()=>{onLogout();voltar();}} sx={{ width:"100%" }}>Sair do modo admin</Btn></div>
      </div>
    </div>
  );

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      <Header titulo="Acesso Admin" subtitulo="Área restrita — presidência" voltar={voltar}/>
      <div style={{ padding:"40px 20px 48px" }}>
        <div style={{ background:"linear-gradient(145deg,#141414,#0f0f0f)", border:`1px solid ${G.border}`, borderRadius:14, padding:"28px 20px" }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(201,168,76,0.1)", border:`1px solid ${G.borderGold}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
              <Icon name="lock" size={22} color={G.gold}/>
            </div>
            <p style={{ fontSize:12, color:G.muted, lineHeight:1.7 }}>Digite a senha de administradora para acessar o painel de publicações.</p>
          </div>
          <Input label="Senha" type="password" value={senha} onChange={e=>{setSenha(e.target.value);setErro(false);}} placeholder="••••••••"/>
          {erro && <p style={{ fontSize:11, color:"#c06060", marginBottom:12, marginTop:-8 }}>Senha incorreta.</p>}
          <Btn variant="gold" onClick={()=>{ if(senha===ADMIN_PASSWORD){onLogin();}else{setErro(true);} }} sx={{ width:"100%" }}>Entrar</Btn>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAINEL DO IMPÉRIO
// ─────────────────────────────────────────────────────────────
const TAG_V = { "PRESIDÊNCIA":"presidencia", "EVENTO":"evento", "REDE":"rede" };

function PainelImperio({ voltar, isAdmin, dados, setDados }) {
  const [aberto, setAberto] = useState(null);
  const [novoForm, setNovoForm] = useState(false);
  const [form, setForm] = useState({ titulo:"", tag:"PRESIDÊNCIA", texto:"", link:"", linkLabel:"" });

  const publicar = () => {
    if (!form.titulo || !form.texto) return;
    const now = new Date();
    const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    const data = `${now.getDate()} ${meses[now.getMonth()]} ${now.getFullYear()}`;
    setDados(d=>({ ...d, recados:[{ id:Date.now(), ...form, data },...d.recados] }));
    setForm({ titulo:"", tag:"PRESIDÊNCIA", texto:"", link:"", linkLabel:"" });
    setNovoForm(false);
  };

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      <Header titulo="Painel do Império" subtitulo="Avisos, recados e comunicados" voltar={voltar}
        right={isAdmin && <Btn variant="outline" icon="plus" size="sm" onClick={()=>setNovoForm(!novoForm)}>Publicar</Btn>}/>
      <div style={{ padding:"24px 20px 48px" }}>
        {isAdmin && novoForm && (
          <div className="fade-in" style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"22px 20px", marginBottom:20 }}>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:16 }}>NOVO RECADO</div>
            <Input label="Título" value={form.titulo} onChange={e=>setForm(f=>({...f,titulo:e.target.value}))} placeholder="Título do recado"/>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:9, color:G.gold, letterSpacing:2, fontWeight:700, marginBottom:6, textTransform:"uppercase" }}>Categoria</div>
              <div style={{ display:"flex", gap:8 }}>
                {["PRESIDÊNCIA","EVENTO","REDE"].map(t=>(
                  <button key={t} onClick={()=>setForm(f=>({...f,tag:t}))}
                    style={{ padding:"6px 12px", borderRadius:20, border:`1px solid ${form.tag===t?G.gold:G.border}`, background:form.tag===t?"rgba(201,168,76,0.12)":"transparent", color:form.tag===t?G.gold:G.muted, fontSize:9, fontWeight:700, letterSpacing:1, cursor:"pointer" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Input label="Texto" value={form.texto} onChange={e=>setForm(f=>({...f,texto:e.target.value}))} placeholder="Escreva o comunicado..." multiline/>
            <Input label="Link (opcional)" value={form.link} onChange={e=>setForm(f=>({...f,link:e.target.value}))} placeholder="https://..."/>
            <Input label="Rótulo do link" value={form.linkLabel} onChange={e=>setForm(f=>({...f,linkLabel:e.target.value}))} placeholder="Ex: Confirmar presença"/>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="gold" onClick={publicar} sx={{ flex:1 }}>Publicar</Btn>
              <Btn variant="ghost" onClick={()=>setNovoForm(false)} sx={{ flex:1 }}>Cancelar</Btn>
            </div>
          </div>
        )}
        {dados.recados.map((r, i) => {
          const open = aberto === r.id;
          return (
            <div key={r.id} onClick={()=>setAberto(open?null:r.id)}
              style={{ background:open?"linear-gradient(145deg,#1a1500,#130f00)":`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${open?G.borderGold:G.border}`, borderRadius:14, padding:"20px", marginBottom:12, cursor:"pointer", transition:"all 0.25s", animation:`fadeUp 0.45s ease ${i*0.08}s forwards`, opacity:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10, flexWrap:"wrap" }}>
                    <Tag variant={TAG_V[r.tag]}>{r.tag}</Tag>
                    <span style={{ fontSize:11, color:G.muted }}>{r.data}</span>
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:21, fontWeight:600, color:G.text, lineHeight:1.3 }}>{r.titulo}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {isAdmin && <button onClick={e=>{e.stopPropagation();setDados(d=>({...d,recados:d.recados.filter(x=>x.id!==r.id)}));}} style={{ background:"none", border:"none", cursor:"pointer", color:"#555", padding:4 }}><Icon name="trash" size={14} color="currentColor"/></button>}
                  <div style={{ color:G.gold, transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.25s" }}><Icon name="chevDown" size={18} color={G.gold}/></div>
                </div>
              </div>
              {!open && <p style={{ marginTop:10, fontSize:13, color:"#444", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical" }}>{r.texto}</p>}
              {open && (
                <div className="fade-in">
                  <div style={{ height:1, background:G.faint, margin:"16px 0" }}/>
                  <p style={{ color:"#c8c0b0", fontSize:15, lineHeight:1.9, fontWeight:300 }}>{r.texto}</p>
                  {r.link && <a href={r.link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:16, padding:"11px 20px", background:`linear-gradient(135deg,${G.gold},${G.goldDark})`, borderRadius:8, color:"#0a0a0a", fontSize:12, fontWeight:700, letterSpacing:1.5, textDecoration:"none", textTransform:"uppercase" }}>{r.linkLabel||"Acessar"} <Icon name="extLink" size={13} color="#0a0a0a"/></a>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AGENDA OFICIAL
// ─────────────────────────────────────────────────────────────
function AgendaOficial({ voltar, isAdmin, dados, setDados }) {
  const [sel, setSel] = useState(null);
  const [novoForm, setNovoForm] = useState(false);
  const [form, setForm] = useState({ nome:"", data:"", diaSemana:"", horario:"", local:"", descricao:"", tipo:"online", recorrencia:"" });

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      <Header titulo="Agenda Oficial" subtitulo="Compromissos do Império" voltar={voltar}
        right={isAdmin && <Btn variant="outline" icon="plus" size="sm" onClick={()=>setNovoForm(!novoForm)}>Evento</Btn>}/>
      <div style={{ padding:"24px 20px 48px" }}>
        {isAdmin && novoForm && (
          <div className="fade-in" style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"22px 20px", marginBottom:20 }}>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:16 }}>NOVO EVENTO</div>
            <Input label="Nome" value={form.nome} onChange={e=>setForm(f=>({...f,nome:e.target.value}))} placeholder="Nome do evento"/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="Data" value={form.data} onChange={e=>setForm(f=>({...f,data:e.target.value}))} placeholder="01 Jun 2026"/>
              <Input label="Dia" value={form.diaSemana} onChange={e=>setForm(f=>({...f,diaSemana:e.target.value}))} placeholder="SEG"/>
            </div>
            <Input label="Horário" value={form.horario} onChange={e=>setForm(f=>({...f,horario:e.target.value}))} placeholder="13h30 – 17h30"/>
            <Input label="Local ou link" value={form.local} onChange={e=>setForm(f=>({...f,local:e.target.value}))} placeholder="Online ou endereço"/>
            <Input label="Recorrência" value={form.recorrencia} onChange={e=>setForm(f=>({...f,recorrencia:e.target.value}))} placeholder="Ex: Toda quarta-feira"/>
            <Input label="Descrição" value={form.descricao} onChange={e=>setForm(f=>({...f,descricao:e.target.value}))} placeholder="Descrição do evento..." multiline/>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:9, color:G.gold, letterSpacing:2, fontWeight:700, marginBottom:6, textTransform:"uppercase" }}>Tipo</div>
              <div style={{ display:"flex", gap:8 }}>
                {["presencial","online"].map(t=>(
                  <button key={t} onClick={()=>setForm(f=>({...f,tipo:t}))} style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${form.tipo===t?G.gold:G.border}`, background:form.tipo===t?"rgba(201,168,76,0.12)":"transparent", color:form.tipo===t?G.gold:G.muted, fontSize:9, fontWeight:700, letterSpacing:1, cursor:"pointer", textTransform:"uppercase" }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="gold" onClick={()=>{ if(!form.nome)return; setDados(d=>({...d,agenda:[...d.agenda,{id:Date.now(),...form}]})); setForm({nome:"",data:"",diaSemana:"",horario:"",local:"",descricao:"",tipo:"online",recorrencia:""}); setNovoForm(false); }} sx={{ flex:1 }}>Adicionar</Btn>
              <Btn variant="ghost" onClick={()=>setNovoForm(false)} sx={{ flex:1 }}>Cancelar</Btn>
            </div>
          </div>
        )}
        {dados.agenda.map((ev, i) => {
          const open = sel === ev.id;
          return (
            <div key={ev.id} onClick={()=>setSel(open?null:ev.id)}
              style={{ background:open?"linear-gradient(145deg,#1a1500,#130f00)":`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${open?G.borderGold:G.border}`, borderRadius:14, marginBottom:12, overflow:"hidden", cursor:"pointer", transition:"all 0.25s", animation:`fadeUp 0.45s ease ${i*0.08}s forwards`, opacity:0 }}>
              <div style={{ height:2, background:ev.tipo==="presencial"?`linear-gradient(90deg,${G.gold},${G.goldDark})`:"transparent" }}/>
              <div style={{ padding:"18px 20px" }}>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ minWidth:52, textAlign:"center", background:open?"rgba(201,168,76,0.1)":"#181818", border:`1px solid ${open?G.borderGold:"#262626"}`, borderRadius:10, padding:"10px 6px", flexShrink:0 }}>
                    <div style={{ fontSize:9, color:G.muted, letterSpacing:2, fontWeight:700, marginBottom:4 }}>{ev.diaSemana}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:G.gold, lineHeight:1 }}>{ev.data.split(" ")[0]}</div>
                    <div style={{ fontSize:8, color:G.muted, letterSpacing:1, marginTop:3 }}>{ev.data.split(" ")[1]}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, flexWrap:"wrap" }}>
                      <Tag variant={ev.tipo}>{ev.tipo}</Tag>
                      {ev.recorrencia && <span style={{ fontSize:9, color:G.muted }}>{ev.recorrencia}</span>}
                    </div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:21, fontWeight:600, color:G.text, lineHeight:1.2, marginBottom:6 }}>{ev.nome}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, color:G.muted, fontSize:13 }}><Icon name="clock" size={14} color={G.muted}/> {ev.horario}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    {isAdmin && <button onClick={e=>{e.stopPropagation();setDados(d=>({...d,agenda:d.agenda.filter(a=>a.id!==ev.id)}));setSel(null);}} style={{ background:"none", border:"none", cursor:"pointer", color:"#555", padding:4 }}><Icon name="trash" size={14} color="currentColor"/></button>}
                    <div style={{ color:G.gold, transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.25s" }}><Icon name="chevDown" size={18} color={G.gold}/></div>
                  </div>
                </div>
                {open && (
                  <div className="fade-in">
                    <div style={{ height:1, background:G.faint, margin:"16px 0" }}/>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}><Icon name="location" size={15} color={G.muted}/><span style={{ fontSize:13, color:G.muted }}>{ev.local}</span></div>
                    {ev.descricao && <p style={{ fontSize:14, color:"#b0a898", lineHeight:1.8, fontWeight:300 }}>{ev.descricao}</p>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAPA DAS CREDENCIADAS (compacto)
// ─────────────────────────────────────────────────────────────
function MapaCredenciadas({ voltar, isAdmin, dados, setDados }) {
  const [sel, setSel] = useState(null);
  const [busca, setBusca] = useState("");
  const [novoForm, setNovoForm] = useState(false);
  const [form, setForm] = useState({ nome:"", empresa:"", segmento:"", cidade:"", instagram:"", whatsapp:"", bio:"", iniciais:"", cor:"#7a5c00" });
  const CORES = ["#7a5c00","#5a4400","#6b4f00","#4a3800","#8a6a00"];

  const filtradas = dados.credenciadas.filter(c=>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (c.segmento||"").toLowerCase().includes(busca.toLowerCase()) ||
    (c.cidade||"").toLowerCase().includes(busca.toLowerCase()) ||
    (c.empresa||"").toLowerCase().includes(busca.toLowerCase())
  );

  if (sel) {
    const c = dados.credenciadas.find(x=>x.id===sel);
    return (
      <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
        <div style={{ background:"linear-gradient(170deg,#0c0c0c,#130e00)", padding:"44px 22px 32px", borderBottom:`1px solid ${G.border}` }}>
          <button onClick={()=>setSel(null)} style={{ background:"none", border:`1px solid ${G.border}`, borderRadius:8, padding:"7px 14px", color:G.muted, fontSize:11, letterSpacing:1, cursor:"pointer", marginBottom:24, display:"flex", alignItems:"center", gap:8 }}>
            <Icon name="arrowLeft" size={14} color="currentColor"/> Mapa das Credenciadas
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:18 }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:`linear-gradient(135deg,${c.cor} 0%,#0d0800 100%)`, border:`2px solid ${G.borderGold}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:G.text, flexShrink:0 }}>{c.iniciais}</div>
            <div>
              <Tag variant="gold">CREDENCIADA</Tag>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:G.text, lineHeight:1.2, marginTop:6 }}>{c.nome}</h3>
              <p style={{ fontSize:12, color:G.gold, marginTop:2 }}>{c.empresa}</p>
            </div>
          </div>
        </div>
        <div style={{ padding:"24px 20px 48px" }}>
          <div style={{ background:"linear-gradient(145deg,#181200,#0f0b00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:20, marginBottom:14 }}>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:12 }}>SOBRE</div>
            <p style={{ color:"#c8c0b0", fontSize:14, lineHeight:1.9, fontWeight:300 }}>{c.bio}</p>
          </div>
          <div style={{ background:`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden", marginBottom:16 }}>
            {[{label:"Empresa",valor:c.empresa,icon:"briefcase"},{label:"Segmento",valor:c.segmento,icon:"tag"},{label:"Cidade",valor:c.cidade,icon:"location"},{label:"Instagram",valor:c.instagram,icon:"instagram"}].map((item,i,arr)=>(
              <div key={item.label} style={{ padding:"14px 20px", borderBottom:i<arr.length-1?`1px solid ${G.border}`:"none", display:"flex", alignItems:"center", gap:12 }}>
                <Icon name={item.icon} size={14} color={G.muted}/>
                <span style={{ fontSize:10, color:G.muted, letterSpacing:1, textTransform:"uppercase", width:72, flexShrink:0 }}>{item.label}</span>
                <span style={{ fontSize:13, color:G.text }}>{item.valor}</span>
              </div>
            ))}
          </div>
          <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:10, width:"100%", padding:"16px", background:`linear-gradient(135deg,${G.gold},${G.goldDark})`, borderRadius:12, color:"#0a0a0a", fontWeight:700, fontSize:12, letterSpacing:2, textDecoration:"none", textTransform:"uppercase", marginBottom:isAdmin?12:0 }}>
            <Icon name="whatsapp" size={16} color="#0a0a0a"/> Contato via WhatsApp
          </a>
          {isAdmin && <Btn variant="danger" icon="trash" onClick={()=>{setDados(d=>({...d,credenciadas:d.credenciadas.filter(x=>x.id!==c.id)}));setSel(null);}} sx={{ width:"100%" }}>Remover credenciada</Btn>}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      <Header titulo="Mapa das Credenciadas" subtitulo={`${dados.credenciadas.length} mulheres na rede`} voltar={voltar}
        right={isAdmin && <Btn variant="outline" icon="plus" size="sm" onClick={()=>setNovoForm(!novoForm)}>Adicionar</Btn>}/>
      <div style={{ padding:"20px 20px 48px" }}>
        {isAdmin && novoForm && (
          <div className="fade-in" style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"22px 20px", marginBottom:20 }}>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:16 }}>NOVA CREDENCIADA</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="Nome" value={form.nome} onChange={e=>setForm(f=>({...f,nome:e.target.value}))} placeholder="Nome completo"/>
              <Input label="Iniciais" value={form.iniciais} onChange={e=>setForm(f=>({...f,iniciais:e.target.value}))} placeholder="MC"/>
            </div>
            <Input label="Empresa" value={form.empresa} onChange={e=>setForm(f=>({...f,empresa:e.target.value}))} placeholder="Nome da empresa"/>
            <Input label="Segmento" value={form.segmento} onChange={e=>setForm(f=>({...f,segmento:e.target.value}))} placeholder="Ex: Marketing Digital"/>
            <Input label="Cidade" value={form.cidade} onChange={e=>setForm(f=>({...f,cidade:e.target.value}))} placeholder="Cidade, UF"/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="Instagram" value={form.instagram} onChange={e=>setForm(f=>({...f,instagram:e.target.value}))} placeholder="@usuario"/>
              <Input label="WhatsApp" value={form.whatsapp} onChange={e=>setForm(f=>({...f,whatsapp:e.target.value}))} placeholder="5511999990000"/>
            </div>
            <Input label="Mini Bio" value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} placeholder="Apresentação..." multiline/>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:9, color:G.gold, letterSpacing:2, fontWeight:700, marginBottom:8, textTransform:"uppercase" }}>Cor do avatar</div>
              <div style={{ display:"flex", gap:8 }}>
                {CORES.map(cor=><button key={cor} onClick={()=>setForm(f=>({...f,cor}))} style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${cor},#0d0800)`, border:`2px solid ${form.cor===cor?G.gold:"transparent"}`, cursor:"pointer" }}/>)}
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="gold" onClick={()=>{ if(!form.nome)return; setDados(d=>({...d,credenciadas:[...d.credenciadas,{id:Date.now(),...form}]})); setForm({nome:"",empresa:"",segmento:"",cidade:"",instagram:"",whatsapp:"",bio:"",iniciais:"",cor:"#7a5c00"}); setNovoForm(false); }} sx={{ flex:1 }}>Adicionar</Btn>
              <Btn variant="ghost" onClick={()=>setNovoForm(false)} sx={{ flex:1 }}>Cancelar</Btn>
            </div>
          </div>
        )}
        <div style={{ position:"relative", marginBottom:20 }}>
          <div style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:G.faint }}><Icon name="search" size={15} color="currentColor"/></div>
          <input type="text" placeholder="Buscar por nome, empresa, segmento ou cidade..." value={busca} onChange={e=>setBusca(e.target.value)}
            style={{ width:"100%", padding:"13px 16px 13px 40px", background:G.card, border:`1px solid ${G.border}`, borderRadius:10, color:G.text, fontSize:14, outline:"none" }}
            onFocus={e=>e.target.style.borderColor=G.borderGold} onBlur={e=>e.target.style.borderColor=G.border}/>
        </div>
        {filtradas.map((c, i) => (
          <div key={c.id} onClick={()=>setSel(c.id)}
            style={{ display:"flex", alignItems:"center", gap:14, background:`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${G.border}`, borderRadius:14, padding:"16px", marginBottom:10, cursor:"pointer", transition:"border-color 0.2s", animation:`fadeUp 0.45s ease ${i*0.06}s forwards`, opacity:0 }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=G.gold}
            onMouseLeave={e=>e.currentTarget.style.borderColor=G.border}>
            <div style={{ width:50, height:50, borderRadius:"50%", background:`linear-gradient(135deg,${c.cor},#0d0800)`, border:"1px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:G.text, flexShrink:0 }}>{c.iniciais}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:600, color:G.text, lineHeight:1.2 }}>{c.nome}</div>
              <div style={{ fontSize:13, color:G.gold, marginTop:2 }}>{c.empresa}</div>
              <div style={{ fontSize:12, color:G.muted, marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.segmento}</div>
            </div>
            <Icon name="chevRight" size={18} color={G.gold}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BIBLIOTECA IMPERIAL (compacto)
// ─────────────────────────────────────────────────────────────
const CAT_V = { "ONBOARDING":"onboarding", "RELACIONAMENTO":"relacionamento" };

function BibliotecaImperial({ voltar, isAdmin, dados, setDados }) {
  const [sel, setSel] = useState(null);
  const [secao, setSecao] = useState(0);
  const [novoForm, setNovoForm] = useState(false);
  const [form, setForm] = useState({ titulo:"", subtitulo:"", categoria:"ONBOARDING", descricao:"", secoes:[{titulo:"",conteudo:""}] });

  if (sel!==null) {
    const m = dados.manuais.find(x=>x.id===sel);
    return (
      <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
        <div style={{ background:"linear-gradient(170deg,#0c0c0c,#130e00)", padding:"44px 22px 28px", borderBottom:`1px solid ${G.border}` }}>
          <button onClick={()=>{setSel(null);setSecao(0);}} style={{ background:"none", border:`1px solid ${G.border}`, borderRadius:8, padding:"7px 14px", color:G.muted, fontSize:11, letterSpacing:1, cursor:"pointer", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
            <Icon name="arrowLeft" size={14} color="currentColor"/> Biblioteca Imperial
          </button>
          <Tag variant={CAT_V[m.categoria]||"default"}>{m.categoria}</Tag>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:G.text, lineHeight:1.2, marginTop:10, marginBottom:4 }}>{m.titulo}</h2>
          <Divider my={14}/>
          <div style={{ fontSize:10, color:G.muted }}>{m.secoes.length} seções</div>
        </div>
        <div style={{ padding:"24px 20px 48px" }}>
          <div style={{ background:`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden", marginBottom:20 }}>
            {m.secoes.map((s,i)=>(
              <div key={i} onClick={()=>setSecao(i)} style={{ padding:"12px 18px", borderBottom:i<m.secoes.length-1?`1px solid ${G.border}`:"none", display:"flex", alignItems:"center", gap:12, cursor:"pointer", background:secao===i?"rgba(201,168,76,0.06)":"transparent" }}>
                <div style={{ width:22, height:22, borderRadius:"50%", background:secao===i?"rgba(201,168,76,0.15)":"#1a1a1a", border:`1px solid ${secao===i?G.borderGold:"#2a2a2a"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:secao===i?G.gold:G.muted, flexShrink:0 }}>{i+1}</div>
                <span style={{ fontSize:12, color:secao===i?G.text:G.muted, fontWeight:secao===i?500:400, flex:1 }}>{s.titulo}</span>
              </div>
            ))}
          </div>
          {m.secoes.map((s,i)=>(
            <div key={i} style={{ display:secao===i?"block":"none", background:"linear-gradient(145deg,#181200,#100c00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"22px 20px", marginBottom:12 }}>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:G.text, lineHeight:1.3, marginBottom:14 }}>{s.titulo}</h3>
              {s.conteudo.split("\n").map((l,li)=><p key={li} style={{ color:"#c8c0b0", fontSize:15, lineHeight:1.9, fontWeight:300, marginBottom:l===""?8:0 }}>{l}</p>)}
            </div>
          ))}
          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            <Btn variant="ghost" icon="arrowLeft" onClick={()=>setSecao(Math.max(0,secao-1))} disabled={secao===0} sx={{ flex:1, justifyContent:"center" }}>Anterior</Btn>
            <Btn variant={secao===m.secoes.length-1?"ghost":"gold"} onClick={()=>setSecao(Math.min(m.secoes.length-1,secao+1))} disabled={secao===m.secoes.length-1} sx={{ flex:1, justifyContent:"center" }}>
              Próxima <Icon name="chevRight" size={13} color="currentColor"/>
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      <Header titulo="Biblioteca Imperial" subtitulo="Manuais e guias da credenciada" voltar={voltar}
        right={isAdmin && <Btn variant="outline" icon="plus" size="sm" onClick={()=>setNovoForm(!novoForm)}>Manual</Btn>}/>
      <div style={{ padding:"24px 20px 48px" }}>
        {isAdmin && novoForm && (
          <div className="fade-in" style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"22px 20px", marginBottom:20 }}>
            <div style={{ fontSize:9, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:16 }}>NOVO MANUAL</div>
            <Input label="Título" value={form.titulo} onChange={e=>setForm(f=>({...f,titulo:e.target.value}))} placeholder="Nome do manual"/>
            <Input label="Subtítulo" value={form.subtitulo} onChange={e=>setForm(f=>({...f,subtitulo:e.target.value}))} placeholder="Subtítulo"/>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:9, color:G.gold, letterSpacing:2, fontWeight:700, marginBottom:6, textTransform:"uppercase" }}>Categoria</div>
              <div style={{ display:"flex", gap:8 }}>
                {["ONBOARDING","RELACIONAMENTO"].map(t=><button key={t} onClick={()=>setForm(f=>({...f,categoria:t}))} style={{ padding:"6px 12px", borderRadius:20, border:`1px solid ${form.categoria===t?G.gold:G.border}`, background:form.categoria===t?"rgba(201,168,76,0.12)":"transparent", color:form.categoria===t?G.gold:G.muted, fontSize:9, fontWeight:700, letterSpacing:1, cursor:"pointer" }}>{t}</button>)}
              </div>
            </div>
            <Input label="Descrição" value={form.descricao} onChange={e=>setForm(f=>({...f,descricao:e.target.value}))} placeholder="Descrição do manual..." multiline/>
            {form.secoes.map((s,i)=>(
              <div key={i} style={{ background:"rgba(0,0,0,0.3)", border:`1px solid ${G.faint}`, borderRadius:10, padding:"14px", marginBottom:10 }}>
                <div style={{ fontSize:9, color:G.muted, marginBottom:8 }}>SEÇÃO {i+1}</div>
                <Input value={s.titulo} onChange={e=>{ const ss=[...form.secoes]; ss[i]={...ss[i],titulo:e.target.value}; setForm(f=>({...f,secoes:ss})); }} placeholder="Título da seção"/>
                <Input value={s.conteudo} onChange={e=>{ const ss=[...form.secoes]; ss[i]={...ss[i],conteudo:e.target.value}; setForm(f=>({...f,secoes:ss})); }} placeholder="Conteúdo..." multiline/>
              </div>
            ))}
            <Btn variant="ghost" icon="plus" size="sm" onClick={()=>setForm(f=>({...f,secoes:[...f.secoes,{titulo:"",conteudo:""}]}))} sx={{ marginBottom:14 }}>Adicionar seção</Btn>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="gold" onClick={()=>{ if(!form.titulo)return; setDados(d=>({...d,manuais:[...d.manuais,{id:Date.now(),...form}]})); setForm({titulo:"",subtitulo:"",categoria:"ONBOARDING",descricao:"",secoes:[{titulo:"",conteudo:""}]}); setNovoForm(false); }} sx={{ flex:1 }}>Publicar</Btn>
              <Btn variant="ghost" onClick={()=>setNovoForm(false)} sx={{ flex:1 }}>Cancelar</Btn>
            </div>
          </div>
        )}
        {dados.manuais.map((m,i)=>(
          <div key={m.id} onClick={()=>setSel(m.id)}
            style={{ background:`linear-gradient(145deg,${G.card},#0e0e0e)`, border:`1px solid ${G.border}`, borderRadius:14, padding:"22px 20px", marginBottom:12, cursor:"pointer", transition:"all 0.2s", animation:`fadeUp 0.45s ease ${i*0.1}s forwards`, opacity:0 }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=G.gold;e.currentTarget.style.background="linear-gradient(145deg,#1a1500,#110e00)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=G.border;e.currentTarget.style.background=`linear-gradient(145deg,${G.card},#0e0e0e)`;}}
          >
            <div style={{ display:"flex", alignItems:"flex-start", gap:16 }}>
              <div style={{ width:52, height:62, borderRadius:8, background:"linear-gradient(160deg,#1e1500,#100c00)", border:`1px solid ${G.borderGold}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0, gap:4 }}>
                <Icon name="fileText" size={20} color={G.gold}/>
                <div style={{ fontSize:7, color:G.goldDark, letterSpacing:1, fontWeight:700 }}>MANUAL</div>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ marginBottom:8 }}><Tag variant={CAT_V[m.categoria]||"default"}>{m.categoria}</Tag></div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:21, fontWeight:700, color:G.text, lineHeight:1.2, marginBottom:4 }}>{m.titulo}</div>
                <div style={{ fontSize:13, color:G.muted, marginBottom:8 }}>{m.subtitulo}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:10, color:G.muted }}><Icon name="fileText" size={11} color="currentColor"/>{m.secoes.length} seções</div>
                  {isAdmin && <button onClick={e=>{e.stopPropagation();setDados(d=>({...d,manuais:d.manuais.filter(x=>x.id!==m.id)}));}} style={{ background:"none", border:"none", cursor:"pointer", color:"#555", padding:4 }}><Icon name="trash" size={14} color="currentColor"/></button>}
                </div>
              </div>
              <Icon name="chevRight" size={18} color={G.gold}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONVITE CAFÉ ESTRATÉGICO
// ─────────────────────────────────────────────────────────────
function TelaConvites({ voltar, isAdmin, dados, setDados }) {
  const [novoForm, setNovoForm] = useState(false);
  const [form, setForm] = useState({ cidade:"", estado:"SP", descricao:"", data:"", horario:"", link:"", vagas:"", cor:"#7a5c00" });
  const CORES = ["#7a5c00","#5a4400","#6b4f00","#4a3800","#8a6a00"];

  const adicionar = () => {
    if (!form.cidade || !form.link) return;
    setDados(d=>({ ...d, convites:[...d.convites, { id:Date.now(), ...form }] }));
    setForm({ cidade:"", estado:"SP", descricao:"", data:"", horario:"", link:"", vagas:"", cor:"#7a5c00" });
    setNovoForm(false);
  };

  const excluir = (id) => setDados(d=>({ ...d, convites:d.convites.filter(c=>c.id!==id) }));

  return (
    <div className="fade-in" style={{ minHeight:"100vh", background:G.bg }}>
      <Header
        titulo="Convite Café Estratégico"
        subtitulo="Garanta sua vaga — escolha sua cidade"
        voltar={voltar}
        right={isAdmin && <Btn variant="outline" icon="plus" size="sm" onClick={()=>setNovoForm(!novoForm)}>Cidade</Btn>}
      />

      <div style={{ padding:"24px 20px 48px" }}>

        {/* Chamada */}
        <div style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"20px 22px", marginBottom:24 }}>
          <div style={{ fontSize:10, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:8 }}>SOBRE O EVENTO</div>
          <p style={{ fontSize:14, color:"#c8c0b0", lineHeight:1.85, fontWeight:300 }}>
            O Café Estratégico é o encontro presencial mensal do Império Café com Mães. Networking estruturado, rodada de negócios e desenvolvimento empresarial — tudo em um único encontro de alto nível.
          </p>
          <Divider my={14}/>
          <div style={{ display:"flex", gap:24 }}>
            <div>
              <div style={{ fontSize:10, color:G.muted, letterSpacing:1, marginBottom:3 }}>RECORRÊNCIA</div>
              <div style={{ fontSize:13, color:G.text, fontWeight:500 }}>Toda 1ª segunda-feira</div>
            </div>
            <div>
              <div style={{ fontSize:10, color:G.muted, letterSpacing:1, marginBottom:3 }}>HORÁRIO</div>
              <div style={{ fontSize:13, color:G.text, fontWeight:500 }}>13h30 – 17h30</div>
            </div>
          </div>
        </div>

        {/* Formulário nova cidade (admin) */}
        {isAdmin && novoForm && (
          <div className="fade-in" style={{ background:"linear-gradient(145deg,#1a1500,#120e00)", border:`1px solid ${G.borderGold}`, borderRadius:14, padding:"22px 20px", marginBottom:20 }}>
            <div style={{ fontSize:10, color:G.gold, letterSpacing:3, fontWeight:700, marginBottom:16 }}>NOVA CIDADE</div>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:10 }}>
              <Input label="Cidade" value={form.cidade} onChange={e=>setForm(f=>({...f,cidade:e.target.value}))} placeholder="Ex: Sorocaba"/>
              <Input label="Estado" value={form.estado} onChange={e=>setForm(f=>({...f,estado:e.target.value}))} placeholder="SP"/>
            </div>
            <Input label="Descrição" value={form.descricao} onChange={e=>setForm(f=>({...f,descricao:e.target.value}))} placeholder="Breve descrição do encontro..." multiline/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Input label="Data / Recorrência" value={form.data} onChange={e=>setForm(f=>({...f,data:e.target.value}))} placeholder="Toda 1ª segunda-feira"/>
              <Input label="Horário" value={form.horario} onChange={e=>setForm(f=>({...f,horario:e.target.value}))} placeholder="13h30 – 17h30"/>
            </div>
            <Input label="Link de pagamento" value={form.link} onChange={e=>setForm(f=>({...f,link:e.target.value}))} placeholder="https://..."/>
            <Input label="Info de vagas (opcional)" value={form.vagas} onChange={e=>setForm(f=>({...f,vagas:e.target.value}))} placeholder="Ex: Vagas limitadas"/>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10, color:G.gold, letterSpacing:2, fontWeight:700, marginBottom:8, textTransform:"uppercase" }}>Cor</div>
              <div style={{ display:"flex", gap:8 }}>
                {CORES.map(cor=>(
                  <button key={cor} onClick={()=>setForm(f=>({...f,cor}))}
                    style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${cor},#050300)`, border:`2px solid ${form.cor===cor?G.gold:"transparent"}`, cursor:"pointer" }}/>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn variant="gold" onClick={adicionar} sx={{ flex:1 }}>Adicionar</Btn>
              <Btn variant="ghost" onClick={()=>setNovoForm(false)} sx={{ flex:1 }}>Cancelar</Btn>
            </div>
          </div>
        )}

        {/* Cards das cidades */}
        {dados.convites.map((c, i) => (
          <div key={c.id}
            style={{
              background:`linear-gradient(145deg,${G.card},#0e0e0e)`,
              border:`1px solid ${G.border}`,
              borderRadius:16, overflow:"hidden", marginBottom:16,
              animation:`fadeUp 0.45s ease ${i*0.1}s forwards`, opacity:0,
            }}
          >
            {/* Banner cidade */}
            <div style={{
              background:`linear-gradient(135deg,${c.cor} 0%,#080500 100%)`,
              padding:"24px 22px 20px",
              position:"relative", overflow:"hidden",
            }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse at right,rgba(201,168,76,0.08),transparent)", pointerEvents:"none" }}/>
              <div style={{ fontSize:10, color:"rgba(201,168,76,0.6)", letterSpacing:3, fontWeight:700, marginBottom:6 }}>
                CAFÉ ESTRATÉGICO
              </div>
              <h3 style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:32, fontWeight:700, color:G.text, lineHeight:1,
              }}>
                {c.cidade}
              </h3>
              <div style={{ fontSize:13, color:"rgba(240,235,224,0.5)", marginTop:4, letterSpacing:1 }}>
                {c.estado}
              </div>
            </div>

            {/* Detalhes */}
            <div style={{ padding:"18px 22px" }}>
              <p style={{ fontSize:13.5, color:G.muted, lineHeight:1.8, fontWeight:300, marginBottom:16 }}>
                {c.descricao}
              </p>

              <div style={{ display:"flex", gap:16, marginBottom:18 }}>
                {c.data && (
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <Icon name="calendar" size={14} color={G.gold}/>
                    <span style={{ fontSize:12, color:G.muted }}>{c.data}</span>
                  </div>
                )}
                {c.horario && (
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <Icon name="clock" size={14} color={G.gold}/>
                    <span style={{ fontSize:12, color:G.muted }}>{c.horario}</span>
                  </div>
                )}
              </div>

              {c.vagas && (
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 12px", background:"rgba(201,168,76,0.08)", border:`1px solid ${G.borderGold}`, borderRadius:20, marginBottom:18 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:G.gold }}/>
                  <span style={{ fontSize:11, color:G.gold, fontWeight:600, letterSpacing:0.5 }}>{c.vagas}</span>
                </div>
              )}

              {/* CTA */}
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display:"flex", justifyContent:"center", alignItems:"center", gap:10,
                  width:"100%", padding:"16px",
                  background:`linear-gradient(135deg,${G.gold},${G.goldDark})`,
                  borderRadius:12, color:"#0a0a0a",
                  fontWeight:700, fontSize:13, letterSpacing:2,
                  textDecoration:"none", textTransform:"uppercase",
                  marginBottom: isAdmin ? 12 : 0,
                }}
              >
                <Icon name="ticket" size={16} color="#0a0a0a"/>
                Garantir minha vaga em {c.cidade}
              </a>

              {isAdmin && (
                <Btn variant="danger" icon="trash" onClick={()=>excluir(c.id)} sx={{ width:"100%" }}>
                  Remover cidade
                </Btn>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [tela, setTela] = useState("inicio");
  const [isAdmin, setIsAdmin] = useState(false);
  const [dados, setDados] = useState(DADOS_INICIAIS);

  const ir = (t) => setTela(t);
  const voltar = (t) => setTela(t || "inicio");

  return (
    <>
      <style>{CSS}</style>
      <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:G.bg, boxShadow:"0 0 80px rgba(0,0,0,0.95)" }}>
        {tela==="inicio"     && <TelaInicial ir={ir} isAdmin={isAdmin}/>}
        {tela==="admin"      && <TelaAdminLogin onLogin={()=>setIsAdmin(true)} onLogout={()=>setIsAdmin(false)} isAdmin={isAdmin} voltar={voltar}/>}
        {tela==="painel"     && <PainelImperio voltar={voltar} isAdmin={isAdmin} dados={dados} setDados={setDados}/>}
        {tela==="agenda"     && <AgendaOficial voltar={voltar} isAdmin={isAdmin} dados={dados} setDados={setDados}/>}
        {tela==="mapa"       && <MapaCredenciadas voltar={voltar} isAdmin={isAdmin} dados={dados} setDados={setDados}/>}
        {tela==="biblioteca" && <BibliotecaImperial voltar={voltar} isAdmin={isAdmin} dados={dados} setDados={setDados}/>}
        {tela==="convites"   && <TelaConvites voltar={voltar} isAdmin={isAdmin} dados={dados} setDados={setDados}/>}
        {tela==="cafeflix"   && <TelaCafeflix voltar={voltar} isAdmin={isAdmin} dados={dados} setDados={setDados}/>}
      </div>
    </>
  );
}
