import React from 'react';
import styled from '@emotion/styled';

const StyledLoadingSpinner = styled.div`
    width:50px;
    height:50px;
    border-radius:50%;
    border-left: 2px solid var(--color-site-secondary);
    animation: loading 500ms linear;

    @keyframes loading{
        to{
            rotate:360deg;
        }
    }
`;

const LoadingSpinner = () => {
    return (
        <StyledLoadingSpinner />
    )
}

export default LoadingSpinner