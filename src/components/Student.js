import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const paperStyle = {
  padding: "50px 20px",
  width: "500px",
  margin: "20px auto",
};



export default function Student() 
{
    const [name, setName] = useState('');  
    const [address, setAddress] = useState('');
    const[students, setStudents] = useState([])

    const handleClick =(e)  => {
      e.preventDefault()
      const student = {name, address}
      console.log(student)
      fetch("http://localhost:8080/student/add",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      }).then(()=>{
        console.log("New student added")     
      })
    }

    useEffect(()=>{
      fetch("http://localhost:8080/student/getAll")
      .then(res=>res.json())
      .then((result)=>{
        setStudents(result);
      }
    )
    },[])

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& > :not(style)": { m: 2 }, 
      }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>
          <TextField id="student-name" label="Student Name" variant="outlined" fullWidth margin="normal"
           value={name} onChange={(e)=>setName(e.target.value)}
          />
          <TextField id="student-address" label="Student Address" variant="outlined" fullWidth margin="normal" 
           value={address} onChange={(e)=>setAddress(e.target.value)}
          />
        <Button variant="contained" color="success" onClick={handleClick}>
        Submit
      </Button>
        </Paper>
        <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </Paper>
      ))
}


    </Paper>

      </Container>
    </Box>
    
  );
}
