import './App.css';
import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Recipe from './Recipe'
import Recipes from './Recipes'
import recipes from './RecipeList';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleBlur = () => {
    setSearch("")
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/side")
    }
    const params = new URLSearchParams(location.search);
    setRecipe(params.get('recipe'))
    
    const searchLowerCase = search.toLowerCase();

    const results = recipes.flatMap((category) =>
      category.list.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchLowerCase)
      )
    );
    if (search.trim() === "") {
      setSearchResult([]);
    } else {
      setSearchResult(results);
    }
  }, [search, location])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#662d91' }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 2, overflow: "scroll" }}>
            <img
              src="https://png.pngtree.com/png-vector/20231015/ourmid/pngtree-cute-hamster-chef-cartoon-style-png-image_10162529.png" 
              alt="Side Dish Icon" 
              style={{ width: 50, height: 50 }}
            />
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, fontWeight: location.pathname.includes('/side') ? "bold" : "" }}
            >
              <Link to="/side">Side Dishes 🥗</Link>
            </IconButton>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, fontWeight: location.pathname.includes('/main') ? "bold" : "" }}
            >
              <Link to="/main">Main Dishes 🍲</Link>
            </IconButton>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, fontWeight: location.pathname.includes('/bakery') ? "bold" : "" }}
            >
              <Link to="/bakery">Bakery 🍪</Link>
            </IconButton>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={search}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
              onBlur={handleBlur}
            />
            {searchResult.length > 0 ? (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  backgroundColor: 'white',
                  boxShadow: 3,
                  borderRadius: '4px',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  mt: '5px',
                }}
              >
                {searchResult.map((recipe) => (
                  <Box>
                    <Typography
                      key={recipe.id}
                      onMouseDown={() => { setSearch(""); navigate(`/${recipe.title}?recipe=${recipe.name}`) }}
                      sx={{ 
                        color: '#662d91',
                        padding: '5px',
                        margin: '5px',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#662d91',
                          opacity: '60%',
                          color: 'white'
                        }
                      }}>
                      {recipe.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : search !== "" ? (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  backgroundColor: 'white',
                  boxShadow: 3,
                  borderRadius: '4px',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  mt: '5px',
                }}
              >
                <Typography sx={{ color: 'black', padding: '5px' }}>No recipes found 🥲</Typography>
              </Box>) : null}
          </Search>
        </Toolbar>
      </AppBar>
      {recipe ? <Recipe /> : <Recipes />}
    </Box>
  );
}
