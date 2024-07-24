import React from "react";

export const Image = ({ title, largeImage, smallImage }) => {
  const styles = {
    portfolioItem: {
      display: 'inline-block',
      margin: '10px',
    },
    hoverBg: {
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.6s ease, box-shadow 0.3s ease', // Added box-shadow transition
      // border: '1px solid grey', // Grey border for card look
      borderRadius: '5px', // Rounded corners for card effect
    },
    imgResponsive: {
      width: '300px',  // Set your desired width
      height: '400px', // Set your desired height
      objectFit: 'cover', // Ensure the image covers the entire area
    },
    hoverText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Grey background with some transparency
      padding: '10px',
      borderRadius: '5px',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    hoverBgHover: {
      opacity: 1,
      transform: 'scale(1.05)', // Slight pop-up effect
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Dropdown shadow effect
    },
  };

  return (
    <div style={styles.portfolioItem}>
      <div
        style={styles.hoverBg}
        onMouseEnter={(e) => {
          const hoverBg = e.currentTarget;
          hoverBg.querySelector('.hover-text').style.opacity = 1;
          hoverBg.style.transform = 'scale(1.05)';
          hoverBg.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          const hoverBg = e.currentTarget;
          hoverBg.querySelector('.hover-text').style.opacity = 0;
          hoverBg.style.transform = 'scale(1)';
          hoverBg.style.boxShadow = 'none';
        }}
      >
        <div className="hover-text" style={styles.hoverText}>
          <h4>{title}</h4>
        </div>
        <img src={smallImage} style={styles.imgResponsive} alt={title} />
      </div>
    </div>
  );
};
