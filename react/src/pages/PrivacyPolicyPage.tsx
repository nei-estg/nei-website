import { Typography } from '@mui/material';

const PrivacyPolicyPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom align="center">
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph align="left">
        This Privacy Policy describes how NEI - ESTG ("we", "us", or "our") collects, uses, and protects your information when you use our website NEI - ESTG (the "Service").
      </Typography>
      <Typography variant="body1" paragraph align="left">
        We are committed to protecting your privacy. Please read this Privacy Policy carefully to understand how we collect, use, and safeguard the information you provide to us.
      </Typography>
      <Typography variant="h5" gutterBottom align="left">
        Information We Collect
      </Typography>
      <Typography variant="body1" paragraph align="left">
        We do not collect any personally identifiable information about you when you visit our website unless you choose to provide it to us voluntarily. Any information you provide will be used solely for the purpose for which you have provided it.
      </Typography>
      <Typography variant="h5" gutterBottom align="left">
        Data Collection and Use
      </Typography>
      <Typography variant="body1" paragraph align="left">
        We may collect certain information automatically when you visit our website, such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent on those pages, and other statistics. However, we do not link this information to any personally identifiable information.
      </Typography>
      <Typography variant="h5" gutterBottom align="left">
        Data Storage
      </Typography>
      <Typography variant="body1" paragraph align="left">
        We may use LocalStorage to store important data locally in your web browser. This data is only used for internal purposes and is not shared with third parties.
      </Typography>
      <Typography variant="h5" gutterBottom align="left">
        Cookies
      </Typography>
      <Typography variant="body1" paragraph align="left">
        We do not use cookies or similar tracking technologies on our website.
      </Typography>
      <Typography variant="h5" gutterBottom align="left">
        Third-party Links
      </Typography>
      <Typography variant="body1" paragraph align="left">
        Our website may contain links to third-party websites that are not operated by us. Please be aware that we have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies.
      </Typography>
      <Typography variant="h5" gutterBottom align="left">
        Changes to This Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph align="left">
        We reserve the right to update or change our Privacy Policy at any time. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
      </Typography>
      <Typography variant="h5" gutterBottom align="left">
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph align="left">
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:nei@estg.ipp.pt">nei@estg.ipp.pt</a>.
      </Typography>
    </div>
  );
}

export default PrivacyPolicyPage;
