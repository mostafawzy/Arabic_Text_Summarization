// src/components/About.js
import { Container, Typography, Paper, Box, Divider } from '@mui/material';

function About() {
  return (
    <Container id="about"  sx={{ my: 5, direction: 'rtl' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fdfdfd' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#567e9e' }}>
          عن سُطُور
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          سُطُور هو تطبيق ويب يهدف إلى تلخيص النصوص العربية بشكل دقيق وسريع باستخدام نموذج تعلُّم عميق مدرّب خصيصاً لهذا الغرض.
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          يمكنك إدخال النص العربي مباشرة أو رفع ملف نصي بتنسيق `.txt` للحصول على ملخص فوري للنص.
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          تم تصميم التطبيق بواجهة بسيطة وسلسة لتلبية احتياجات المستخدم العربي في مجال المعالجة اللغوية.
        </Typography>

        <Box mt={3}>
          <Typography variant="subtitle1" color="text.secondary">
            التقنيات المستخدمة:
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            React، FastAPI، PyTorch،Transformer.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default About;
