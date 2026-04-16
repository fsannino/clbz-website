import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const trainings = [
  { badge: "collab:Z", cls: "badge-collabz", title: "Agile Change", desc: "Gestão de mudanças em ambientes ágeis. Para change managers e agilistas que precisam unir as duas disciplinas." },
  { badge: "collab:Z", cls: "badge-collabz", title: "Agile PMO", desc: "Escritório de projetos ágil. Governança adaptativa, métricas de valor e gestão de portfólio em alta incerteza." },
  { badge: "collab:Z", cls: "badge-collabz", title: "Liderando a Transformação 5.0", desc: "Liderança na convergência entre tecnologia, sustentabilidade e humanização." },
  { badge: "collab:Z", cls: "badge-collabz", title: "Consulting Foundations", desc: "Fundamentos de consultoria: diagnóstico, frameworks, comunicação executiva e entrega de valor." },
  { badge: "collab:Z", cls: "badge-collabz", title: "System Dynamics for Management", desc: "Modelagem de sistemas: loops de feedback, alavancas e consequências em sistemas organizacionais." },
];

const scrumCerts = [
  { title: "Scrum Fundamentals (SFC™)", desc: "Certificação introdutória em Scrum." },
  { title: "Scrum Master (SMC™)", desc: "Formação completa de Scrum Master." },
  { title: "Product Owner (SPOC™)", desc: "Gestão de backlog e priorização de valor." },
  { title: "Developer (SDC™)", desc: "Práticas técnicas em times Scrum." },
];

const calendar = [
  { prog: "Certificação LaMarsh CMP", fmt: "Presencial / Virtual", dur: "3 dias" },
  { prog: "Agile Change", fmt: "Virtual ao vivo", dur: "16h" },
  { prog: "Agile PMO", fmt: "Virtual ao vivo", dur: "16h" },
  { prog: "Transformação 5.0", fmt: "Presencial / Virtual", dur: "8h" },
  { prog: "Scrum Master SMC™", fmt: "Virtual ao vivo", dur: "16h" },
  { prog: "Consulting Foundations", fmt: "Virtual ao vivo", dur: "12h" },
  { prog: "System Dynamics", fmt: "Virtual ao vivo", dur: "12h" },
];

export default function Educacao() {
  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Educação</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Educação & Certificações</h1>
          <p className="text-lg text-white/60 max-w-xl">Certificações internacionais e treinamentos proprietários para líderes de transformação.</p>
        </div>
      </div>

      {/* LaMarsh CMP */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <p className="section-tag">LaMarsh Global · Certificação Internacional</p>
              <h2 className="section-title text-2xl md:text-3xl">Certified Managed Change Professional (CMP)</h2>
              <p className="text-gray-medium mb-5">Formação em gestão de mudanças com a metodologia Managed Change™. Workshop interativo com aplicação prática.</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-medium">
                <li className="flex gap-2">✓ Alinhado com ACMP</li>
                <li className="flex gap-2">✓ Aplicação hands-on do Managed Change™</li>
                <li className="flex gap-2">✓ Único programa certificador no Brasil e LATAM</li>
              </ul>
              <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-md text-sm">Inscreva-se na próxima turma <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            </div>
            <div className="bg-muted rounded-xl p-8">
              <p className="font-bold text-navy mb-5">Também disponível:</p>
              <div className="bg-white rounded-lg p-5 border border-border mb-3">
                <strong className="text-navy">Masters of Managed Change™</strong>
                <p className="text-xs text-gray-medium mt-1">Certificação avançada. Coaching de Sponsors e técnicas avançadas de influência.</p>
                <span className="text-[11px] font-semibold text-teal">Pré-requisito: CMP ou certificação equivalente</span>
              </div>
              <div className="bg-white rounded-lg p-5 border border-border">
                <strong className="text-navy">Executive Change Leadership</strong>
                <p className="text-xs text-gray-medium mt-1">Programa customizável para executivos. In-Company ou Virtual.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* collab:Z Trainings */}
      <section className="py-20 bg-cream">
        <div className="container">
          <p className="section-tag">Treinamentos collab:Z</p>
          <h2 className="section-title">Programas proprietários</h2>
          <p className="section-subtitle">Desenvolvidos pela collab:Z para formar profissionais completos.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trainings.map((t) => (
              <div key={t.title} className="bg-white rounded-lg p-6 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
                <span className={`${t.cls} inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 w-fit`}>{t.badge}</span>
                <h3 className="text-[15px] font-bold text-navy mb-2">{t.title}</h3>
                <p className="text-xs text-gray-medium flex-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ScrumStudy */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">ScrumStudy · Authorized Training Partner</p>
          <h2 className="section-title">Certificações Ágeis</h2>
          <p className="section-subtitle">Portfólio completo de certificações ágeis reconhecidas internacionalmente.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {scrumCerts.map((c) => (
              <div key={c.title} className="bg-white rounded-lg p-6 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="badge-scrumstudy inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3">ScrumStudy</span>
                <h3 className="text-[15px] font-bold text-navy mb-1.5">{c.title}</h3>
                <p className="text-xs text-gray-medium">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops In-Company */}
      <section className="py-20 bg-muted">
        <div className="container">
          <p className="section-tag">In-Company</p>
          <h2 className="section-title">Workshops personalizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Change Fundamentals", desc: "Introdução à gestão de mudanças para equipes e lideranças." },
              { title: "Liderança para Mudança", desc: "Como liderar equipes em tempos de incerteza e transformação." },
              { title: "Comunicação na Mudança", desc: "Estratégias de comunicação eficaz para engajar stakeholders." },
            ].map((w) => (
              <div key={w.title} className="bg-white rounded-lg p-7 border border-border">
                <h3 className="font-display text-lg text-navy mb-2">{w.title}</h3>
                <p className="text-sm text-gray-medium">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Agenda</p>
          <h2 className="section-title">Calendário de Turmas</h2>
          <div className="overflow-x-auto rounded-lg shadow-sm mt-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">Programa</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">Formato</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">Duração</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">Próxima turma</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {calendar.map((r, i) => (
                  <tr key={r.prog} className={i % 2 === 0 ? "bg-white" : "bg-muted"}>
                    <td className="p-4 font-semibold text-navy">{r.prog}</td>
                    <td className="p-4 text-gray-medium">{r.fmt}</td>
                    <td className="p-4 text-gray-medium">{r.dur}</td>
                    <td className="p-4 text-gray-medium">A definir — 2026</td>
                    <td className="p-4"><Link href="/contato" className="text-teal font-semibold text-xs hover:underline cursor-pointer">Inscrever-se →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="rounded-xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
            <h2 className="font-display text-3xl mb-3 relative z-10">Invista no desenvolvimento da sua equipe</h2>
            <p className="text-white/65 mb-6 relative z-10">Solicite um programa in-company ou inscreva-se nas próximas turmas abertas.</p>
            <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md relative z-10">Falar com a equipe <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
