import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.button``;

const Button = ({ label, onClick }) => {
    return (
        <StyledButton>{label}</StyledButton>
    )
}

export default Button