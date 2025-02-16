import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';

const PollForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() === '') {
      setError('Question is required');
      return;
    }

    const filledOptions = options
      .filter((opt) => opt.trim() !== '')
      .map((text) => ({ optionText: text }));

    if (filledOptions.length < 2) {
      setError('At least 2 options are required');
      return;
    }

    try {
      await axios.post('https://cactro-fullstack-gamma.vercel.app/post', {
        question,
        options: filledOptions
      });
      setQuestion('');
      setOptions(['', '']);
      setError('');
      alert('Poll created successfully!');
    } catch (error) {
      console.error('Error creating poll:', error);
      setError('Failed to create poll');
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create a Poll
        </Typography>

        <TextField
          fullWidth
          label="Question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 3 }}
        />

        {options.map((option, index) => (
          <div 
            key={index} 
            style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
          >
            <TextField
              fullWidth
              label={`Option ${index + 1}`}
              variant="outlined"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              sx={{ mr: 1 }}
            />
            <IconButton
              onClick={() => removeOption(index)}
              disabled={options.length <= 2}
            >
              <Remove />
            </IconButton>
          </div>
        ))}

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={addOption}
          sx={{ mb: 2 }}
        >
          Add Option
        </Button>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Create Poll
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PollForm;
