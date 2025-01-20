import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Tooltip } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import recipes from './RecipeList';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';

export default function App() {
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const recipeName = queryParams.recipe;

    if (location.pathname.includes('/side')) {
      setRecipe(recipes[0].list.filter((r) => r.name === recipeName)[0]);
    } else if (location.pathname.includes('/main')) {
      setRecipe(recipes[1].list.filter((r) => r.name === recipeName)[0]);
    } else {
      setRecipe(recipes[2].list.filter((r) => r.name === recipeName)[0]);
    }
  }, [location]);

  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  if (!recipe) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <img
          src="loading.gif"
          alt="Loading..."
          style={{ width: '400px', height: 'auto' }}
        />
        <Typography sx={{ textAlign: "center", fontWeight: 'bold', color: '#662d91', fontSize: "24px" }}>
          Getting your order ready...
        </Typography>
      </Box>
    )
  }

  return (
    <Box 
      sx={{
        backgroundImage: 'url("images/cookingBackground.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',         
        display: "flex",
        justifyContent: "center",
        width: "100%" 
      }}>
      <Box sx={{ backgroundColor: "white", borderRadius: "10px 0", padding: "20px" }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", color: '#662d91', paddingTop: "10px", fontSize: "36px", fontWeight: "bold", fontFamily: "'Kirang Haerang', serif" }}>
          { recipe.name }
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", margin: "10px" }}>
          <Box sx={{ margin: "10px" }}>
            <img 
              src={recipe.image} 
              alt={recipe.name}
              style={{ width: "100%", height: "auto", maxWidth: "450px", borderRadius: "10px" }} 
            />
          </Box>
          <Box sx={{ margin: "50px", marginRight: "70px", display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", width: 'fit-content' }}>
            <Typography gutterBottom variant="span" component="div" sx={{ fontSize: "18px", fontWeight: 'bold' }}>
              You will need:
            </Typography>
            <FormGroup>
              {recipe.ingrediants.map((ingrediant) => (
                <FormControlLabel control={
                <Checkbox sx={{
                  '&.Mui-checked': {
                    color: '#662d91',
                  },
                }} />
              } label={`${ingrediant.quantity ? ingrediant.quantity : ""} ${ingrediant.name}`} />
              ))}
            </FormGroup>
          </Box>
        </Box>
        <Typography sx={{ fontSize: "18px", fontWeight: 'bold', paddingLeft: '30px' }}>
          Steps:
        </Typography>
        {recipe.steps.map((step, index) => (
          <Typography key={index} sx={{ paddingTop: '14px', paddingLeft: '30px' }}>
            {index + 1}) {step.split(' ').map((word, i) => {
              const ingrediant = recipe.ingrediants.find(
                ingrediant => ingrediant.name.toLowerCase() === word.toLowerCase()
              );
              return ingrediant ? (
                <Tooltip key={i} title={ingrediant.quantity} placement="top" arrow>
                  <span style={{ textDecoration: 'underline', color: '#662d91', cursor: 'pointer' }}>
                    {word}
                  </span>
                  <span>{" "}</span>
                </Tooltip>
              ) : (
                <span key={i}>{word}{" "}</span>
              )
            })}
          </Typography>
        ))}
      </Box>
      <Box sx={{ display: { sm: "none", md: "flex" }, alignItems: "start", backgroundColor: "white", borderRadius: "0 10px" }}>
        <IconButton onClick={handleClick}>
          {open ? <ChevronRightIcon sx={{ fontSize: "28px", borderRadius: "50px", color: "#662d91" }} /> : <MenuIcon sx={{ fontSize: "28px", borderRadius: "4px", color: "#662d91" }} />}
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 2,
          height: '100vh',
          maxWidth: open ? 1000 : 40,
          overflow: 'scroll',
          transition: 'all 1s ease',
          backgroundColor: "transparent",
          color: "#662d91",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: open ? 'flex' : 'none', flex: 1, justifyContent: "center", margin: "10px" }}>
            <Typography sx={{ backgroundColor: "white", borderRadius: "6px", padding: "4px 12px", fontWeight: "bold", fontSize: "18px", width: "fit-content" }}>You may also like...</Typography>
          </Box>
        </Box>
        <List sx={{ display: open ? '' : 'none', overflow: "scroll" }}>
          {location.pathname.includes('/side') ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
              {recipes[0].list.filter((r) => r.name !== recipe.name).map((recipe) => (
                <Box onClick={() => navigate(`/side?recipe=${recipe.name}`)} sx={{ backgroundColor: "white", borderRadius: "6px", maxWidth: "150px", margin: "14px", display: "flex", flexDirection: "column", cursor: "pointer", '&:hover': {
                    textDecoration: "underline"
                  } }}>
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    style={{ width: "200px", height: "150px", borderRadius: "6px" }} 
                  />
                  <Typography sx={{ fontWeight: "bold", textWrap: "wrap", textAlign: "center", cursor: "pointer", padding: "2px" }}>{recipe.name}</Typography>
                </Box>
              ))}
            </Box>
          ) : location.pathname.includes('/main') ? (
            <Box sx={{ paddingRight: "20px", textAlign: "end" }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {recipes[1].list.filter((r) => r.name !== recipe.name && recipe.subtitle === r.subtitle).map((recipe) => (
                  <Box onClick={() => navigate(`/main?recipe=${recipe.name}`)} sx={{ backgroundColor: "white", borderRadius: "6px", maxWidth: "150px", margin: "14px", display: "flex", flexDirection: "column", cursor: "pointer", '&:hover': {
                      textDecoration: "underline"
                    } }}>
                    <img 
                      src={recipe.image} 
                      alt={recipe.name}
                      style={{ width: "200px", height: "150px", borderRadius: "6px" }} 
                    />
                    <Typography sx={{ fontWeight: "bold", textWrap: "wrap", textAlign: "center", cursor: "pointer", padding: "2px" }}>{recipe.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box sx={{ paddingRight: "20px", textAlign: "end" }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {recipes[2].list.filter((r) => r.name !== recipe.name && recipe.subtitle === r.subtitle).map((recipe) => (
                  <Box onClick={() => navigate(`/bakery?recipe=${recipe.name}`)} sx={{ backgroundColor: "white", borderRadius: "6px", maxWidth: "150px", margin: "14px", display: "flex", flexDirection: "column", cursor: "pointer", '&:hover': {
                      textDecoration: "underline"
                    } }}>
                    <img 
                      src={recipe.image} 
                      alt={recipe.name}
                      style={{ width: "200px", height: "150px", borderRadius: "6px" }} 
                    />
                    <Typography sx={{ fontWeight: "bold", textWrap: "wrap", textAlign: "center", cursor: "pointer", padding: "2px" }}>{recipe.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </Box>
  );
}