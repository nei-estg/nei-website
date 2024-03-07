import { Container, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useEffect } from 'react';

const defaultTheme = createTheme();


const PrivacyPolicyPage = () => {

  useEffect(() => {
    document.title = "Política de Privacidade - NEI";
  })

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

      <Typography variant="body1" paragraph align="center">
        A presente Política de Privacidade descreve como o NEI - ESTG ("nós", "nos" ou "nosso") recolhe, utiliza e protege as suas informações quando utiliza o nosso site NEI - ESTG (o "Serviço").
      </Typography>
      <Typography variant="body1" paragraph align="center">
      Temos o compromisso de proteger a sua privacidade. Por favor, leia esta Política de Privacidade com atenção para entender como recolhemos, usamos e protegemos as informações que nos fornece.
      </Typography>

      <br></br>

      <Typography variant="h5" gutterBottom align="center">
      Informações que recolhemos
      </Typography>
      <Typography variant="body1" paragraph align="center">
      Não recolhemos nenhuma informação pessoalmente identificável sobre si quando visita o nosso site, a menos que decida fornecê-la voluntariamente. Qualquer informação que forneça será usada exclusivamente para o propósito para o qual a forneceu.
      </Typography>

      <br></br>

      <Typography variant="h5" gutterBottom align="center">
      Recolha e uso de dados
      </Typography>
      <Typography variant="body1" paragraph align="center">
      Podemos recolher certas informações automaticamente quando visita o nosso site, como o endereço de Protocolo de Internet ("IP") do seu computador, tipo de navegador, versão do navegador, as páginas do nosso site que visita, a hora e a data da sua visita, o tempo gasto nessas páginas e outras estatísticas. No entanto, não associamos estas informações a qualquer informação de identificação pessoal.
      </Typography>

      <br></br>

      <Typography variant="h5" gutterBottom align="center">
        Armazenamento de dados
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Podemos utilizar o LocalStorage para armazenar dados importantes localmente no seu navegador. Estes dados são utilizados apenas para fins internos e não são partilhados com terceiros.
      </Typography>

      <br></br>

      <Typography variant="h5" gutterBottom align="center">
        Cookies
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Não utilizamos cookies ou tecnologias de rastreamento semelhantes no nosso site.
      </Typography>

      <br></br>

      <Typography variant="h5" gutterBottom align="center">
      Links de terceiros
      </Typography>
      <Typography variant="body1" paragraph align="center">
      O nosso site pode conter links para sites de terceiros que não são operados por nós. Esteja ciente de que não temos controlo sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade pelas suas respectivas políticas de privacidade.
      </Typography>

      <br></br>

      <Typography variant="h5" gutterBottom align="center">
      Alterações nesta Política de Privacidade
      </Typography>
      <Typography variant="body1" paragraph align="center">
      Reservamo-nos o direito de atualizar ou alterar a nossa Política de Privacidade a qualquer momento. O seu uso contínuo do Serviço após a publicação de quaisquer modificações na Política de Privacidade nesta página constituirá o seu reconhecimento das modificações e o seu consentimento para cumprir e ficar vinculado à Política de Privacidade modificada.
      </Typography>

      <br></br>

      <Typography variant="h5" gutterBottom align="center">
        Contacte-nos
      </Typography>
      <Typography variant="body1" paragraph align="center">
      Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contacto connosco em <a href="mailto:nei@estg.ipp.pt">nei@estg.ipp.pt</a>.
      </Typography>
    </div>
  </Container>
</ThemeProvider>

  );
}

export default PrivacyPolicyPage;