import _ from 'lodash'



export function getSum(transaction,type){
    let sum = _(transaction).groupBy("type").map((objs,key)=>{
        if(!type)return _.sumBy(objs,'amount')
        return {
            "type":key,
            "color":objs[0].color,
            "total":_.sumBy(objs,'amount')
        }
    
    }).value()
    return sum;
}
export function getLabels(transaction){
    let amountSum = getSum(transaction,'type')
    let total = _.sum(getSum(transaction));
    let percent = _(amountSum).map(objs=>_.assign(objs,{percent:(100*objs.total)/total})).value()
    return percent;

}

export function chart_data(transaction,custom){

    let bg = _.map(transaction, a=>a.color)
    bg = _.uniq(bg)
    let dataValue = getSum(transaction)

    const config={
        data :{
            datasets: [
                {
                  data: dataValue,
                  backgroundColor:bg,
                  hoverOffset :6,
                  borderRadius :30,
                  spacing:6
        }]
        },
        options:{
            cutout:115
        }
    }

    return custom??config;
    
}

export function Piechart_data(transaction,custom){
  let piedata = _(transaction).groupBy("type").value();
  let exp = piedata.Expenditure;
  let sav = piedata.Savings;
  let inv = piedata.Investment;
  const user = JSON.parse(localStorage.getItem('appUser')).username;
  exp = exp.filter(item=>item.username===user)
  sav = sav.filter(item=>item.username===user)
  inv = inv.filter(item=>item.username===user)
  let bg = _.map(transaction, a=>a.color)
  bg = _.uniq(bg)
  let dataValue = getSum(transaction)
  let expValue = getSum(exp);
  let savValue = getSum(sav);
  let invValue = getSum(inv);

  var l = [invValue[0],savValue[0],expValue[0] ];

  const config={
      data :{
         labels: ['Investment','Savings','Expenditure'],
          datasets: [
              {
                data: l,
                backgroundColor:bg,
                borderWidth:1,
                hoverOffset :4,
      }]
      }
  }

  return custom??config;
  
}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}

export function expenditure_data(transaction,custom){
    let exp = _(transaction).groupBy("type").value();
    let expense = exp["Expenditure"];
    const user = JSON.parse(localStorage.getItem('appUser')).username;
    expense = expense.filter(item=>item.username=== user)
    const names = expense.map(e => e.name)
    const amt = expense.map(e=>e.amount)
    const config = {
        labels :  names,
        datasets: [
          {
            label: 'Expenditure',
            data: amt,
            borderColor: 'rgb(250, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
         },
        ],
  
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
            }
          }
        }
    };

    return custom??config;
}

export function saving_data(transaction,custom){
    let sav = _(transaction).groupBy("type").value();
    let save = sav["Savings"];
    const user = JSON.parse(localStorage.getItem('appUser')).username;
    save = save.filter(item=>item.username=== user)
    const name = save.map(e => e.name)
    const amt = save.map(e=>e.amount)
    const config = {
        labels: name,
        datasets: [
          {
            label: 'Savings',
            data: amt,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
        options : {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: 'Chart.js Bar Chart',
              },
            },
          }
      };
    return custom??config;
}


export function investment_data(transaction,custom){
  let inv = _(transaction).groupBy("type").value();
  const invest = inv["Investment"];
  const user = JSON.parse(localStorage.getItem('appUser')).username;
  const val = invest.filter(item=>item.username=== user)
  const names = val.map(e => e.name)
  const amt = val.map(e=>e.amount)
  const config = {
    labels: names,
    datasets: [
      {
        label: 'Investment',
        data: amt,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 0.5,
      },
    ],
    options:{
      layout:{
        padding : 10
      }
    }
  };
  return custom??config;
}