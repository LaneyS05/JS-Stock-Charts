//retrieve stock data from http://twelvedata.com/
//make sure to read documentation https://twelvedata.com/docs#stocks
//Make sure to use the api secret to

let api_url = "https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=1min&apikey=b03f7100b29c4e76b371d20a21a1d927"
//let key = "b03f7100b29c4e76b371d20a21a1d927"

async function getStocksFromApi(){

    try {
        let response = fetch(api_url,{

            headers:{
                //pass api key here
                key: 'b03f7100b29c4e76b371d20a21a1d927'
            }
            
        })
        console.log(response)

        let data = await  response.json()
        console.log(data)
        
        //change shape of response and return data to caller
        return  [data.GME, data.MSFT, data.DIS, data.BTNX]   
    } catch (error) {
        console.error("error getting stocks from api",error)
    }
}

//helper function used to display chart color
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {  
   // let response = await fetch (api_url)
    //pulling the mock data temporarily from our file
     const { GME, MSFT, DIS, BNTX } = mockData;

     const stocks = [GME, MSFT, DIS, BNTX];
    //when you finish api use this line instead
    //const stocks = await getStocksFromApi()

    //print out the GME stock prices
    console.log(stocks[0].values)

    const timeChartCanvas = document.querySelector('#time-chart');
    //Start coding the first chart here since it references the canvas on line 3  
    stocks.forEach(stocks => stocks.values.reverse())
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data:{
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map (stock => ({
                lable: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroungColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    }) 
    
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    //build your second chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['GME', 'MSFT', 'DIS', 'BNTX'],
            datasets: [{
                lable: 'hight',
                data: [350, 260, 195, 250],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ]
            }]
        }
    
    })

    //const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    //this is the bonus you don't have to do it
}

main()