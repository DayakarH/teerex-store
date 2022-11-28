import React from 'react';
import styled from '@emotion/styled';

const StyledNotification = styled.p`
    position:absolute;
    z-index:-1;
    bottom:0;
    background-color:#333;
    color: #fff;
    border-radius:25px;
    padding: .5em 1em;
    animation:
    var(--animation-reveal-top) 250ms ease-out forwards,
    var(--animation-hide-top) 250ms ease-in 3s forwards
`;


const Notification = ({ msg }) => {
    return ((
        <StyledNotification hasMsg={msg.length > 0 ? true : false}> {msg}
        </StyledNotification>)
    )
}

export default Notification