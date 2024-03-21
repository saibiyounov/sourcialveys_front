import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next';
import Axios from '../../../axios-proas';
import { formatDate, formatNumber, getNotyfObject, getThirtyNextDays } from '../../../shared/utility';
import { LineChartContainer } from './LineChart.styled';
import{dayForIntervalMonth,dayForIntervalMonthWithKey}from'../../../shared/utility'
import { useTheme } from 'styled-components';

function LineChart({threeViews,period}) {
    const {t} = useTranslation();
    const notyf = getNotyfObject()
    const theme = useTheme();
    const language = localStorage.getItem('i18nextLng');
    const chartRef = useRef();
    const event = new Date();
    const currentDay = event.getDate();
    event.setDate(event.getDate()-1);
    const nextCurrentDay =event.getDate(); 
    const [monthListMois, setMonthListMois] = useState()
    const [monthListMoisKeys, setMonthListMoisKeys] = useState() 
    const jour = useMemo(() => [nextCurrentDay, currentDay], [])
    const monthListJour = useMemo(() => ([{key : nextCurrentDay, value: 0},{key : currentDay, value: 1}]), [])
    const monthList = useMemo(() => ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], [])
    const [chartLabels, setChartLabels] = useState([]);
    const [sentInvoicesData, setSentInvoicesDate] = useState([])
    const [receivedSentInvoicesData, setReceivedSentInvoicesData] = useState([])
    const getReadAndSentInvoicesPerMonth = () => {
        Axios.get("/invoice//sentAndRecievedInvoices",{params: {period:period}}).then((response) => {
            const currentMonth = new Date().getMonth();
            let sentInvs = response?.data?.sentInvoicesPerMonth ;
            let recInvs = response?.data?.recievedInvoicesPerMonth;
           
            let sentInvTemp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            let recInvTemp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
         
            sentInvs.map(row => {
                let temp = period=="jour"||period=="mois"? +row['invoiceMonth'].substr(8,2)   : +row['invoiceMonth'].substr(5,2) - 1;
                let pos = period !=="annee"&& period !=="tous"? temp: temp - (currentMonth + 1) >= 0 ? temp - (currentMonth + 1) : (temp - (currentMonth + 1)) + 12
                let position= period=="jour" ? monthListJour.filter(c => c.key == pos)[0].value:period=="mois"? monthListMoisKeys.filter(c => c.key == pos)[0].value: pos

                sentInvTemp[position] = parseInt(row.totalCount)
            })
            recInvs.map(row => {
                let temp = period=="jour"||period=="mois"? +row['invoiceMonth'].substr(8,2)  : +row['invoiceMonth'].substr(5,2) - 1;
                let pos =  period !=="annee"&& period !=="tous"? temp:temp - (currentMonth + 1) >= 0 ? temp - (currentMonth + 1) : (temp - (currentMonth + 1)) + 12
                let position= period=="jour" ? monthListJour.filter(c => c.key == pos)[0].value: period=="mois"? monthListMoisKeys.filter(c => c.key == pos)[0].value: pos

                recInvTemp[position] = parseInt(row.totalCount)
                
            })
            let monthLabels = monthList.slice(currentMonth + 1, 12).concat(monthList.slice(0,currentMonth + 1))  
           
            
            setChartLabels(period=="annee"||period=="tous"?monthLabels:period=="jour"? jour:monthListMois);
            setSentInvoicesDate(sentInvTemp);
            setReceivedSentInvoicesData(recInvTemp);
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        })  
    };


    useEffect( ()  => {
        setMonthListMois(dayForIntervalMonth())
        setMonthListMoisKeys(dayForIntervalMonthWithKey())
       
        const ctx = chartRef.current;
        // ctx.canvas.width = "100%";
        getReadAndSentInvoicesPerMonth()
    }, [period])

    useEffect(() => {
        const ctx = chartRef.current;
        ctx.chartInstance.resize()
    }, [threeViews])

    const chartData ={
        labels: chartLabels,
        datasets: [
            {
                label: 'Factures émises',
                data: sentInvoicesData,
                // data: [0, 18 ,7, 10, 12, 14, 12 ,13, 4.4 , 4, 8, 9],
                backgroundColor: "transparent",
                borderColor: '#0090FF',
                // borderWidth: 1
            },
            {
                label: 'Factures reçues',
                data: receivedSentInvoicesData,
                // data: [0, 2 ,4, 3, 11, 5, 9 ,8, 9.4 , 5, 3, 2],
                backgroundColor: "transparent",
                borderColor: "#DB5AEE",
                // borderWidth: 1
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        // responsive: true,
        // aspectRatio: 1,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        title: {
            display: true,
            fontSize: 16,
            position: 'top',
            align: "start",
            fontColor: theme.colors.primary,
            text:period=="annee"? "Récapitulatif des factures émises et reçues sur 12 mois":"Récapitulatif des factures émises et reçues le mois dernier",
            // padding: 20
        },
        scales: {
            yAxes: [
                {
                    id: 'A',
                    position: 'left',
                    scaleLabel: {
                        display: false,
                        labelString: 'Nombre de factures'
                    },
                    gridLines: {
                        // zeroLineColor: "red",
                        display: false,
                        color: "rgba(200,200,200,0.5)",
                    },
                    ticks: {
                        // callback: (value, index, values) => formatNumber(value),
                        fontColor: '#809FB8',
                        // min: 0,
                        // max: 6,
                        beginAtZero: true,
                        // stepSize: 1
                    }
                }
             ]
            ,
            xAxes: [{
                backgroundColor: "red",
                gridLines: {
                    // zeroLineColor: "red",
                    display: true,
                    color: "#D9E1E766"
                },
                ticks: {
                    fontColor: "#809FB8",
                    fontSize: 14,
                    padding: 10,
                },
                position: "relative"

            }]
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: 'black',
                fontSize: 12,
                padding: 10,
                boxWidth: 14,
            },
            // onClick: null
        }
    }
    

    return (
        <>
        <LineChartContainer>
                <Line 
                    ref={chartRef} 
                    data={chartData} 
                    options={options}  
                    id="issuesClient_chartCanvas"
                />
        </LineChartContainer>
        </>
    )
}

export default LineChart
