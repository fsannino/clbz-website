import Layout from "@/components/layout/Layout";
import { useSeo } from "@/lib/seo";
import { CONTACT } from "@shared/const";
import { Link } from "wouter";

export default function Privacidade() {
  useSeo({
    title: "Política de Privacidade",
    description:
      "Como a collab:Z coleta, usa e protege seus dados pessoais — alinhada à LGPD.",
    path: "/privacidade",
  });

  return (
    <Layout>
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6 prose prose-navy">
          <h1 className="text-4xl font-serif text-navy mb-2">
            Política de Privacidade
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Última atualização: 18 de abril de 2026
          </p>

          <p>
            A <strong>collab:Z</strong> ("nós") respeita a sua privacidade e
            está comprometida com a proteção dos seus dados pessoais. Esta
            política explica quais dados tratamos, para quais finalidades, com
            quem compartilhamos e quais são os seus direitos, em conformidade
            com a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).
          </p>

          <h2>1. Quem é o controlador</h2>
          <p>
            Collaborazione Assessoria (collab:Z) é a controladora dos dados
            pessoais tratados neste site. Contato do encarregado:{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>

          <h2>2. Dados que coletamos</h2>
          <ul>
            <li>
              <strong>Cadastro na Área do Cliente</strong>: nome, e-mail,
              empresa e senha (armazenada com hash no Supabase Auth).
            </li>
            <li>
              <strong>Formulários de contato e newsletter</strong>: nome,
              e-mail, telefone (opcional), empresa (opcional) e a mensagem que
              você envia.
            </li>
            <li>
              <strong>Histórico de acesso</strong>: registros de login,
              downloads de materiais e alterações administrativas, com data,
              endereço IP e user-agent.
            </li>
            <li>
              <strong>Dados técnicos</strong>: cookies de sessão necessários
              para manter você autenticado; estatísticas agregadas e sem
              cookies via Plausible Analytics, quando habilitado.
            </li>
          </ul>

          <h2>3. Finalidades</h2>
          <ul>
            <li>Fornecer e proteger o acesso à Área do Cliente.</li>
            <li>Responder a solicitações de contato e propostas comerciais.</li>
            <li>Disponibilizar materiais, metodologias e ferramentas.</li>
            <li>
              Atender a obrigações legais, regulatórias e de segurança
              (incluindo registros de auditoria).
            </li>
          </ul>

          <h2>4. Bases legais</h2>
          <p>
            Tratamos seus dados com base em: execução de contrato (fornecimento
            do serviço que você solicitou), consentimento (quando você se
            cadastra), legítimo interesse (segurança do serviço e prevenção a
            fraude) e cumprimento de obrigação legal, conforme o caso.
          </p>

          <h2>5. Com quem compartilhamos</h2>
          <p>
            Não vendemos seus dados. Utilizamos os seguintes processadores para
            operar o serviço:
          </p>
          <ul>
            <li>
              <strong>Supabase</strong> (autenticação, banco de dados e
              armazenamento de arquivos privados).
            </li>
            <li>
              <strong>Vercel</strong> (hospedagem e entrega do site).
            </li>
            <li>
              <strong>Resend</strong> (envio de e-mails transacionais e
              notificações ao administrador).
            </li>
            <li>
              <strong>Plausible Analytics</strong> (estatísticas agregadas sem
              cookies, quando habilitado).
            </li>
          </ul>
          <p>
            Esses parceiros atuam em nosso nome, sob contrato e apenas para as
            finalidades aqui descritas.
          </p>

          <h2>6. Retenção</h2>
          <p>
            Mantemos seus dados enquanto sua conta existir ou enquanto forem
            necessários para as finalidades acima. Logs de auditoria são
            mantidos por até 12 meses para fins de segurança. Ao excluir sua
            conta, seus dados pessoais são removidos do nosso sistema e do
            Supabase Auth; cópias de segurança são rotacionadas em até 30 dias.
          </p>

          <h2>7. Seus direitos</h2>
          <p>Nos termos da LGPD, você pode:</p>
          <ul>
            <li>Confirmar a existência e acessar seus dados;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>
              Solicitar exclusão dos dados pessoais tratados com base em
              consentimento;
            </li>
            <li>Obter portabilidade em formato legível (JSON);</li>
            <li>Revogar o consentimento a qualquer momento.</li>
          </ul>
          <p>
            Você pode exercer os direitos de acesso e exclusão diretamente pelo{" "}
            <Link href="/portal" className="text-navy underline">
              Portal do Cliente
            </Link>{" "}
            (seção "Seus dados"), ou escrevendo para{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>

          <h2>8. Segurança</h2>
          <p>
            Usamos TLS em toda a comunicação, senhas com hash, URLs assinadas de
            curta duração (5 minutos) para download de materiais, chave de
            serviço em variáveis de ambiente no servidor, e registros de
            auditoria. Apesar dos nossos esforços, nenhum sistema é 100%
            imune; em caso de incidente de segurança com risco a você,
            notificaremos conforme previsto em lei.
          </p>

          <h2>9. Cookies</h2>
          <p>
            Utilizamos apenas cookies estritamente necessários para manter a
            sessão de login. Não utilizamos cookies de marketing. Se o
            Plausible Analytics estiver habilitado, ele funciona sem cookies.
          </p>

          <h2>10. Alterações</h2>
          <p>
            Esta política pode ser atualizada. Mudanças substanciais serão
            comunicadas por e-mail aos usuários cadastrados na Área do Cliente.
          </p>

          <h2>11. Contato</h2>
          <p>
            Em caso de dúvidas ou para exercer seus direitos, escreva para{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </div>
      </article>
    </Layout>
  );
}
