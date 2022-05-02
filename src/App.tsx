import { useCallback, useEffect, useState } from "react";
import { useGetRecipesMutation } from "services/recipeApi";
import {
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import Card from "components/Card";

const App = () => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [health, setHealth] = useState("vegan");
  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState({});

  const [getRecipes, { isLoading, data }] = useGetRecipesMutation();

  const getFoodRecipes = useCallback(async () => {
    await getRecipes({ query, health });
  }, [getRecipes, health, query]);

  useEffect(() => {
    getFoodRecipes();
  }, [query, health, getFoodRecipes]);

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-center">
            <h5 className="fw-bold mt-2">🍔 Food Recipe App</h5>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>

      <div className="row g-1 align-items-center mt-2">
        <MDBInput
          wrapperClass="col-auto"
          label="Search Recipe"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="col-auto">
          <MDBBtn>Search</MDBBtn>
        </div>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4">
          {data?.hits?.map((item: any, index) => (
            <Card key={index} recipe={item.recipe} />
          ))}
        </MDBRow>
      </div>
    </div>
  );
};

export default App;
