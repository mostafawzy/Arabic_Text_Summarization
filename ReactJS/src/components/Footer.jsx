import { Box, Grid, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#567e9e',
        color: '#fff',
        pt: 6,
        pb: 4,
        px: { xs: 3, sm: 8 },
        mt: 6,
      }}
    >
      <Grid container spacing={7} justifyContent="center" textAlign="center">
        {/* About */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>سطور</Typography>
          <Typography variant="body2">
            .تطبيق لتلخيص النصوص العربية بدقة وسرعة باستخدام الذكاء الاصطناعي
          </Typography>
        </Grid>

        {/* Info */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>معلومات</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <MuiLink component={Link} to="/about" sx={{ color: '#fff', textDecoration: 'none' }}>
              عن التطبيق
            </MuiLink>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            سياسة الخصوصية
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            الشروط والأحكام
          </Typography>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>تواصل معنا</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>info@sutoor.com</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>+20 150 607 4389</Typography>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={5} borderTop="1px solid rgba(255,255,255,0.2)" pt={3}>
        <Typography variant="body2">
          © {new Date().getFullYear()} سطور. جميع الحقوق محفوظة.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
