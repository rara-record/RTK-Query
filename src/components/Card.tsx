import {
  MDBCol,
  MDBCardGroup,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
} from "mdb-react-ui-kit";

interface PropsFuntion {
  recipe: any;
}

const Card: React.FC<PropsFuntion> = ({ recipe }) => {
  return (
    <>
      <MDBCol>
        <MDBCardGroup>
          <MDBCard className="h-100 mt-2 d-sm-flex">
            <MDBCardImage
              src={recipe.image}
              alt={recipe.label}
              position="top"
              style={{ cursor: "pointer" }}
            />

            <MDBCardBody>
              <h5 className="fw-bold">{recipe.label}</h5>
            </MDBCardBody>
          </MDBCard>
        </MDBCardGroup>
      </MDBCol>
    </>
  );
};

export default Card;
