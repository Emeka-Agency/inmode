import React from "react";
import { useWindowSize } from "../../functions/window-size";
import { InmodePanel_Addon_Interface, InmodePanel_TagFamily_Interface } from "../interfaces";

const WorkstationMenu = ({
    tag_families,
    technologies,
    allResolve,
    resolveClick,
    checkbox_resolve_checked_selector,
    resolve_technology
}:WorkstationMenu) => {

    const size = useWindowSize();

    const resolveClickMenu = (e:React.MouseEvent) => {
        if(size.width <= 425) {
            if(e.currentTarget.classList.contains('opened')) {
                Array.from(document.querySelectorAll('.workstation.menu-title.menu-text')).forEach(function(elem) {
                    elem.classList.remove('opened');
                })
                e.currentTarget.classList.remove("opened");
            }
            else {
                Array.from(document.querySelectorAll('.workstation.menu-title.menu-text')).forEach(function(elem) {
                    elem.classList.remove('opened');
                })
                e.currentTarget.classList.add("opened");
            }
        }
        return;
    }

    return (
        <>
            {tag_families.map((tag, key) => {
                return (
                    <ul
                        key={key}
                        className="workstation menu-title menu-text transition"
                        onClick={(e) => {resolveClickMenu(e);}}
                    >
                        <span
                            className="menu-title menu-text"
                        >
                            {tag.FamilyName}
                        </span>
                        <ul className="dropdown-menu custom-scrollbar moz-scrollbar">
                            <div className="selection transition">
                            <input
                                id={`${key}-all`}
                                type="checkbox"
                                onClick={(e) => {allResolve(e);}}
                                value="cure-choice"
                                className="cure-choice-all"
                                defaultChecked={true}
                            />
                            <label htmlFor={`${key}-all`}>Tout afficher</label>
                            </div>
                            {tag.tags && tag.tags.map((sub_tag, key_sub) => {
                                return (
                                <div key={key_sub} className="selection transition">
                                    <input
                                    id={`${key}-${key_sub}`}
                                    type="checkbox"
                                    key={key}
                                    onClick={(e) => {resolveClick(e);}}
                                    value={sub_tag.tag}
                                    className={`${checkbox_resolve_checked_selector} cure-choice`}
                                    />
                                    <label htmlFor={`${key}-${key_sub}`}>{sub_tag.tag}</label>
                                </div>
                                );
                            })}
                        </ul>
                    </ul>
                );
            })}
            <ul
                className="workstation menu-title menu-text transition"
                onClick={(e) => {resolveClickMenu(e);}}
            >
                <span
                    className="menu-title menu-text"
                >
                    technologies
                </span>
                <ul className="dropdown-menu custom-scrollbar moz-scrollbar">
                    {technologies.map((techno, key) => {
                        return (
                            <div key={key} className="selection transition">
                            <input
                                id={`tech-${key}`}
                                type="checkbox"
                                key={key}
                                className={`tech-choice`}
                                onClick={(e) => resolve_technology(e)}
                                value={techno.Name}
                            />
                            <label htmlFor={`tech-${key}`}>{techno.Name}</label>
                            </div>
                        );
                    })}
                </ul>
            </ul>
        </>
    );
};

interface WorkstationMenu {
    tag_families: InmodePanel_TagFamily_Interface[];
    technologies: InmodePanel_Addon_Interface[];
    allResolve: Function;
    resolveClick: Function;
    checkbox_resolve_checked_selector: string;
    resolve_technology: Function;
};

export default WorkstationMenu;