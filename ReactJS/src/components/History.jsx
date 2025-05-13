import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios';

function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clearLoading, setClearLoading] = useState(false);
  const [clearError, setClearError] = useState('');
  const [clearSuccess, setClearSuccess] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/history');
        const raw = response.data.history || 'لا يوجد سجل محفوظ بعد.';
        
        // Split by the separator line, filter out empties
        const parts = raw
          .split(/={40,}/)
          .map(p => p.trim())
          .filter(Boolean);

        // Turn each chunk into { original, summary }
        const parsed = parts.map(chunk => {
          const origMatch = chunk.match(/📝 النص:\s*([\s\S]*?)\s*📌 الملخص:/);
          const sumMatch  = chunk.match(/📌 الملخص:\s*([\s\S]*)/);
          return {
            original: origMatch ? origMatch[1].trim() : '',
            summary:  sumMatch  ? sumMatch[1].trim()  : '',
          };
        });

        setEntries(parsed);
        setError('');
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('فشل في تحميل السجل.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    setClearLoading(true);
    setClearError('');
    setClearSuccess('');

    try {
      const response = await axios.delete('http://localhost:8000/history');
      if (response.data.message === 'تم حذف السجل بنجاح.') {
        setEntries([]); // Clear entries from UI
        setClearSuccess('تم مسح السجل بنجاح!');
      }
    } catch (err) {
      console.error('Error clearing history:', err);
      setClearError('فشل في مسح السجل.');
    } finally {
      setClearLoading(false);
    }
  };

  return (
    <Container sx={{ my: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#567e9e', textAlign: 'center' }}
      >
        السجل
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : entries.length === 0 ? (
        <Typography align="center">لا يوجد ملخصات محفوظة.</Typography>
      ) : (
        <Grid container spacing={2}>
          {entries.map((e, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    📝 النص:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                    }}
                  >
                    {e.original}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    📌 الملخص:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                    }}
                  >
                    {e.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Clear History Button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="error"
          onClick={handleClearHistory}
          disabled={clearLoading}
        >
          {clearLoading ? 'جاري المسح...' : 'محو السجل'}
        </Button>
      </Box>

      {clearError && (
        <Typography color="error" align="center" mt={2}>
          {clearError}
        </Typography>
      )}

      {clearSuccess && (
        <Typography color="success.main" align="center" mt={2}>
          {clearSuccess}
        </Typography>
      )}
    </Container>
  );
}

export default History;
