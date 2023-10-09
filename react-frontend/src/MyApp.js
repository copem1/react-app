import React, {useState, useEffect} from "react";
import axios from 'axios';

import Table from "./Table";
import Form from './Form';

// post does not update immediately, need to refresh page after submitting for on react
// delete by ID does not work frontend, only backend -- should work properly now
// are the response forms correct

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  // async function deleteUserByID(){
  //   try {
  //      const response = await axios.delete('http://localhost:8000/users/${id}');
  //      return response.data.users_list;     
  //   }
  //   catch (error){
  //      //We're not handling errors. Just logging into the console.
  //      console.log(error); 
  //      return false;         
  //   }
  // }

  async function removeOneCharacter (index) {
    const userID = characters[index].id;
    const response = axios.delete('http://localhost:8000/users/' + userID);
    if (response && response.status === 204) {
        console.log('Successful Delete Request.'); 
    }

    const updated = characters.filter((character, i) => {
        return i !== index
    });
    setCharacters(updated);
  }


  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 200)
       setCharacters([...characters, person] );
    });
 }
  
    return (
      <div className="container">
        <Table characterData={characters}
              removeCharacter={removeOneCharacter} />
        <Form handleSubmit = {updateList} />
      </div>
    )
}

export default MyApp;