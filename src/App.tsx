import { SetStateAction, useCallback, useEffect, useState } from "react";
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
import Spinner from "components/Spinner";

const options = [
  {
    label: "Vegan",
    value: "vegan",
  },
  {
    label: "Vegetarian",
    value: "vegetarian",
  },
  {
    label: "Paleo",
    value: "paleo",
  },
  {
    label: "Dairy Free",
    value: "dairy-free",
  },
  {
    label: "Low Sugar",
    value: "low-sugar",
  },
  {
    label: "Egg Free",
    value: "egg-free",
  },
];

const App = () => {
  const [value, setValue] = useState(""); // input value값
  const [query, setQuery] = useState(""); // input 검색 데이터 요청 시 필요한 query 값 (value 저장)
  const [health, setHealth] = useState("vegan"); // select 검색 데이터 요청시 필요한 option 값
  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState({});

  const [getRecipes, { isLoading, data }] = useGetRecipesMutation();

  const getFoodRecipes = useCallback(async () => {
    await getRecipes({ query, health });
  }, [getRecipes, health, query]);

  useEffect(() => {
    getFoodRecipes();
  }, [query, health, getFoodRecipes]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleSearch = () => {
    setQuery(value);
    setValue("");
  };

  const handleClick = (e: { target: { value: SetStateAction<string> } }) => {
    setHealth(e.target.value);
  };

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
          <MDBBtn onClick={handleSearch}>Search</MDBBtn>
        </div>
        <div className="col-auto">
          <select
            className="categoryDropdown"
            value={health}
            onChange={handleClick}
            style={{
              width: "100%",
              height: "35px",
              borderRadius: "4px",
              borderColor: "#83ccc5",
            }}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value || ""}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4">
          {data?.hits?.map((item: any, index: number) => (
            <Card key={index} recipe={item.recipe} />
          ))}
        </MDBRow>
      </div>
    </div>
  );
};

export default App;
