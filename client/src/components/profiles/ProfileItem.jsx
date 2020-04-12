import React from 'react'
import {Link} from 'react-router-dom'

const ProfileItem = ({ profile: {
    user: {_id, name, avatar },
    user,
    status,
    company,
    location,
    skills
} }) => {

    console.log(user)
    return (
        <div class="profile bg-light">
            <img
                class="round-img"
                src={avatar}
                alt=""
            />
            <div>
                <h2>{name}</h2>
                <p>{status} at {company}</p>
                <p>{location}</p>
                <Link to={`/profile/${_id}`} class="btn btn-primary">View Profile</Link>
            </div>

            <ul>
                {skills.map(skill => {
                    return (
                        <li class="text-primary">
                            <i class="fas fa-check"></i>{' '}{skill}
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}
export default ProfileItem