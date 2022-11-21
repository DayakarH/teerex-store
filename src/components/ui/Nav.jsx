import React from 'react';
import styled from '@emotion/styled';

const StyledNav = styled.nav`
        width:60%;

    & ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
    }
`;

const Nav = () => {
    return (
        <StyledNav>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Contact Us</li>
            </ul>
        </StyledNav>
    )
}

export default Nav