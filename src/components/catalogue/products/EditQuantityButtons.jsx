import React from 'react';
import styled from '@emotion/styled';

const StyledEditQuantityButtons = styled.div`
    display:grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(3,1fr);
    background-color: #E9ECEF;
    border-radius:1000vmax;

    & > p{
        place-self: center;
        font-size: var(--20px);
        font-weight: 600;
    }

    & > .btn--edit{
        cursor: pointer;
        border-style: none;
        background-color:#212529;
        color: whitesmoke;
        box-shadow: var(--shadow-elevation-medium);
    }

    & .remove{
        border-top-left-radius: 1000vmax;
        border-bottom-left-radius: 1000vmax;
    }
    & .add{
        border-top-right-radius: 1000vmax;
        border-bottom-right-radius: 1000vmax;
    }
`;


const EditQuantityButtons = ({ onAdd, onReduce, unitsInCart }) => {
    return (
        <StyledEditQuantityButtons>
            <button onClick={onReduce} className='btn--edit remove' aria-label='remove one unit'>-</button>
            <p>{unitsInCart}</p>
            <button className='btn--edit add' onClick={onAdd} aria-label='add one more unit'>+</button>
        </StyledEditQuantityButtons>
    )
}

export default EditQuantityButtons