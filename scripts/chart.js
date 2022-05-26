import Chart from 'chart.js/auto';
import { db, auth } from './app';
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { getProducts } from "./products";
import { getUser, getUserOrders } from "./getUser";

async function getChartData(userId) {

    const data = await getUser(userId);
    const dataOrders = await getUserOrders(userId, data.isAdmin);

    const products = await getProducts(db);

    const chartData = [];

    products.forEach(()=>{
        chartData.push(0)
    })

    dataOrders.forEach((order)=>{
        order.cart.forEach((product)=>{
            const index = products.findIndex((p)=>p.name === product.name)
            chartData[index] += 1;
        })
    })

    console.log(dataOrders);
    
    renderChart(products, chartData);
}

const renderChart = async (products, productsData) => {
    const labels = products.map((product) =>  product.name )

    const data = {
        labels: labels,
        datasets: [{
            label: "Sold products",
            backgroundColor: 'rgb(31, 86, 151)',
            borderColor: 'rgb(255, 99, 132)',
            data: productsData,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: "y",
            scales: { y: { beginAtZero: true } },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        getChartData(user.uid);

        getUser(user.uid).then(user => {
            userLogged = user;

        });
    } else {
        window.location.href = "./login.html"
    }
})