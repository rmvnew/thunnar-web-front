
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


export const SidebarLink = styled(NavLink)`
    display: flex;
    color: #FFF;
    gap: 10px;
    padding: 5px 10px;
    transition: 0.2s cubic-bezier(0.6, -0.28,0.735,0.045);
    &:hover{
        border-right: 4px solid white;
        transition: 0.2s cubic-bezier(0.6, -0.28,0.735,0.045);
        color: #FFF;
        font-weight: bold;
        background: rgb(68, 113, 134);
    }

   

    
`