import { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, CircularProgress, TextField, Box, Paper } from '@mui/material';
import { Grid } from '@mui/material';

function Summarizer() {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (!selectedFile) return;
  
    const fileType = selectedFile.type;
  
    if (fileType === 'text/plain') {
      setFile(selectedFile);
      setError('');
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target.result);
      };
      reader.readAsText(selectedFile);
    } else if (fileType === 'application/pdf') {
      setFile(selectedFile);
      setInputText('');  // Optional: clear the inputText for visual clarity
      setError('');
    } else {
      setFile(null);
      setInputText('');
      setError('يرجى تحميل ملف بصيغة .txt أو .pdf فقط.');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText && !file) {
      setError('يرجى إدخال نص أو تحميل ملف.');
      return;
    }

    try {
      setLoading(true);
      let response;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
      
        response = await axios.post('http://localhost:8000/summarize_file/', formData);
      } else {
        response = await axios.post(
          'http://localhost:8000/summarize_text/',
          { text: inputText },
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          }
        );
      }
      

      setSummary(response.data.summary || 'لم يتم العثور على ملخص.');
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('فشل في التلخيص. يرجى المحاولة مرة أخرى.');
      setSummary('');
      // document.querySelector('.resultbox')?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setSummary('');
    setFile(null);
    setError('');
  };

  return (
    <div className="container1 "  >
      <Paper className="l_paper2" elevation={5}>
        {/* <Box className="resultbox">
          <Typography  className="header1" variant="h5">
           : الملخص
          </Typography> 

          {loading ? (
            <Box  justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : summary ? (
            <Box my={4}>
             <TextField
  multiline
  fullWidth
  value={summary}
  rows={10}
  variant="outlined"
  dir="rtl" // <-- Add this to force right-to-left
  InputProps={{
    readOnly: true,
    style: {
      borderRadius: '15px',
      padding: '10px',
      overflow: 'auto',
      maxHeight: '250px',
      textAlign: 'right', 
      direction: 'rtl',   
      fontFamily: 'Tahoma, Arial, sans-serif', 
    },
  }}
/>

            </Box>
          ) : error && (
            <Typography color="error" align="center" my={2}>
              {error}
            </Typography>
          )}
        </Box> */}
        <Box className="enterbox" position="relative" mb={3}>
  {summary.trim() === '' && !loading && (
    <Typography
      className="header1"
      variant="h5"
      sx={{
        position: 'absolute',
        top: '15%',
        left: '89%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        textAlign: 'center',
        color: '#aaa',
      }}
    >
       الملخص:
    </Typography>
  )}

  {loading ? (
    <Box justifyContent="center" my={4} display="flex">
      <CircularProgress />
    </Box>
  ) : (
    <TextField
      multiline
      fullWidth
      value={summary}
      rows={10}
      variant="outlined"
      dir="rtl"
      // placeholder="الملخص سيظهر هنا..."
      InputProps={{
        readOnly: true,
        style: {
          padding: '15px',
          textAlign: 'right',
        },
      }}
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: '15px',
        position: 'relative',
        zIndex: 1,
      }}
    />
  )}
</Box>

      </Paper>

      <Paper className="r_paper1" elevation={5} sx={{  }}>
  <form onSubmit={handleSubmit}>
    

  <Box className="enterbox" position="relative" mb={3}>
  {/* Embedded Buttons - Shown only when inputText is empty */}
  {inputText.trim() === '' && (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      sx={{
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        display: 'flex',
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
<Button
  variant="outlined"
  onClick={() => navigator.clipboard.readText().then(setInputText)}
  sx={{
    width: 140,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    textAlign: 'center',
  }}
  className="action-button"
>
  <i className="fa-regular fa-clipboard"></i>
  لصق النص
</Button>

<input
  id="upload-file"
  type="file"
  accept=".txt,application/pdf"

  style={{ display: 'none' }}
  onChange={handleFileChange}
/>
<label htmlFor="upload-file">
  <Button
    variant="outlined"
    component="span"
    sx={{
      width: 140,
      borderRadius: '10px',
      borderStyle: 'dotted', // Add this line
      borderWidth: '2px', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      textAlign: 'center',
    }}
    className="action-button"
  >
    <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '20px' }}></i>
    تحميل ملف
  </Button>


      </label>
    </Box>
  )}

  {/* Text Input */}
  <TextField
    multiline
    rows={10}
    fullWidth
    value={inputText}
    onChange={handleTextChange}
    placeholder="اكتب أو الصق النص هنا..."
    variant="outlined"
    dir="rtl" 
    sx={{
      backgroundColor: '#f5f5f5',
      borderRadius: '15px',
      position: 'relative',
      zIndex: 1,
    }}
    InputProps={{
      style: {
        padding: '10px',
        textAlign: 'right', 
      },
    }}
  />
</Box>
    <Box display="flex" justifyContent="center">
    <Box my={2}>
    <Button type="submit" variant="outlined" className="button2" sx={{ mr: 2 }}>
  {/* <i className="fa-solid fa-scissors icon-style"></i> &nbsp; */}
  تلخيص
</Button>

<Button variant="outlined" className="button2" onClick={handleClear}>
  {/* <i className="fa-solid fa-trash icon-style"></i> &nbsp; */}
  حذف
</Button>

          </Box>
    </Box>
  </form>
  <Box className="label1">
          <Typography variant="h5" align="center" gutterBottom>
          التفاصيل الكثيرة ... في سطور  </Typography>
        </Box>
</Paper>


    </div>
  );
}

export default Summarizer;
