import React, { useEffect, useState } from "react";
import { CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { CardHeader } from '@material-ui/core';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  background:{
    backgroundImage:
    'url(' +
    'https://images.pexels.com/photos/1059979/pexels-photo-1059979.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' +
    ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '650px',
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
}
});

const api = {
  key: '101f1b46225663e7afc7a5e454fb0369',
  base: 'https://api.openweathermap.org/data/2.5'
};

export default function App() {
  const classes = useStyles();

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
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
      .then(history.push('/todolist'));
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
  const refresh = () => {
    window.location.reload();
  }



  const Weather = ({weatherData}) => (
  <Grid className={classes.background}> 
  <div style={{padding:'100px', paddingLeft:'300px'}}> 
  <Typography variant="h1" style={{paddingLeft:'10px', color:'#FFFFFF' }}>Welome</Typography>
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

