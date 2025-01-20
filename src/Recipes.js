import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import recipes from './RecipeList';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {location.pathname.includes('/side') ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {recipes[0].list.map((recipe) => (
            <Box onClick={() => navigate(`/side?recipe=${recipe.name}`)} sx={{
              cursor: "pointer",
              margin: "18px"
            }}>
              <img 
                src={recipe.image} 
                alt={recipe.name}
                style={{ width: "100%", height: "300px", maxWidth: "300px", borderRadius: "6px" }} 
              />
              <Typography sx={{ paddingTop: "8px", textAlign: "center", color: "#662d91", fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</Typography>
            </Box>
          ))}
        </Box>
      ) : location.pathname.includes('/main') ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          <Typography sx={{ width: "100%", textDecoration: "underline", textAlign: "center", fontWeight: "bold", fontSize: "28px", paddingTop: "12px", color: "#662d91" }}>Asian Dishes:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {recipes[1].list.filter((recipe) => recipe.subtitle === "Asian Dishes").map((recipe) => (
              <Box onClick={() => navigate(`/main?recipe=${recipe.name}`)} sx={{
                cursor: "pointer",
                margin: "18px"
              }}>
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  style={{ width: "100%", height: "300px", maxWidth: "300px", borderRadius: "6px" }} 
                />
                <Typography sx={{ paddingTop: "8px", textAlign: "center", color: "#662d91", fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ paddingBottom: "5px" }} />
          <Typography sx={{ width: "100%", textDecoration: "underline", textAlign: "center", fontWeight: "bold", fontSize: "28px", paddingTop: "12px", color: "#662d91" }}>Western Dishes:</Typography>
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {recipes[1].list.filter((recipe) => recipe.subtitle === "Western Dishes").map((recipe) => (
              <Box onClick={() => navigate(`/main?recipe=${recipe.name}`)} sx={{
                cursor: "pointer",
                margin: "18px"
              }}>
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  style={{ width: "100%", height: "300px", maxWidth: "300px", borderRadius: "6px" }} 
                />
                <Typography sx={{ paddingTop: "8px", textAlign: "center", color: "#662d91", fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ paddingBottom: "5px" }} />
          <Typography sx={{ width: "100%", textDecoration: "underline", textAlign: "center", fontWeight: "bold", fontSize: "28px", paddingTop: "12px", color: "#662d91" }}>Pasta:</Typography>
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {recipes[1].list.filter((recipe) => recipe.subtitle === "Pasta").map((recipe) => (
              <Box onClick={() => navigate(`/main?recipe=${recipe.name}`)} sx={{
                cursor: "pointer",
                margin: "18px"
              }}>
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  style={{ width: "100%", height: "300px", maxWidth: "300px", borderRadius: "6px" }} 
                />
                <Typography sx={{ paddingTop: "8px", textAlign: "center", color: "#662d91", fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ paddingBottom: "5px" }} />
          <Typography sx={{ width: "100%", textDecoration: "underline", textAlign: "center", fontWeight: "bold", fontSize: "28px", paddingTop: "12px", color: "#662d91" }}>Breakfast:</Typography>
          <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {recipes[1].list.filter((recipe) => recipe.subtitle === "Breakfast").map((recipe) => (
              <Box onClick={() => navigate(`/main?recipe=${recipe.name}`)} sx={{
                cursor: "pointer",
                margin: "18px"
              }}>
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  style={{ width: "100%", height: "300px", maxWidth: "300px", borderRadius: "6px" }} 
                />
                <Typography sx={{ paddingTop: "8px", textAlign: "center", color: "#662d91", fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>Bread:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {recipes[2].list.filter((recipe) => recipe.subtitle === "Bread").map((recipe) => (
              <Box onClick={() => navigate(`/bakery?recipe=${recipe.name}`)} sx={{
                cursor: "pointer",
                margin: "18px"
              }}>
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  style={{ width: "100%", height: "300px", maxWidth: "300px", borderRadius: "6px" }} 
                />
                <Typography sx={{ paddingTop: "8px", textAlign: "center", color: "#662d91", fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ paddingBottom: "5px" }} />
          <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>Desserts:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {recipes[2].list.filter((recipe) => recipe.subtitle === "Desserts").map((recipe) => (
              <Box onClick={() => navigate(`/bakery?recipe=${recipe.name}`)} sx={{
                cursor: "pointer",
                margin: "18px"
              }}>
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  style={{ width: "100%", height: "300px", maxWidth: "300px", borderRadius: "6px" }} 
                />
                <Typography sx={{ paddingTop: "8px", textAlign: "center", color: "#662d91", fontSize: "20px", fontWeight: "bold" }}>{recipe.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}