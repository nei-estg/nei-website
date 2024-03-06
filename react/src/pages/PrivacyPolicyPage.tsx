import { Container, ThemeProvider, Typography, createTheme } from '@mui/material';

const defaultTheme = createTheme();


const PrivacyPolicyPage = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginTop: '30px' , marginBottom: '60px' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom align="center"
          sx={{
            color: "#1E2022",
            display: "flex",
            fontWeight: 700,
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}>
            Política de Privacidade
          </Typography>

          <Typography variant="body1" paragraph align="left">
            A presente Política de Privacidade descreve como o NEI - ESTG ("nós", "nos" ou "nosso") recolhe, utiliza e protege as suas informações quando utiliza o nosso site NEI - ESTG (o "Serviço").
          </Typography>
          <Typography variant="body1" paragraph align="left">
          Temos o compromisso de proteger sua privacidade. Por favor, leia esta Política de Privacidade com atenção para entender como coletamos, usamos e protegemos as informações que você nos fornece.
          </Typography>

          <br></br>

          <Typography variant="h5" gutterBottom align="left">
          Informações que recolhémos
          </Typography>
          <Typography variant="body1" paragraph align="left">
          Não recolhémos nenhuma informação pessoalmente identificável sobre você quando você visita nosso site, a menos que você decida fornecê-la voluntariamente. Qualquer informação que você fornecer será usada exclusivamente para o propósito para o qual você a forneceu.
          </Typography>

          <br></br>

          <Typography variant="h5" gutterBottom align="left">
          Recolha e uso de dados
          </Typography>
          <Typography variant="body1" paragraph align="left">
          Podemos recolher certas informações automaticamente quando você visita nosso site, como o endereço do Protocolo de Internet ("IP") do seu computador, tipo de navegador, versão do navegador, as páginas do nosso site que você visita, a hora e a data da sua visita, a hora gasto nessas páginas e outras estatísticas. No entanto, não vinculamos essas informações a nenhuma informação de identificação pessoal.
          </Typography>

          <br></br>

          <Typography variant="h5" gutterBottom align="left">
            Armazenamento de dados
          </Typography>
          <Typography variant="body1" paragraph align="left">
            Podemos usar o LocalStorage para armazenar dados importantes localmente no seu browser. Estes dados são utilizados apenas para fins internos e não são partilhados com terceiros.
          </Typography>

          <br></br>

          <Typography variant="h5" gutterBottom align="left">
            Cookies
          </Typography>
          <Typography variant="body1" paragraph align="left">
            Não utilizamos cookies ou tecnologias de rastreamento semelhantes em nosso site.
          </Typography>

          <br></br>

          <Typography variant="h5" gutterBottom align="left">
          Links de terceiros
          </Typography>
          <Typography variant="body1" paragraph align="left">
          Nosso site pode conter links para sites de terceiros que não são operados por nós. Esteja ciente de que não temos controlo sobre o conteúdo e as práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
          </Typography>

          <br></br>

          <Typography variant="h5" gutterBottom align="left">
          Alterações nesta Política de Privacidade
          </Typography>
          <Typography variant="body1" paragraph align="left">
          Reservamo-nos o direito de atualizar ou alterar a nossa Política de Privacidade a qualquer momento. Seu uso continuado do Serviço após publicarmos quaisquer modificações na Política de Privacidade nesta página constituirá seu reconhecimento das modificações e seu consentimento para cumprir e estar vinculado à Política de Privacidade modificada.
          </Typography>

          <br></br>

          <Typography variant="h5" gutterBottom align="left">
            Contate-nos
          </Typography>
          <Typography variant="body1" paragraph align="left">
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em <a href="mailto:nei@estg.ipp.pt">nei@estg.ipp.pt</a>.
          </Typography>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default PrivacyPolicyPage;
