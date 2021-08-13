import React, { useEffect, useState } from "react";
import { CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { CardHeader } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  List
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
//Firebase imports
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase';

//Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCQ37DGD-3B3gqZXOJ1nkZF1UPPcRU0hBw",
  authDomain: "weatherapplication-1de1f.firebaseapp.com",
  projectId: "weatherapplication-1de1f",
  storageBucket: "weatherapplication-1de1f.appspot.com",
  messagingSenderId: "239310805065",
  appId: "1:239310805065:web:abf7d1cd49f22fc0ac8798",
  measurementId: "G-H10VZ2YW34"
};

//Firebase initialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  background:{
    backgroundImage:
    'url(' +
    'https://images.pexels.com/photos/1059979/pexels-photo-1059979.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' +
    ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '650px',
    width: '1400px',
    position: 'fixed'
  },
  day: {
    padding: '15px',
    color: 'whitesmoke',
    fontFamily: 'Recursive sans-serif',
    fontSize: '24px',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'space-between'
},
temp: {
    padding: '15px',
    color: 'whitesmoke',
    fontFamily: 'Recursive sans-serif',
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'space-between'
},
top: {
  height: '60px',
  backgroundColor: '#424242',
  color: 'whitesmoke',
  padding: '10px',
  borderRadius: '20px 20px 0 0',
  fontFamily: 'Recursive sans-serif',
  display: 'flex',
  justifyContent: 'space-between',
}, 
flex: {
  display: 'flex',
  justifyContent: 'space-between'
},
sunriseSunset: {
  padding: '15px',
  color: 'whitesmoke',
  fontFamily: 'Recursive sans-serif',
  fontSize: '16px'
},
description: {
  padding: '15px',
  color: 'whitesmoke',
  fontFamily: 'Recursive sans-serif',
  fontSize: '24px',
  fontWeight: '600'
},
button: {
  width: '35px',
  height: '35px'
},
signupButton: {
  margin: theme.spacing(1)
},
}));

const api = {
  key: '101f1b46225663e7afc7a5e454fb0369',
  base: 'https://api.openweathermap.org/data/2.5'
};

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/displayweather">
          <DisplayWeather />
        </Route>

        <Route exact path="/">
          <Signup />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

//============================================ Signup Function ==================================
function Signup() {
  const classes = useStyles();

  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleSignUp = e => {
    clearErrors();
    e.preventDefault();
    if (password !== confirmPassword || password === '') {
      return setPasswordError('Passwords do not match/password not entered');
    } else if (email === '') {
      return setEmailError('Email is required');
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
        }
      })
      .then(history.push('/displayweather'));
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <Grid container spacing={0} style={{ position: 'fixed',}} align="center">
      <div style={{ position: 'fixed',background: 'linear-gradient(110deg, #74ABDD 60%, #498DCB 60%)',
    backgroundSize: 'cover',height: '650px',width: '1300px',}}>
        <Grid style={{paddingTop:'100px', width:'400px', height:'400px'}}>
        <h2 style={{ overflow: 'visible', whiteSpace: 'pre', fontSize: '46px', letterSpacing: '-2px', color: '#333', lineHeight: '1.1',fontWeight: 700, fontStyle: 'normal', fontFamily: 'Arvo, serif', margin: 0 }}>
                Create An Account
        </h2>

        <Typography variant="caption">
                Please fill up all fields in this form
        </Typography>
        <form>
          <TextField  margin="normal" required fullWidth id="nm" placeholder="Enter Your Name" name="name" padding={44} radius={8} value={name} label="Name:" onChange={e => setName(e.target.value)} autoFocus />

          <TextField  margin="normal" required fullWidth id="email"  radius={8} label="Email Address:" value={email} onChange={e => setEmail(e.target.value)} />
                <p className="errorMsg">{emailError}</p>

          <TextField margin="normal" required fullWidth name="password" type="password" placeholder="Create Password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                

          <TextField margin="normal" required fullWidth name="password" placeholder="Confirm Password" type="password" id="password" onChange={e => setConfirmPassword(e.target.value)}/>
          <p className="errorMsg">{PasswordError}</p>
          <FormControlLabel control={ <Checkbox name="checkedB" color="primary" fullWidth variant="contained"/> } label="Accept Terms & Conditions" />
          <Button type="submit" color="primary" variant="contained" className={classes.signupButton}   startIcon={<ExitToAppRoundedIcon />} fullWidth onClick={handleSignUp} >
          SIGN UP
          </Button>
        </form>
        <Grid container>
                <Grid item xs>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {'Already have an account? Sign in'}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
