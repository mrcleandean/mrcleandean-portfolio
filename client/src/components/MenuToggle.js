import * as React from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { IconContext } from "react-icons";

export const MenuToggle = ({ toggle }) => (
    <button onClick={toggle} className="flex justify-center items-center">
        <IconContext.Provider value={{ size: '2em', className: 'mt-3'}}>
            <AiOutlineMenu />
        </IconContext.Provider>
    </button>
);