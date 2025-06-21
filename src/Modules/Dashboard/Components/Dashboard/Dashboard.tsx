import { useContext } from "react";
import firstCardImage from "../../../../assets/images/8396402_graph_chart_data_analytics_statistic_icon 1.png"
import secondCardImage from "../../../../assets/images/Group 48102727.png"
import thirdCardImage from "../../../../assets/images/Group 48102728.png"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AuthContext } from "../../../../Context/AuthContext";
import { CountContext } from "../../../../Context/CountContext";
ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {

    const authContext = useContext(AuthContext);
    const loginData = authContext?.loginData;
    const {tasksCount, usersCount} = useContext(CountContext)

    const tasksData = {
      labels: ['ToDo', 'InProgress', 'Done'],
      datasets: [
        {
          label: 'Tasks',
          data: [
            tasksCount?.toDo || 0,
            tasksCount?.inProgress || 0,
            tasksCount?.done || 0
          ],
          backgroundColor: [
            '#E5E6F4',
            '#F4F4E5',
            '#F4E5ED',
          ],
          borderColor: [
            '#CFD1EC',
            '#E4E4BC',
            '#E7C3D7',
          ],
          borderWidth: 1,
        },
      ],
    };

 
 const usersData = {
  labels: ['Active','Inactive'],
  datasets: [
    {
      label: 'Users',
      data: [usersCount.activatedEmployeeCount, usersCount.deactivatedEmployeeCount],
      backgroundColor: [
        '#E5E6F4',
        '#F4F4E5',
      ],
      borderColor: [
        '#CFD1EC',
        '#E4E4BC',
      ],
      borderWidth: 1,
    },
  ],
};
  
  
    return (
        <div className="container-fluid dashboard">
            <div className="home-bg d-flex flex-column justify-content-center">
                   <div className="bg-content text-white ms-4">
                 <h1>Welcome <span className="head-span">{loginData?.userName}</span></h1>
                 <p >You can add project and assign tasks to your team</p>
            </div>         
            </div>
           <div className="main-content">
             <div className="row">
                <div className="col-md-6">
                    <div className="bg-light p-4">
                         <div className="sub-content small-text position-relative ps-2">
                        <h6 className="sub-content-title">Tasks</h6>
                        <p>Lorem ipsum dolor sit amet,consecteture</p>
                    </div>
                    <div className="row ps-2">
                        <div className="col-md-4">
                            <div className="main-card first-card">
                                   <img src={firstCardImage} alt="card image" />
                            <p className="small-text m-0">To Do</p>
                            <h6 className="fs-5 fw-medium">{tasksCount.toDo}</h6>
                            </div>
                         
                        </div>
                        <div className="col-md-4">
                            <div className="main-card second-card">
                                 <img src={secondCardImage} alt="card image" />
                            <p className="small-text m-0">In Progress</p>
                            <h6 className="fs-5 fw-medium">{tasksCount.inProgress}</h6></div>
                                
                        </div>
                        <div className="col-md-4">
                            <div className="main-card third-card">
                                 <img src={thirdCardImage} alt="card image" />
                            <p className="small-text m-0">Done</p>
                            <h6 className="fs-5 fw-medium">{tasksCount.done}</h6></div>
                                
                        </div>
                    </div> 
                    </div>
                  
                </div>
                 {loginData?.userGroup !== "Employee" && (
                <div className="col-md-6">
                    <div className="bg-light p-4">
                       <div className="sub-content small-text position-relative ps-2">
                        <h6 className="sub-content-title">Users</h6>
                        <p>Lorem ipsum dolor sit amet,consecteture</p>
                    </div>
                    <div className="row ps-2">
                        <div className="col-md-4">
                            <div className="main-card first-card">
                            <img src={firstCardImage} alt="card image" />
                            <p className="small-text m-0">Active</p>
                            <h6 className="fs-5 fw-medium">{usersCount.activatedEmployeeCount}</h6>
                            </div>
                        
                        </div>
                        <div className="col-md-4">
                            <div className="main-card second-card">
                            <img src={secondCardImage} alt="card image" />
                            <p className="small-text m-0">Inactive</p>
                            <h6 className="fs-5 fw-medium">{usersCount.deactivatedEmployeeCount}</h6>
                            </div>
                                
                        </div>
                        </div>  
                    </div>
                    
                </div>)}
            </div>
            <div className="row m-5">
                <div className="col-md-6">
                    <div className="w-75">
                        <Doughnut data={tasksData}/>
                    </div>
                </div>
                 {loginData?.userGroup !== "Employee" && (
                      <div className="col-md-6">
                          <div className="w-75">
                              <Doughnut data={usersData}/>
                          </div>
                      </div>
                  )}
            </div>
           </div>
          
              
        </div>
    );
};

export default Dashboard;
