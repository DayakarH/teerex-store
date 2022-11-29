import React from 'react';
import logo from '@assets/logo.svg';
import Cart from "@components/cart/Cart";
import styled from '@emotion/styled';

const StyledHeader = styled.header`
    background-color: var(--color-site-secondary);
    margin-block-end: 2rem;
    position:sticky;
    top:0;
    z-index:1;
    padding-block: .8em;

    & .container{
    display: flex;
    justify-content: space-between;
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <div className="container">
                <a href='/'>
                    <img src={logo} alt="teerex logo" />
                </a>
                <Cart />
            </div>
        </StyledHeader>
    )
}

export default Header