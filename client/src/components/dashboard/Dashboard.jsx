import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile"
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom'
import DashboardAction from './DashboardAction'
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, auth:{user}, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    if (loading && profile === null) {
        return (
            <Spinner></Spinner>

        )
    }
    else
        return (
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>Welcome {user && user.name}
                </p>
                {profile !==null ?<Fragment><DashboardAction></DashboardAction>
                <Experience ></Experience>
                <Education></Education>
                </Fragment> :<Fragment><p>You dont have profile, please create one :D</p>
                <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
                </Fragment>}
            </Fragment>
        )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)