import styled from 'styled-components';

export const NavBarStyle = styled.div `
    display: flex,
    flex-direction: column;
    align-items:center;
    
    .menu-item {
        padding: 0 40px;
        margin: 5px 10px;
        user-select: none;
        cursor: pointer;
        border: none;
    }
    .menu-item-wrapper.active {
        border: none;
        font-weight: bolder;
    }
    menu-itme.active {
    }
`;