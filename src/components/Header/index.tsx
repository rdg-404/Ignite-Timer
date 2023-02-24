import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";
import logoIgnite from '../../assets/logo-ignite.svg'

export function Header () {
    return (
        <HeaderContainer>
            <span>
                <img src={logoIgnite} alt="" />
            </span>
            <nav>
                <NavLink to="/" title="Relógio">
                    <Timer size={24}/>
                </NavLink>
                <NavLink to={"/history"} title="Histórico">
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}