//================================================== Login Function =====================================
function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState('');

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = e => {
    clearErrors();
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;
        history.push('/displayweather');
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
        }
      });
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        clearInputs();
        setUser('');
      } else {
        setUser(user);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <Grid container spacing={0}  align="center">
      <div style={{ position: 'fixed',background: 'linear-gradient(110deg, #74ABDD 60%, #498DCB 60%)',
    backgroundSize: 'cover',height: '650px',width: '1300px',}}>
        <Grid style={{paddingTop:'100px', width:'400px', height:'400px'}}>
        <h2 style={{ overflow: 'visible', whiteSpace: 'pre', fontSize: '46px', letterSpacing: '-2px', color: '#333', lineHeight: '1.1',fontWeight: 700, fontStyle: 'normal', fontFamily: 'Arvo, serif', margin: 0 }}>
        Welcome Back
        </h2>

        <Typography variant="caption">
                Please fill up all fields in this form
        </Typography>
        <form>
          <TextField  margin="normal" required fullWidth id="email"  radius={8} label="Email Address:" value={email} onChange={e => setEmail(e.target.value)} autoFocus/>
          <p className="errorMsg">{emailError}</p>

          <TextField margin="normal" required fullWidth name="password" type="password" placeholder="Create Password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          <p className="errorMsg">{PasswordError}</p>

          <FormControlLabel control={ <Checkbox name="remember" color="primary" fullWidth variant="contained" /> } label="remember me" />

          <Button type="submit" color="primary" variant="contained" className={classes.signupButton} startIcon={<ExitToAppRoundedIcon />} fullWidth onClick={handleLogin} >SIGN IN</Button>
        </form>
         <Grid container>
           <Grid item xs>
            <Link href="#" variant="body2">
             Forgot password?
           </Link>
           </Grid>
           <Grid item>
            <Link to="/" variant="body2">
             {"Don't have an account? Sign Up"}
            </Link>
           </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

//=========================== Weather ==================================
function DisplayWeather(){
  const classes = useStyles();

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  
  const refresh = () => {
    window.location.reload();
  }

  const history = useHistory();
  const handleLogout = e => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(userCredential => {
        // Signed in
        var user = null;
        history.push('/');
      });
  };

  const Weather = ({weatherData}) => (
  <Grid className={classes.background}> 
  <div style={{padding:'20px', align:'right'}}>
  <Button  style={{fill:'red',radius:'20px', color:'red'}} variant="contained" onClick={handleLogout}>Logout</Button>
  </div>
  <div style={{padding:'90px', paddingLeft:'300px'}}> 
  <Typography variant="h2" style={{padding:'10px', color:'#FFFFFF'}}>Current Conditions: </Typography>
    <Card variant="outlined" style={{width: '700px', borderRadius: '15px', backgroundColor: '#496c91',}}>
      <CardContent >
      <CardHeader title={weatherData.name} style={{backgroundColor: '#4d9e91',color: 'whitesmoke',padding: '10px',fontSize: '28px',borderRadius: '15px',fontFamily: 'Recursive sans-serif'}}
      action ={<IconButton aria-label="Refresh"><RefreshRoundedIcon className={classes.button} onClick={refresh} /> </IconButton>} />
 
      <div className={classes.flex}>
        <p className={classes.day}>{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <p className={classes.description}>{weatherData.weather[0].main}</p>
      </div>

      <div className={classes.flex}>
        <p className={classes.temp}>Temprature: {weatherData.main.temp} &deg;C</p>
        <p className={classes.temp}>Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className={classes.flex}>
        <p className={classes.sunriseSunset}>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className={classes.sunriseSunset}>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
      </div>

      </CardContent>
    </Card>
    </div>
    </Grid>
  )

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${api.base}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])
  
  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div></div>
      )}
      
    </div>
  );
}