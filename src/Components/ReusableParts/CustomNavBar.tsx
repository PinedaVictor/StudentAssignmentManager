import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {NavBarStyle} from './CustomNavBar.style';

const NavBarItems = (list: string[], selected: any) => 
    list.map(element => {
        const name = element;

        return (
            <div key={name} className={`menu-item ${selected ? 'active' : ''}`}>
                {element}
            </div>);
    });

type Props = {
    list: string[];
    selected: string;
    onSelect?: any;
};

const CustomNavBar: React.FC<Props> = ({list, selected, onSelect}) => (
    // TODO: need to add styles
    <NavBarStyle>
        <ScrollMenu 
            data={NavBarItems(list, selected)}
            arrowLeft={<div className='arrow-prev'>&lt;</div>}
            arrowRight={<div className='arrow-next'>&gt;</div>}
            selected={selected}
            onSelect={onSelect}
            hideSingleArrow={true}
            hideArrows={true}
            alignOnResize={true}
        />
    </NavBarStyle>
)

export default CustomNavBar;