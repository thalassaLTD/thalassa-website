import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export const Testimonials = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? props.data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === props.data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton onClick={handlePrev}>
              <ArrowBack />
            </IconButton>
            {props.data
              ? props.data.slice(currentIndex, currentIndex + 3).map((d, i) => (
                  <Card key={`${d.name}-${i}`} style={{ margin: '0 10px', flex: '1 0 30%' }}>
                    <CardContent>
                      {/* <div className="testimonial-image">
                        {" "}
                        <img src={d.img} alt="" />{" "}
                      </div> */}
                      <Typography variant="body2" component="p">
                        "{d.text}"
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        - {d.name}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              : 'loading'}
            <IconButton onClick={handleNext}>
              <ArrowForward />
            </IconButton>
          </Box>
        </div>
      </div>
    </div>
  );
};
