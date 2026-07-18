import { useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import "./App.css";


import srilanka from "./images/srilanka.jpg";
import japan from "./images/japan.jpg";
import mexico from "./images/mexico.jpg";
import india from "./images/india.jpg";
import italy from "./images/italy.jpg";

function App() {
  const [page, setPage] = useState("home");
  const [recipes, setRecipes] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const getToken = () => {
  return localStorage.getItem("token");
};

  const [form, setForm] = useState({
    name: "",
    country: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    image: ""
  });

  const countries = [
    { name: "Sri Lanka", img: srilanka },
    { name: "India", img: india },
    { name: "Italy", img: italy },
    { name: "Japan", img: japan },
    { name: "Mexico", img: mexico }
  ];

  // GET RECIPES
  const goToCountries = () => {
    axios.get("http://localhost:5000/api/recipes")
      .then((res) => {
        setRecipes(res.data);
        setPage("countries");
      });
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD RECIPE
  const addRecipe = () => {
  axios.post(
    "http://localhost:5000/api/recipes",
    form,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
  .then(() => {
    setForm({
      name: "",
      country: "",
      ingredients: "",
      instructions: "",
      cookingTime: "",
      image: ""
    });

    goToCountries();
  })
  .catch((err) => {
    console.log(err.response?.data || err.message);
  });
};


  // DELETE RECIPE
  const deleteRecipe = (id) => {
  axios.delete(
    `http://localhost:5000/api/recipes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
  .then(() => goToCountries())
  .catch((err) => {
    console.log(err.response?.data || err.message);
  });
};
  // FILTER
  const filteredRecipes = selectedCountry
    ? recipes.filter((r) => r.country === selectedCountry)
    : [];
  
  if (page === "login") {
  return <Login setPage={setPage} />;
}

  // ================= HOME =================
  if (page === "home") {
    return (
      <div className="home">
        <h1 className="title">GloboBites</h1>
        <p className="subtitle">Discover world recipes </p>

        <button className="exploreBtn" onClick={goToCountries}>
          Explore
        </button>
      </div>
    );
  }

  // ================= COUNTRIES =================
  if (page === "countries") {
    return (
      <div>
        {/* NAVBAR */}
        <div className="navbar">
          <h2 className="logo">GloboBites</h2>

          <div className="nav-links">
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("countries")}>Countries</button>
            <button onClick={() => setPage("new")}>Add Recipe</button>
            <button onClick={() => setPage("culture")}>Culture</button>
          </div>
        </div>

        <div className="page">
          <h2>Choose a Country </h2>

          <div className="grid">
            {countries.map((c) => (
              <div
                key={c.name}
                className="countryCard"
                onClick={() => setSelectedCountry(c.name)}
              >
                <img src={c.img} alt={c.name} />
                <h3>{c.name}</h3>
              </div>
            ))}
          </div>

          {/* RECIPES */}
          {selectedCountry && (
            <div>
              <h2>{selectedCountry} Recipes </h2>

              <div className="recipeGrid">

                {filteredRecipes.map((r) => (
                  <div className="recipeCard" key={r._id}>

                    <h2 className="recipeTitle">{r.name}</h2>

                    <div className="recipeContent">

                      {/* LEFT SIDE */}
                      <div className="recipeText">
                        <h4>Ingredients</h4>
                        <p>{r.ingredients}</p>

                        <h4>Preparation</h4>
                        <p>{r.instructions}</p>

                        <p className="time">⏱ {r.cookingTime}</p>

                        <button
                          className="deleteBtn"
                          onClick={() => deleteRecipe(r._id)}
                        >
                          Delete
                        </button>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="recipeImageBox">
                        {r.image && (
                          <img src={r.image} alt={r.name} />
                        )}
                      </div>

                    </div>
                  </div>
                ))}

              </div>

              <button onClick={() => setSelectedCountry(null)}>
                Back
              </button>
            </div>
          )};
        </div>
      </div>
      
    );
  }
  
  // ================= ADD RECIPE =================
if (page === "new") {
  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <h2 className="logo">GloboBites</h2>

        <div className="nav-links">
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => goToCountries()}>Countries</button>
          <button onClick={() => setPage("new")}>Add Recipe</button>
          <button onClick={() => setPage("culture")}>Culture</button>
        </div>
      </div>

      {/* PAGE */}
      <div className="addRecipePage">

        <div className="addRecipeForm">

          <h2>Add New Recipe </h2>

          <input
            name="name"
            placeholder="Recipe Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />

          <textarea
            name="ingredients"
            placeholder="Ingredients"
            value={form.ingredients}
            onChange={handleChange}
          ></textarea>

          <textarea
            name="instructions"
            placeholder="Preparation"
            value={form.instructions}
            onChange={handleChange}
          ></textarea>

          <input
            name="cookingTime"
            placeholder="Cooking Time"
            value={form.cookingTime}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="/images/kottu.jpg"
            value={form.image}
            onChange={handleChange}
          />

          <button
            className="addBtn"
            onClick={addRecipe}
          >
            Save Recipe
          </button>

        </div>

      </div>
    </div>
  );
  
}
// ================= FOOD CULTURE =================
if (page === "culture") {
  return (
    <div>
      <div className="navbar">
        <h2 className="logo">GloboBites</h2>

        <div className="nav-links">
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={goToCountries}>Countries</button>
          <button onClick={() => setPage("new")}>Add Recipe</button>
          <button onClick={() => setPage("culture")}>Culture</button>
        </div>
      </div>

      <div className="culturePage">

        <h1 className="cultureTitle">Food Culture</h1>

        <div className="cultureItem left">
          <img src={srilanka} alt="Sri Lanka" />
          <div className="cultureCard">
            <h2> Sri Lankan Food Culture</h2>
            <p>
              Sri Lankan food culture is known for its bold spices, coconut, and rice-based dishes. 
              Traditional recipes have been passed down through generations and often bring families together. Meals are rich in flavor and reflect the island's diverse cultural heritage.
            </p>
          </div>
        </div>

        <div className="plane">✈️ · · · · · · · · · ·</div>

        <div className="cultureItem right">
          <img src={india} alt="India" />
          <div className="cultureCard">
            <h2> Indian Food Culture</h2>
            <p>
              Indian food culture is celebrated for its vibrant spices, diverse regional cuisines, and colorful dishes. Every region has its own unique cooking traditions and signature flavors.
               Food plays an important role in festivals, family gatherings, and everyday life.
            </p>
          </div>
        </div>

        <div className="plane">✈️ · · · · · · · · · ·</div>

        <div className="cultureItem left">
          <img src={italy} alt="Italy" />
          <div className="cultureCard">
            <h2> Italian Food Culture</h2>
            <p>
              Italian food culture focuses on fresh, high-quality ingredients and simple cooking techniques. Homemade pasta, pizza, and regional specialties are enjoyed with family and friends. 
              Italian cuisine emphasizes tradition, balance, and sharing meals together.
            </p>
          </div>
        </div>
        
        <div className="plane">✈️ · · · · · · · · · ·</div>

        <div className="cultureItem right">
          <img src={japan} alt="Japan" />
          <div className="cultureCard">
            <h2> Japanese Food Culture</h2>
            <p>
              Japanese food culture values freshness, balance, and beautiful presentation. Traditional dishes often feature rice, seafood, vegetables, and seasonal ingredients. 
              Meals reflect respect for nature, harmony, and attention to detail.
            </p>
          </div>
        </div>
        
        <div className="plane">✈️ · · · · · · · · · ·</div>
        
        <div className="cultureItem left">
          <img src={mexico} alt="Mexico" />
          <div className="cultureCard">
            <h2> Mexican Food Culture</h2>
            <p>
              Mexican food culture is famous for its bold flavors, colorful ingredients, and rich culinary traditions. Corn, beans, chilies, and fresh herbs are staples in many dishes. 
              Food is an important part of celebrations and brings people together through shared meals.
             
            </p>
          </div>
        </div>


      </div>
    </div>
  );
}


  


  return null;
}

export default App;