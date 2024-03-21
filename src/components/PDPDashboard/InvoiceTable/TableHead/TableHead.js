import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckIcon from '@mui/icons-material/Check';
import GetAppIcon from '@mui/icons-material/GetApp';
import { THead, TH, THContainer} from '../../../../styles/Table.styled'

function TableHead(props) {
    const {columns, reverse, setSortQuery, setReverse, getData, selectedAllRows, setSelectedAllRows, entityFilter, lastInvoice} = props;
    
    const columnClickHandler = (field) => {
        setSortQuery(field);
        let reverseValue= reverse[field] ? reverse[field] : false 
        let newReverse = { [field]: !reverseValue }
        setReverse(newReverse);
        getData(field,newReverse);
    }

    const selectAllRowsHandler = (e) => {
        setSelectedAllRows(!selectedAllRows);
    }

    return (
        <>
            <THead>
                    <tr>
                        {
                            lastInvoice === undefined && 
                                <TH key={"column654"} width="50px" scope="col">
                                    <THContainer style={{justifyContent: "center"}}>
                                        <CheckIcon onClick={(e) => selectAllRowsHandler(e)} />
                                    </THContainer>
                                </TH>
                        }
                        {columns?.filter(row=>row.show===true).map(column => (
                            <TH 
                                key={column.field} 
                                scope="col" 
                                width={column.width}
                                id={column.field} 
                                title={column.title} 
                                onClick={() => columnClickHandler(column.field)}
                            >
                                <THContainer style={{justifyContent: column?.alignSelf}}>
                                    <span>
                                        {column.title}
                                    </span>
                                    <ArrowUpwardIcon style={{fontSize: 20, display: reverse[column.field] === true ? 'block' : 'none'}} />
                                    <ArrowDownwardIcon style={{fontSize: 20, display: reverse[column.field] === false ? 'block' : 'none'}}/>
                                </THContainer>    
                            </TH>
                            
                        ))}
                         <TH key={"column123"} scope="col" width="60px" style={{alignSelf:"center"}}>
                            <THContainer style={{cursor: "default",alignSelf:"center",justifyContent:"center"}}>
                                    <GetAppIcon 
                                        style={{fontSize: "1.2rem", color: "#2174B9"}}
                                        //onClick={(e) => selectAllRowsHandler(e)} 
                                    />
                            </THContainer>
                        </TH>
                    </tr>
            </THead>
        </>
    )
}

export default TableHead
