import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse } from 'react-bootstrap';


function App() {
  const [data, setData] = useState();
  const [nameSearch, setNameSearch] = useState("");
  const [open, setOpen] = React.useState({});

  function handleClick(lastName) {
    setOpen((prevState => ({...prevState, [lastName]: !prevState[lastName]})))
  }
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students")
    .then((response) => response.json())
    .then((data) => setData(data));
  })


  let students = data?.students;

  return (
    <body className="Background">
      <div className="d-flex flex-column justify-content-center" >

        <div className="App">
          <div className="form-outline">
            <br></br>
            <input type="text" id="typeText" className="form-control border-0" placeholder="Search by name" onChange={event => setNameSearch(event.target.value)} />
          </div>
          {students?.filter(post =>{
            if (nameSearch === '') {
              return post;
            } else if (post.firstName.toLowerCase().includes(nameSearch.toLowerCase()) || post.lastName.toLowerCase().includes(nameSearch.toLowerCase())) {
              return post;
            }
          }).map((x, i) => {
            return <>
              <div className="d-flex flex-row">
                <div className="d-flex p-2 w-25">
                  <img src={x.pic} className="rounded-circle img-thumbnail" alt='pict'/>
                </div>

                <div  className="d-flex flex-column">
                <div className="d-flex flex-row">
                  <h1 key={i}>{x.firstName + ' ' + x.lastName}</h1>
                  <button onClick={() => handleClick(x.lastName)}><img src=''/></button>
                </div>

                  <p>{'Email: ' + x.email} </p>
                  <p>{'company: ' + x.company} </p>
                  <p>{'Skill: ' + x.skill} </p>
                  <p>{'Average: ' + (x.grades.map(Number).reduce((a, b) => a + b, 0) / x.grades.length) + '%'} </p>
                  <Collapse in={open[x.lastName]}>
                    <div  id="example-collapse-text" className="collapsedText">
                      {x.grades.map((y, j) => {
                        return <>
                          <ul>
                            Test {j+1}: {y}%
                          </ul>
                        </>
                      })}
                    </div>
                  </Collapse>
                </div>

              </div>
              <hr className="my-4"/>
              </>
            })}
        </div>
    </div>
    </body>
  );
}

export default App;
