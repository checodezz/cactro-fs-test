import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Box
} from '@mui/material';
import axios from 'axios';

const PollList = () => {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const response = await axios.get('https://cactro-fullstack-gamma.vercel.app/polls/');
      setPolls(response.data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  useEffect(() => {
    fetchPolls();
    const interval = setInterval(() => {
      fetchPolls();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getTotalVotes = (options) => {
    return options.reduce((total, option) => total + option.votes, 0);
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      await axios.post(`https://cactro-fullstack-gamma.vercel.app/polls/${pollId}/vote`, {
        optionIndex
      });
      fetchPolls(); // Refresh polls after voting
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      {polls.map((poll) => (
        <Card key={poll._id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {poll.question}
            </Typography>
            {poll.options.map((option, index) => {
              const totalVotes = getTotalVotes(poll.options);
              const votePercentage = totalVotes ? (option.votes / totalVotes) * 100 : 0;
              return (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="body1">{option.optionText}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {votePercentage.toFixed(1)}% ({option.votes} votes)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={votePercentage}
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleVote(poll._id, index)}
                    sx={{ mt: 1 }}
                  >
                    Vote
                  </Button>
                </Box>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PollList;
