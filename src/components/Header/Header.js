import React, {useEffect, useMemo, useState,useContext} from 'react';

import { HeaderContainer, HeaderLinks, HLang, Hlink, HTheme } from './Header.styled';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import LanguageList from '../LanguageList/LanguageList';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Axios from "../../axios-proas";
import LoopIcon from '@mui/icons-material/Loop';

import { CTooltip } from '../../components/UI/CTooltip/CTooltip';
import { getNotyfObject } from '../../shared/utility';

function Header(props) {
    const {logout, login, setAppTheme, currentTheme} = props;
    const {t} = useTranslation();
    let notyf = getNotyfObject();
   
    const [showResetScriptModal, setShowResetScriptModal] = useState(false)
    const toggleTheme = () => {
        if(currentTheme === 'light') {
            setAppTheme('dark');
        } else {
            setAppTheme('light');
        }
    }

    const resetScript = () => {
        if(login == "admin@global.com"){
            Axios.get("/user//resetscript")
                .then((response) => {
                  notyf.success("Script à jour");
                })
            .catch((err) => {
                notyf.error("Une erreur s'est produite");
            });
        }
    }

    const changeIngramInvoicesStatus = () => {
        if(login == "admin@ingram.com"){
            Axios.get("/invoice//updateInvoicesStatus")
                .then((response) => {
                  //notyf.success("Statut modifié");
                })
            .catch((err) => {
                notyf.error("Une erreur s'est produite");
            });
        }
    }

  return (
    <>
        <HeaderContainer>
            <HeaderLinks>
                <Hlink to="#" >
                    <PeopleOutlineIcon 
                        style={{fontSize: "0.8rem"}}
                    />
                    <span>{login}</span>
                </Hlink>
                <Hlink to="/editPassword" >
                    <LockIcon 
                        style={{fontSize: "0.8rem"}}
                    />
                    <span>{t("global:changePwd")}</span>
                </Hlink>
                
                <Hlink 
                    to={{pathname: "/"}}
                    lcolor={"#EE5A5A"}
                    onClick={() => {logout()}}
                >
                    <LogoutIcon 
                        style={{fontSize: "0.8rem"}}

                    />
                    <span>{t("global:logout")}</span>
                </Hlink>
                {
                    login == "admin@global.com" &&
                    <div style={{color: "#2174B9",cursor: "pointer"}}>
                        <CTooltip title={t("Reset DEMO")}>
                            <LoopIcon onClick={() => resetScript()}/>
                        </CTooltip>
                    </div>
                }
                
            </HeaderLinks>
            {/* <HTheme onClick={() => toggleTheme()} isActive={currentTheme === "dark"} >
                {
                    currentTheme === "dark" ?
                    <ToggleOffIcon />
                    :
                    <ToggleOnIcon />
                }
                <span>Mode nuit</span>
            </HTheme> */}
            <HLang>
                <LanguageList />
            </HLang>
        </HeaderContainer>
        {/* {
            showResetScriptModal && 
                <ResetConfirmationModal 
                    show={showResetScriptModal}
                    handleClose={setShowResetScriptModal(false)}
                    resetScript={resetScript}
                />
        } */}
    </>
  );
}

const mapStateToProps = state => {
    return {
        currentTheme: state.app.theme,
        isAuthenticated : state.auth.token !== null,
        login : state.auth.login
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        setAppTheme: (theme) => dispatch(actions.appSetTheme(theme)),
        onAuth : (email, password) => dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
