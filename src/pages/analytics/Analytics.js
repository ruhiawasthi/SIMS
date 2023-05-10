// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';

// const Analytics = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeeRoles, setEmployeeRoles] = useState([]);
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8080/api/employees');
//         setEmployees(data);
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//       }
//     };

//     const fetchEmployeeRoles = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8080/api/employeeRoles');
//         setEmployeeRoles(data);
//       } catch (error) {
//         console.error('Error fetching employee roles:', error);
//       }
//     };

//     const intervalId = setInterval(() => {
//       fetchEmployees();
//     }, 5000);

//     fetchEmployees();
//     fetchEmployeeRoles();

//     return () => clearInterval(intervalId);
//   }, []);

// useEffect(() => {
//   if (employees.length === 0 || !employeeRoles) {
//     return;
//   }

//     const roleCount = employeeRoles.reduce((acc, role) => {
//       const count = employees.filter((employee) => employee.role.role === role.role).length;
//       acc[role.role] = count;
//       return acc;
//     }, {});

//     const chartData = {
//       labels: employeeRoles.map((role) => role.role),
//       datasets: [
//         {
//           label: 'Employee Count',
//           data: employeeRoles.map((role) => roleCount[role.role] || 0),
//         },
//       ],
//     };

//     setChartData(chartData);
//   }, [employees, employeeRoles]);

//   return (
//     <div>
//       <h1>Employee Analytics</h1>
//       {employees.length === 0 || !employeeRoles ? (
//         <p>Loading...</p>
//       ) : (
//         <Bar data={chartData} />
//       )}
//     </div>
//   );
// };

// export default Analytics;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Analytics() {
//   const [employeeData, setEmployeeData] = useState([]);
//   const [employeeRolesData, setEmployeeRolesData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const employeeDataResponse = await axios.get(
//         "http://localhost:8080/api/employees"
//       );
//       const employeeRolesDataResponse = await axios.get(
//         "http://localhost:8080/api/employeeRoles"
//       );
//       setEmployeeData(employeeDataResponse.data);
//       setEmployeeRolesData(employeeRolesDataResponse.data);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const getEmployeeCountsByRole = () => {
//     const employeeCounts = {};
//     employeeData.forEach((employee) => {
//       const role = employee.role.role;
//       if (!employeeCounts[role]) {
//         employeeCounts[role] = 1;
//       } else {
//         employeeCounts[role]++;
//       }
//     });
//     const employeeCountsByRole = [];
//     employeeRolesData.forEach((role) => {
//       employeeCountsByRole.push({
//         role: role.role,
//         count: employeeCounts[role.role] || 0,
//       });
//     });
//     return employeeCountsByRole;
//   };

//   const renderBarChart = () => {
//     const employeeCountsByRole = getEmployeeCountsByRole();
//     const chartData = employeeCountsByRole.map((role) => {
//       return {
//         name: role.role,
//         value: role.count,
//       };
//     });
//     const maxCount = Math.max(...chartData.map((item) => item.value));
//     return (
//       <div style={{ marginTop: "20px", display: "flex" }}>
//         <div style={{ display: "flex", flexDirection: "column-reverse" }}>
//           {chartData.map((item, index) => (
//             <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//               <div style={{ width: "160px" }}>
//                 {item.name}
//               </div>
//               <div style={{ width: `${item.value / maxCount * 400}px`, height: "20px", backgroundColor: "#0074D9", marginLeft: "10px" }} />
//               <div style={{ marginLeft: "10px" }}>
//                 {item.value}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div style={{ marginLeft: "20px", borderLeft: "1px solid #ccc", paddingLeft: "20px" }}>
//           <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//             <div style={{ width: "60px" }}>
//               Number of Employees
//             </div>
//             <div style={{ width: "400px", textAlign: "right" }}>
//               {maxCount}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div>
//         <h3>Employees</h3>
//         {renderBarChart()}
//       </div>
//     );
//   }
// }

// import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import { Bar } from "react-chartjs-2";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// const options = {
//   indexAxis: "y",
//   elements: {
//     bar: {
//       borderWidth: 2,

//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "right",
//     },
//     title: {
//       display: true,
//       text: "godown (Capacity Vs. Location)",
//     },
//   },
// };

// const Analytics = () => {
//   const [data, setData] = useState({
//     datasets: [
//       {
//         label: "Dataset 1",
//         data: [],
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "rgba(25, 90, 13, 0.5)",
//       },
//       {
//         label: "Dataset 2",
//         data: [],
//         borderColor: "rgb(53, 162, 235)",
//         backgroundColor: "rgba(53, 162, 235, 0.5)",
//       },
//     ],
//   });
//   // const [employeeData, setEmployeeData] = useState([]);
// const [employees, setEmployees] = useState([]);
// const [employeeRoles, setEmployeeRoles] = useState([]);
// const [chartData, setChartData] = useState({});

