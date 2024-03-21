import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CardContainer, CardHeader, CardInfos, CardIcon, CardPercentage, CardPercentageIcon, CardPercentageValue, CardTitle, CardBody, CardValue } from './Card.Styled';
function Card({icon, isIncreasing,  percentage, title, value}) {
  return (
    <CardContainer>
        <CardHeader>
            <CardInfos>
                <CardIcon>
                    {icon}
                </CardIcon>
                {
                    percentage && (
                        <CardPercentage isIncreasing={isIncreasing}>
                            <CardPercentageIcon isIncreasing={isIncreasing}>
                                {
                                    isIncreasing ? 
                                        <ArrowUpwardIcon style={{fontSize: "0.8rem"}} />
                                    :
                                        <ArrowDownwardIcon style={{fontSize: "0.8rem"}} />
                                }
                            </CardPercentageIcon>
                            <CardPercentageValue>
                                {isIncreasing ? '+' : '-'}
                                {percentage}
                                <span>%</span>
                            </CardPercentageValue>
                        </CardPercentage>
                    )
                }
            </CardInfos>
            <CardTitle>
                {title}
            </CardTitle>
        </CardHeader>
        <CardBody>
            <CardValue>
                {value}
            </CardValue>
        </CardBody>
    </CardContainer>
  );
}

export default Card;
