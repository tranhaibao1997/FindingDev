import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {

    useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles])

return <Fragment>{loading || profiles===null ? <Spinner></Spinner> :<Fragment>
    <h1 className="large text-primary">Developers</h1>
    <p className="lead">
        <i className="fab fa-connectdevelop"></i>Find and connect with developers
    </p>
    {
        profiles.map(profile =>{return(
            <ProfileItem profile={profile} key={profile._id}></ProfileItem>
        )})
    }
    </Fragment>}</Fragment>
}

const mapStateToProps = (state) => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getAllProfiles })(Profiles)