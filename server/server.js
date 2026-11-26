import express from 'express';
import flights from './data/flights.js';
import {Users} from './users.js'
import bcrypt from 'bcrypt'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors({origin:"http://localhost:5173"}))

console.log(Users[0].password)

app.get('/api/flights', (req, res) => {
  res.json(flights);
});

app.get('/api/flights/:id', (req, res) => {
  const flight = flights.find((flight) => flight.id === req.params.id);
  if (!flight) return res.status(404).json({ message: 'Flight not found.' });
  res.json(flight);
});

app.post('/signup',async (req,res)=>{
  const {name, email, password} = req.body

  let user = Users.find(obj => obj.email == email)
  if(user !== undefined)
  return res.json({message : "Email already registered"})

  let hashedPass = await bcrypt.hash(password, 10)

  Users.push({name, email, password:hashedPass})

  return res.status(201).json({message : `User with name ${name} is successfully registered`})
  
})

app.post('/login',async (req,res)=>{
  const {email,password} = req.body

  const user = Users.find(obj=>obj.email == email)

  if(!user){
    return res.status(401).json({
      message:"User is not registered"
    })
  }

   const match = await bcrypt.compare(password, user.password)

   if(match == false){
    res.status(404).json({
      message:"Password is incorrect"
    })
   }
   
   else{
    const token = crypto.randomUUID()

    user.token = token
    
    res.status(201).json({
      user:email,
      message:"User successfully logged in",
      token : token
    })
   }

  })

app.get('/users',(req,res)=>{
  res.send(Users)
})
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));

app.listen(PORT, () => console.log(`Flight API running on http://localhost:${PORT}`));

