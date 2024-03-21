import React, { useEffect, useRef, useState } from 'react'
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EFContainer, EFContent, EFIcon, EFItem } from './EntityFilter.styled';

function EventsFilter({icon,filter,closeModal,  updateFilter}) {
    const [showDropdown, setShowDropdown] = useState(false)
    const divRef = useRef();
    //console.log(closeModal)
    const clickOutSideHandler = e => {
        if(divRef.current.contains(e.target)) {
            // inside the div
            return
        }
        // outside click
        setShowDropdown(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutSideHandler);

        return () => {
            document.removeEventListener("mousedown", clickOutSideHandler);
        }
    }, [])

    const itemClickHandler = (item) => {
        updateFilter(item);
        setShowDropdown(false);
    }

    return (
        <EFContainer ref={divRef}>
            <EFIcon onClick={() => setShowDropdown(!showDropdown)}>
                <MoreHorizIcon />
            </EFIcon>
            <EFContent style={{display: showDropdown ? "flex" : "none"}}>
                <EFItem active={filter === "entity" || filter === null } onClick={() => itemClickHandler('entity')} >
                    <span>Entité</span>
                    {
                        filter === "entity" || filter === null ?
                            <ToggleOnIcon />
                        :
                            <ToggleOffIcon />
                    }
                </EFItem>
                <EFItem active={filter === "invoice" || filter === null } onClick={() => itemClickHandler('invoice')}>
                    <span>Facture</span>
                    {
                        filter === "invoice" || filter === null ?
                            <ToggleOnIcon />
                        :
                            <ToggleOffIcon />
                    }
                </EFItem>
            </EFContent>
        </EFContainer>
    )
}

export default EventsFilter