//   // useEffect(() => {
//   //   axios.get('https://example.com/employee-data')
//   //     .then(response => {
//   //       setEmployeeData(response.data);
//   //     })
//   //     .catch(error => {
//   //       console.error(error);
//   //     });
//   // }, []);
//   useEffect(() => {
//         const fetchEmployees = async () => {
//           try {
//             const { data } = await axios.get('http://localhost:8080/api/employees');
//             setEmployees(data);
//           } catch (error) {
//             console.error('Error fetching employees:', error);
//           }
//         };

//         const fetchEmployeeRoles = async () => {
//           try {
//             const { data } = await axios.get('http://localhost:8080/api/employeeRoles');
//             setEmployeeRoles(data);
//           } catch (error) {
//             console.error('Error fetching employee roles:', error);
//           }
//         };

//         const intervalId = setInterval(() => {
//           fetchEmployees();
//         }, 5000);

//         fetchEmployees();
//         fetchEmployeeRoles();

//         return () => clearInterval(intervalId);
//       }, []);

//       useEffect(() => {
//         if (employees.length === 0 || !employeeRoles) {
//           return;
//         }

//         const roleCount = employeeRoles.reduce((acc, role) => {
//           const count = employees.filter((employee) => employee.role.role === role.role).length;
//           acc[role.role] = count;
//           return acc;
//         }, {});
//         const chartData = {
//                labels: employeeRoles.map((role) => role.role),
//                 datasets: [
//                   {
//                     label: 'Employee Count',
//                     data: employeeRoles.map((role) => roleCount[role.role] || 0),
//                   },
//                 ],
//               };

//               setChartData(chartData);
//             }, [employees, employeeRoles]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const outwards = "http://localhost:8080/api/outwards";
//       const inwards = "http://localhost:8080/api/inwards";
//       const labelSet = [];
//       const dataSet1 = [];
//       const dataSet2 = [];
//       await fetch(outwards)
//         .then((data) => {
//           console.log("Api data", data);
//           const res = data.json();
//           return res;
//         })
//         .then((res) => {
//           console.log("ressss", res);
//           for (const val of res) {
//             labelSet.push(val.godown.location);
//             dataSet1.push(val.godown.capacityInQuintals);
//             dataSet2.push(val.godown.capacityInQuintals);
//             // labelSet.push(val.name)
//           }
//           setData({
//             labels: labelSet,
//             datasets: [
//               {
//                 label: "Inwards",
//                 data: dataSet1,
//                 borderColor: "#495057",
//                 backgroundColor:"#6c757d;",
//               },
//               {
//                 label: "Outwards",
//                 data: dataSet2,
//                 borderColor: "#495057",
//                 backgroundColor: "#ced4da"
//               },
//             ],
//           });
//           console.log("arrData", dataSet1, dataSet2);
//         })
//         .catch((e) => {
//           console.log("error", e);
//         });
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "500%" }}>
//       <Bar data={data} options={options} />
//       <h1>Employee Analytics</h1>
//       {employees.length === 0 || !employeeRoles ? (
//         <p>Loading...</p>
//       ) : (
//         <Bar data={chartData} />
//      )}
//     </div>




//   );
// };
// export default Analytics;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import moment from "moment";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip
} from "recharts";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,

    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Godown (Capacity Vs. Location)",
    },
  },
};

const optionsForProductsData = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Products Vs Quantity (Inwards & Outwards)",
    },
  },
};

const COLORS = ["#8884d8", "#82ca9d"];

const CustomTooltip = ({ active, payload, label }) => {

  console.log("Pay", payload)

  if(active){
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#ffff",
          padding: "5px",
          border: "1px solid #cccc"
        }}
      >
        <label> {`${payload[0].name} : ${payload[0].value}`} </label>
      </div>
    );
  }

  return null;
    
}


