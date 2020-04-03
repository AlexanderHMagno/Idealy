import React, {useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Screams from '../components/screams/Screams';
import Profile from '../components/profile/Profile';

import Proptypes from 'prop-types';

//redux
import {connect} from 'react-redux';
import {getScreams} from '../redux/actions/dataActions';

const Home = (props) => {
    const {data :{loading,screams},getScreams} = props;
    useEffect (()=> {
         getScreams();
    },[])

    let loadedScreams = !loading ? screams.map(scream => <Screams key={scream.screamId} scream={scream}/> ):'loading...';
    return (
        
        <Grid container spacing={3}> 
            <Grid item sm={8} xs={12}>
              {loadedScreams}
            </Grid>
            <Grid item sm={4} xs={12}>
            <Profile/>
            </Grid>
        </Grid>
    )
}

Home.prototypes = {
    data: Proptypes.object.isRequired,
    getScreams : Proptypes.func.isRequired
}

const mapStateToProps = (store) => ({
    data: store.data
})

const mapActionsToProps = {
    getScreams
}


export default connect(mapStateToProps, mapActionsToProps)(Home);
