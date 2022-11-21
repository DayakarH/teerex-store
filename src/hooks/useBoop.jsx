import React, { useState } from 'react';
import styled from '@emotion/styled';

const StyledBoop = styled.span`
    display: 'inline-block';
    backface-visibility: 'hidden';
    transform: ${props => props.isBooped
        ? `rotate(${rotation}deg)`
        : `rotate(0deg)`};
    transition: transform ${props => `${props.timing} ms`}
`;

const Boop = ({ rotation = 0, timing = 150, children }) => {
    const [isBooped, setIsBooped] = useState(false);
    React.useEffect(() => {
        if (!isBooped) {
            return;
        }
        const timeoutId = window.setTimeout(() => {
            setIsBooped(false);
        }, timing);
        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [isBooped, timing]);
    const trigger = () => {
        setIsBooped(true);
    };
    return (
        <StyledBoop onMouseEnter={trigger}>
            {children}
        </StyledBoop>
    );
};

export default Boop;