const Analytics = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState({
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const [productsData, setProductsData] = useState({
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  const [pieDataForReturns, setPieDataForReturns] = useState([
    {
      name: "Cancelled",
      value: 0
    },
    {
      name: "Damaged",
      value: 0
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const outwards = "http://localhost:8080/api/outwards";
      const inwards = "http://localhost:8080/api/inwards";
      const returns = "http://localhost:8080/api/returns";

      const labelSet = [];
      const dataSet1 = [];
      const dataSet2 = [];

      let labelSetForProductsData = [];
      let dataSetForInwardsProducts = [];
      let dataSetForOutwardsProducts = [];

      await fetch(outwards)
        .then((data) => {
          console.log("API data", data);
          const res = data.json();
          return res;
        })
        .then((res) => {
          console.log("res", res);
          for (const val of res) {
            labelSet.push(val.godown.location);
            dataSet1.push(val.godown.capacityInQuintals);
            dataSet2.push(val.godown.capacityInQuintals);

            if (labelSetForProductsData.includes(val.product.name)) {
              let idx = labelSetForProductsData.findIndex((item) => item == val.product.name);
              dataSetForOutwardsProducts[idx] = Number(dataSetForOutwardsProducts[idx]) + Number(val.quantity);
            }
            else {
              labelSetForProductsData.push(val.product.name);
              dataSetForOutwardsProducts.push(val.quantity);
            }
            // labelSet.push(val.name)
          }
          console.log("arrData", dataSet1, dataSet2, dataSetForOutwardsProducts);
        })
        .catch((e) => {
          console.log("error", e);
        });

      await fetch(inwards)
        .then((data) => {
          console.log("API data", data);
          const res = data.json();
          return res;
        })
        .then((res) => {
          console.log("res", res);
          for (let i = 0; i < dataSetForOutwardsProducts.length; i++) {
            dataSetForInwardsProducts.push(0);
          }
          for (const val of res) {

            if (labelSetForProductsData.includes(val.product.name)) {
              let idx = labelSetForProductsData.findIndex((item) => item == val.product.name);
              dataSetForInwardsProducts[idx] = Number(dataSetForInwardsProducts[idx]) + Number(val.quantity);
            }
            else {
              labelSetForProductsData.push(val.product.name);
              dataSetForInwardsProducts.push(val.quantity);
            }
            // labelSet.push(val.name)
          }

          if (dataSetForInwardsProducts.length > dataSetForOutwardsProducts.length) {
            for (let i = 0; i < (dataSetForInwardsProducts.length - dataSetForOutwardsProducts.length); i++) {
              dataSetForOutwardsProducts.push(0);
            }
          }

          console.log("arrData", dataSet1, dataSet2, dataSetForOutwardsProducts);
        })
        .catch((e) => {
          console.log("error", e);
        });

      await fetch(returns)
        .then((data) => {
          console.log("API data", data);
          const res = data.json();
          return res;
        })
        .then((res) => {
          console.log("res", res);

          for (const val of res) {
            if (val.reason == 'cancelled') {
              pieDataForReturns[0].value = Number(pieDataForReturns[0].value) + Number(val.quantity)
            }
            else if (val.reason == 'damaged') {
              pieDataForReturns[1].value = Number(pieDataForReturns[1].value) + Number(val.quantity)
            }
          }

        })
        .catch((e) => {
          console.log("error", e);
        });

      setData({
        labels: labelSet,
        datasets: [
          {
            label: "Inwards",
            data: dataSet1,
            borderColor: "#495057",
            backgroundColor: "#6c757d;",
          },
          {
            label: "Outwards",
            data: dataSet2,
            borderColor: "#495057",
            backgroundColor: "#ced4da"
          },
        ],
      });

      setProductsData({
        labels: labelSetForProductsData,
        datasets: [
          {
            label: "Inwards",
            data: dataSetForInwardsProducts,
            borderColor: "#495057",
            backgroundColor: "#6c757d;",
          },
          {
            label: "Outwards",
            data: dataSetForOutwardsProducts,
            borderColor: "#495057",
            backgroundColor: "#ced4da"
          },
        ],
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/employees');
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchEmployeeRoles = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/employeeRoles');
        setEmployeeRoles(data);
      } catch (error) {
        console.error('Error fetching employee roles:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchEmployees();
    }, 5000);

    fetchEmployees();
    fetchEmployeeRoles();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (employees.length === 0 || !employeeRoles) {
      return;
    }

    const roleCount = employeeRoles.reduce((acc, role) => {
      const count = employees.filter((employee) => employee.role.role === role.role).length;
      acc[role.role] = count;
      return acc;
    }, {});

    const chartData = {
      labels: employeeRoles.map((role) => role.role),
      datasets: [
        {
          label: 'Employee Count',
          data: employeeRoles.map((role) => roleCount[role.role] || 0),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData(chartData);
  }, [employees, employeeRoles]);

  return (

    <div style={{ width: "100%", height: "500%" }}>
      <Bar data={data} height={'55px'} options={options} />
      <br></br><br></br>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            indexAxis: 'y',
            scales: {
              y: {
                stepSize: 2
              }
            }
          }}
          height={'50px'}
        />
      ) : (
        <p>Loading...</p>
      )}
      <br></br><br></br>
      <Bar height={'80px'} data={productsData} options={optionsForProductsData} />
      <br></br><br></br>
        <strong><h7 style={{marginLeft : '515px'}}>Returns (Cancelled vs Damaged)</h7></strong>
        <br></br><br></br>
        <PieChart width={1300} height={300}>
          <Pie
            data={pieDataForReturns}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          >
            {pieDataForReturns.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </div>
  );
};
export default Analytics;