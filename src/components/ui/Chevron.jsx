import chevron from '@assets/chevron.svg';
import styled from '@emotion/styled';

const StyledChevron = styled.img`

   transition: all 300ms ease-in-out;
    transform: ${(p) => p.direction === "top" && "rotate(-180deg)"};

    transform: ${(p) => p.direction === "bottom" && "rotate(0deg)"};
`

const Chevron = props => {
    return (
        <StyledChevron src={chevron} alt={props.isFilterExpanded ? 'collapse' : 'expand'} direction={props.isFilterExpanded ? 'top' : 'bottom'} />
    )
}

export default Chevron