import express from 'express';
import flights from './data/flights.js';
import {Users} from './users.js'
import bcrypt from 'bcrypt'

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

console.log(Users[0].password)

app.get('/api/flights', (req, res) => {
  res.json(flights);
});

app.get('/api/flights/:id', (req, res) => {
  const flight = flights.find((flight) => flight.id === req.params.id);
  if (!flight) return res.status(404).json({ message: 'Flight not found.' });
  res.json(flight);
});

app.post('/signup',(req,res)=>{
  const data = req.body
  console.log(data)
  res.json(data)
})

app.post('/login',async (req,res)=>{
  const {email,password} = req.body

  const user = Users.find(obj=>obj.email == email)

  if(!user){
    res.status(401).json({
      message:"User is not registered"
    })
  }

   const match = await bcrypt.compare(password, user.password)

   if(!match){
    res.status(404).json({
      message:"Password is incorrect"
    })
   }
   
   else{
    res.status(201).json({
      message:"User successfully logged in",
      user: user.email
    })
   }

  })

app.get('/',(req,res)=>{
  res.send({message:"Abdul"})
})
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));

app.listen(PORT, () => console.log(`Flight API running on http://localhost:${PORT}`));

