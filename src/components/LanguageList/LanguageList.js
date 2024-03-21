import React, { useEffect, useRef, useState } from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { LangBtn, LangContainer, LangIcon, LangItem, LangList, LangValue } from './LanguageList.styled';
import Flags from "country-flag-icons/react/3x2";
import { hasFlag } from 'country-flag-icons'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const languages = [
    {
      code: 'fr',
      name: 'Français',
      country_code: 'FR',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'GB',
    },
    {
      code: 'de',
      name: 'Deutsch',
      country_code: 'DE',
    },
    {
      code: 'it',
      name: 'Italiano',
      country_code: 'IT'
    },
    {
        code: 'es',
        name: 'Español',
        country_code: 'ES'
      }
]
  
function LanguageList(props) {
    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const divRef = useRef();

    const clickOutSideHandler = e => {
        if(divRef.current.contains(e.target)) {
            // inside the div
            return
        }
        // outside click
        setOpen(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutSideHandler);

        return () => {
            document.removeEventListener("mousedown", clickOutSideHandler);
        }
    }, [])

    
    const handleClick = (lang) => {
        i18n.changeLanguage(lang);
        // document.location.reload()
        setOpen(false);
    }
    const generateFlag = (code) => {
        if(hasFlag(code)) {
            const Flag = Flags[code];
            return (<Flag size={20} />)
        }
        return null
    }

    return (
        <>
            <LangContainer ref={divRef}>
                <LangBtn type="button" onClick={() => setOpen(prevState => !prevState)} >
                    <LanguageIcon />
                    <ArrowDropDownIcon />
                </LangBtn>
                {
                    open && (
                        <LangList>
                            {
                                languages.map(({ code, name, country_code }) => (
                                    <LangItem 
                                        disabled={currentLanguageCode === code}
                                        key={code}
                                        onClick={() => handleClick(code)}
                                    >
                                        <LangIcon >
                                            {generateFlag(country_code)}
                                        </LangIcon>
                                        <LangValue>
                                            {name}
                                        </LangValue>
                                    </LangItem>
                                ))
                            }
                        </LangList>
                    )
                }
            </LangContainer>
        </>
    )
}

export default LanguageList
