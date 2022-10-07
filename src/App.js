import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BattleArena from "./pages/BattleArena/BattleArena";
import Form from "./components/Form/Form";

export default function App() {
  const [pokemons, setPokemon] = useState({});
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getPokemon = async (e) => {
    e.preventDefault();
    // const API = `http://localhost:8080/pokemon/${form.name.toLowerCase()}`;
    const API = `https://pokeapi.co/api/v2/pokemon/${form.name.toLowerCase()}`;
    const res = await axios.get(API);
    setPokemon(res.data);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header handleChange={handleChange} getPokemon={getPokemon} />
        <Form getPokemon={getPokemon} handleChange={handleChange} />
        <Routes>
          <Route path="/" element={<Home pokemons={pokemons} />} />
          <Route path="/battlearena" element={<BattleArena />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
