import Layout from "../components/Layout"

export default function TermosDeUso() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-serif text-burgundy-900 mb-6">Termos de Uso</h1>
        <div className="prose">
          <p>
            Bem-vindo ao Cadastro Regional de Presbíteros. Ao utilizar este site, você concorda com os seguintes termos
            e condições:
          </p>
          <h2>1. Uso do Site</h2>
          <p>
            Este site destina-se ao uso exclusivo de membros do clero da Igreja Católica Apostólica Romana para fins de
            registro e consulta de informações profissionais.
          </p>
          <h2>2. Registro e Conta</h2>
          <p>
            Ao se registrar, você concorda em fornecer informações verdadeiras, precisas e completas. Você é responsável
            por manter a confidencialidade de sua conta e senha.
          </p>
          <h2>3. Conteúdo</h2>
          <p>
            Você é responsável por todo o conteúdo que publica no site. Não é permitido publicar conteúdo difamatório,
            obsceno, ou que viole direitos de terceiros.
          </p>
          <h2>4. Privacidade</h2>
          <p>
            Suas informações pessoais serão tratadas de acordo com nossa Política de Privacidade, em conformidade com a
            Lei Geral de Proteção de Dados (LGPD) do Brasil.
          </p>
          <h2>5. Modificações</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
            imediatamente após sua publicação no site.
          </p>
          <h2>6. Limitação de Responsabilidade</h2>
          <p>
            Não nos responsabilizamos por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes
            do uso ou incapacidade de usar este site.
          </p>
          <h2>7. Lei Aplicável</h2>
          <p>Estes termos são regidos pelas leis do Brasil.</p>
        </div>
      </div>
    </Layout>
  )
}

