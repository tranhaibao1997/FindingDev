import React from 'react'

const ProfileItem = ({ profile:{
    user:{name,avatar},
    status,
    company,
    location,
    skills
} }) => {

    
    return (
        <div class="profile bg-light">
            <img
                class="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
            />
            <div>
                <h2>{name}</h2>
                <p>{status} at {company}</p>
                <p>{location}</p>
                <a href="profile.html" class="btn btn-primary">View Profile</a>
            </div>

            <ul>
                <li class="text-primary">
                    <i class="fas fa-check"></i> HTML
          </li>
                <li class="text-primary">
                    <i class="fas fa-check"></i> CSS
          </li>
                <li class="text-primary">
                    <i class="fas fa-check"></i> JavaScript
          </li>
            </ul>
        </div>
    )
}
export default ProfileItem