import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';       // for academic (🏛️)
import MenuBookIcon from '@mui/icons-material/MenuBook';   // instead of 🎵
import WorkIcon from '@mui/icons-material/Work';           // for 💼
import TranslateIcon from '@mui/icons-material/Translate'; // instead of 🏠
import photo from '../assets/photo.png';




const LandingSection = () => {
  return (
    <Box>
      {/* Top Features Section */}
      <Box sx={{ py: 8, backgroundColor: '#fff' }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: 'البحث الأكاديمي', desc: 'اختصر الأبحاث الطويلة إلى نقاط رئيسية', icon: '🎓' },
            { title: 'الاستخدام اليومي', desc: 'قلل وقت القراءة بتلخيص سريع للنصوص', icon: '📖' },
            { title: 'العمل', desc: 'اختصر الاجتماعات الطويلة إلى نقاط محددة', icon: '💼' },
            { title: 'النصوص الصعبة', desc: 'سهل الفقرات المعقدة بنقرة واحدة', icon: <TranslateIcon sx={{ fontSize: 50, color: '#567e9e' }} /> },
        ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} textAlign="center">
              <Typography fontSize="3rem">{item.icon}</Typography>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>{item.title}</Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{item.desc}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Use This Section */}

<Box sx={{ my: 5, py: 8, backgroundColor: '#edf6fe' }}>
  <Grid
    container
    spacing={4}
    alignItems="center"
    justifyContent="center"
    direction={{ xs: 'column', md: 'row-reverse' }} // <-- Reverses order on md+ screens
  >
    {/* Image on the right */}
    <Grid item xs={12} md={5}>
      <Box
        component="img"
        src={photo}
        alt="summary"
        sx={{ width: '100%', maxWidth: 400, borderRadius: 2, mx: 'auto', display: 'block' }}
      />
    </Grid>

    {/* Text on the left */}
    <Grid item xs={12} md={6}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        لماذا تستخدم سُطُور؟
      </Typography>
      <List>
        {[
          'مجاني 100٪: يمكنك تلخيص عدد غير محدود من النصوص ',
          'دقيق: نتائج موثوقة بدون أخطاء',
          'لا حاجة للتسجيل: استخدمه فورًا بدون بيانات شخصية',
          'آمن: لا يتم حفظ بيانات الملخص',
          'سريع: احصل على النتائج خلال ثوانٍ',
          'مرن: يمكنك التحكم في طول التلخيص',
        ].map((text, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <CheckIcon sx={{ color: '#567e9e' }} />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Grid>
  </Grid>
</Box>

    </Box>
  );
};

export default LandingSection;
