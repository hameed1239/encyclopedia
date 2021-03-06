import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_DOG } from "../../utils/mutations";
import {
  QUERY_COLORS,
  QUERY_TEMPERAMENTS,
  QUERY_BREEDS,
} from "../../utils/queries";

import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";

const AddDog = () => {
  const [formState, setFormState] = useState({
    name: "",
    height: "",
    weight: "",
    yearOfBirth: "",
    size: "",
    gender: "",
    hypoallergenic: "",
    story: "",
    breed: "",
    colors: "",
    temperaments: "",
  });

  const [addDog] = useMutation(ADD_DOG);
  const { data } = useQuery(QUERY_COLORS);
  const { data: temperamentsData } = useQuery(QUERY_TEMPERAMENTS);
  const { data: breedsData } = useQuery(QUERY_BREEDS);

  const colorsData = data?.colors || [];
  const temperamentsID = temperamentsData?.temperaments || [];
  const breedsDataID = breedsData?.breeds || [];

  const handleChange = (event) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.hypoallergenic === "true" || formState.hypoallergenic === "") {
      formState.hypoallergenic = true;
    } else if (formState.hypoallergenic === "false") {
      formState.hypoallergenic = false;
    }

    if (formState.size === "") formState.size = "Large";
    if (formState.gender === "") formState.gender = "Male";
    if (formState.breed === "") formState.breed = breedsDataID[0]._id;
    if (formState.colors === "") formState.colors = colorsData[0]._id;
    if (formState.temperaments === "") formState.temperaments = temperamentsID[0]._id;

    formState.yearOfBirth = parseInt(formState.yearOfBirth);

    try {
      const mutationResponse = await addDog({
        variables: {
          name: formState.name,
          height: formState.height,
          weight: formState.weight,
          yearOfBirth: formState.yearOfBirth,
          gender: formState.gender,
          size: formState.size,
          hypoallergenic: formState.hypoallergenic,
          story: formState.story,
          colors: formState.colors,
          breed: formState.breed,
          temperaments: formState.temperaments,
        },
      });

      if (mutationResponse) {
        alert("You have successfully Added a New Dog");
      }
    } catch (e) {
      console.error(e);
      setFormState({
        name: "",
        height: "",
        weight: "",
        yearOfBirth: "",
        size: "",
        gender: "",
        hypoallergenic: "",
        story: "",
        colors: "",
        temperaments: "",
      });
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="collapseContent">
        <MDBCol md="6">
          <form onSubmit={ handleFormSubmit }>
            <p className="h4 text-center mb-4">Add a Dog</p>
            <label className="grey-text">Dog name</label>
            <input
              name="name"
              type="name"
              id="breed"
              className="form-control"
              value={ formState.name }
              onChange={ handleChange }
              required="required"
            />

            <label className="grey-text">Height</label>
            <input
              type="height"
              name="height"
              value={ formState.height }
              onChange={ handleChange }
              className="form-control"
              required="required"
            />

            <label className="grey-text">Weight</label>
            <input
              type="weight"
              name="weight"
              value={ formState.weight }
              onChange={ handleChange }
              className="form-control"
              required="required"
            />

            <label className="grey-text">Year Of Birth</label>
            <input
              type="yearOfBirth"
              name="yearOfBirth"
              value={ formState.yearOfBirth }
              onChange={ handleChange }
              className="form-control"
              required="required"
            />

            <label className="grey-text">Size</label>
            <select
              className="browser-default custom-select"
              onChange={ handleChange }
              type="size"
              name="size"
              value={ formState.size }
              selected="selected"
            >
              <option value={ "Large" }>Large</option>
              <option value={ "Medium" }>Medium</option>
              <option value={ "Small" }>Small</option>
            </select>

            <label className="grey-text">Gender</label>
            <select
              className="browser-default custom-select"
              onChange={ handleChange }
              type="gender"
              name="gender"
              value={ formState.gender }
              selected="selected"
            >
              <option value={ "Male" }>Male</option>
              <option value={ "Female" }>Female</option>
            </select>

            <label className="grey-text">Hypoallergenic</label>
            <select
              className="browser-default custom-select"
              onChange={ handleChange }
              type="hypoallergenic"
              name="hypoallergenic"
              value={ formState.hypoallergenic }
              selected="selected"
            >
              <option value={ "true" }>True</option>
              <option value={ "false" }>False</option>
            </select>

            <label className="grey-text">Story</label>
            <textarea
              type="story"
              name="story"
              value={ formState.story }
              onChange={ handleChange }
              className="form-control"
              required="required"
              rows="7"
            />

            <label className="grey-text">Breed</label>
            <select
              className="browser-default custom-select"
              onChange={ handleChange }
              type="breed"
              name="breed"
              value={ formState.breed }
            >
              { breedsDataID.map((breedID) => {
                return (
                  <option key={ breedID._id } value={ breedID._id }>
                    {breedID.name }
                  </option>
                );
              }) }
            </select>

            <label className="grey-text">Colors</label>
            <select
              className="browser-default custom-select"
              onChange={ handleChange }
              type="colors"
              name="colors"
              value={ formState.colors }
            >
              { colorsData.map((color) => {
                return (
                  <option key={ color._id } value={ color._id }>
                    {color.name }
                  </option>
                );
              }) }
            </select>

            <label className="grey-text">Temperaments</label>
            <div className="label-wrapper temperaments">
              <ul>
                { temperamentsID.map((temperament) => {
                  return (
                    <li key={ temperament._id }>
                      <label htmlFor={ temperament.name }>
                        { temperament.name }
                      </label>
                      <input
                        type="checkbox"
                        key={ temperament._id }
                        id={ temperament._id }
                        name={ temperament.name }
                        value={ temperament._id }
                        onChange={ handleChange }
                      />
                    </li>
                  );
                }) }
              </ul>
            </div>

            <div className="text-center mt-4">
              <MDBBtn color="success" type="submit">
                Submit
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AddDog;
