import React, {useEffect,useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Screams from '../components/screams/Screams';
import Profile from '../components/profile/Profile';
import StatProfile from '../components/profile/staticProfile';

import Proptypes from 'prop-types';

//redux
import {connect} from 'react-redux';
import {getScreams, getUsersScreams} from '../redux/actions/dataActions';

const Home = (props) => {
    const {data :{loading,screams},getScreams, getUsersScreams, personal,user} = props;
    const [monkey, setMonkey] = useState('');
    useEffect (()=> {

        if (!personal) {
            getScreams();
        } else {
            (async () => {  
                const data = await getUsersScreams(personal);
                setMonkey(data);
            })()    
        }
         
    },[personal])


    let loadedScreams = !loading ? screams.map(scream =>  <Screams key={scream.screamId} scream={scream}/> ):'loading...';
    let renderProfile = !personal || user === personal? <Profile/> : <StatProfile credentials={monkey}/>;
    return (
        
        <Grid container spacing={3}> 
            <Grid item sm={8} xs={12}>
              {loadedScreams}
            </Grid>
            <Grid item sm={4} xs={12}>
                {renderProfile}
            </Grid>
        </Grid>
    )
}

Home.prototypes = {
    data: Proptypes.object.isRequired,
    user: Proptypes.string.isRequired,
    getScreams : Proptypes.func.isRequired
}

const mapStateToProps = (store) => ({
    data: store.data,
    user: store.user.credentials.handle
})

const mapActionsToProps = {
    getScreams,
    getUsersScreams
}


export default connect(mapStateToProps, mapActionsToProps)(Home);
