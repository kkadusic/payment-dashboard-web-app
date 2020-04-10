import React, {useEffect, useState, useRef} from 'react';
import Chartjs from 'chart.js';
import axios from "axios";
import {getToken} from "../../utilities/Common";


const TransakcijeIznos = () => {

    function getAllPricesForMerchants(data){
        const merchantPrice = [];
        data.forEach((transaction) => {
            if (merchantPrice.hasOwnProperty(transaction.merchantName)){
                merchantPrice[transaction.merchantName] += transaction.totalPrice;
            }
            else {
                merchantPrice[transaction.merchantName] = transaction.totalPrice;
            }
        });
        return merchantPrice;
    }

    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        axios
            .get("https://payment-server-si.herokuapp.com/api/transactions/all", {
                headers: {Authorization: "Bearer " + getToken()}
            })
            .then((res) => {
                console.log(res.data);
                const merchantPrice = getAllPricesForMerchants(res.data);

                const chartConfig = {
                    type: 'radar',
                    data: {
                        labels: Object.keys(merchantPrice),
                        datasets: [
                            {
                                label: "All bank accounts",
                                backgroundColor: 'rgba(0, 200, 132, 0.3',
                                borderColor: 'gray',
                                data: Object.values(merchantPrice),
                            }
                        ]
                    },
                    options: {}
                };

                if (chartContainer && chartContainer.current) {
                    const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
                    setChartInstance(newChartInstance);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }, [chartContainer]);

    return (
        <div>
            <canvas ref={chartContainer}/>
        </div>
    );
};

export default TransakcijeIznos;
