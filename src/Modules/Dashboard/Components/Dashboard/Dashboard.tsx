import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import firstCardImage from "../../../../assets/images/8396402_graph_chart_data_analytics_statistic_icon 1.png";
import secondCardImage from "../../../../assets/images/Group 48102727.png";
import thirdCardImage from "../../../../assets/images/Group 48102728.png";
import { AuthContext } from "../../../../Context/AuthContext";
import { CountContext } from "../../../../Context/CountContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const loginData = authContext?.loginData;
  const countContext = useContext(CountContext);

  type TasksCount = {
    toDo: number;
    inProgress: number;
    done: number;
  };

  type UsersCount = {
    activatedEmployeeCount: number;
    deactivatedEmployeeCount: number;
  };

  const tasksCount: TasksCount = countContext?.tasksCount || {
    toDo: 0,
    inProgress: 0,
    done: 0,
  };
  const usersCount: UsersCount = countContext?.usersCount || {
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  };

  const tasksData = {
    labels: ["ToDo", "InProgress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [
          tasksCount?.toDo || 0,
          tasksCount?.inProgress || 0,
          tasksCount?.done || 0,
        ],
        backgroundColor: ["#E5E6F4", "#F4F4E5", "#F4E5ED"],
        borderColor: ["#CFD1EC", "#E4E4BC", "#E7C3D7"],
        borderWidth: 1,
      },
    ],
  };

  const usersData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Users",
        data: [
          usersCount.activatedEmployeeCount,
          usersCount.deactivatedEmployeeCount,
        ],
        backgroundColor: ["#E5E6F4", "#F4F4E5"],
        borderColor: ["#CFD1EC", "#E4E4BC"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container-fluid dashboard">
      <div className="home-bg d-flex flex-column justify-content-center px-3 py-5 text-center text-md-start">
        <div className="bg-content text-white">
          <h1 className="display-6 display-md-4">
            Welcome <span className="head-span">{loginData?.userName}</span>
          </h1>
          <p className="fs-5">
            You can add project and assign tasks to your team
          </p>
        </div>
      </div>

      <div className="main-content">
        <div className="row g-3 px-2">
          <div className="col-12 col-lg-6">
            <div className="bg-light p-4 h-100">
              <div className="sub-content small-text position-relative ps-2">
                <h6 className="sub-content-title">Tasks</h6>
                <p>Track the status of assigned tasks and daily progress</p>
              </div>
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="main-card first-card text-center">
                    <img
                      src={firstCardImage}
                      alt="To Do"
                      className="img-fluid rounded"
                    />
                    <p className="small-text m-0">To Do</p>
                    <h6 className="fs-5 fw-medium">{tasksCount.toDo}</h6>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="main-card second-card text-center">
                    <img
                      src={secondCardImage}
                      alt="In Progress"
                      className="img-fluid rounded"
                    />
                    <p className="small-text m-0">In Progress</p>
                    <h6 className="fs-5 fw-medium">{tasksCount.inProgress}</h6>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="main-card third-card text-center">
                    <img
                      src={thirdCardImage}
                      alt="Done"
                      className="img-fluid rounded"
                    />
                    <p className="small-text m-0">Done</p>
                    <h6 className="fs-5 fw-medium">{tasksCount.done}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loginData?.userGroup !== "Employee" ? (
            <div className="col-12 col-lg-6">
              <div className="bg-light p-4 h-100">
                <div className="sub-content small-text position-relative ps-2">
                  <h6 className="sub-content-title">Users</h6>
                  <p>View the activity status of users in the system</p>
                </div>
                <div className="row g-3">
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="main-card first-card text-center">
                      <img
                        src={firstCardImage}
                        alt="Active"
                        className="img-fluid rounded"
                      />
                      <p className="small-text m-0">Active</p>
                      <h6 className="fs-5 fw-medium">
                        {usersCount.activatedEmployeeCount}
                      </h6>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="main-card second-card text-center">
                      <img
                        src={secondCardImage}
                        alt="Inactive"
                        className="img-fluid rounded"
                      />
                      <p className="small-text m-0">Inactive</p>
                      <h6 className="fs-5 fw-medium">
                        {usersCount.deactivatedEmployeeCount}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12 col-md-6 d-flex justify-content-center mb-4">
              <div style={{ maxWidth: "300px", width: "100%" }}>
                <Doughnut data={tasksData} />
              </div>
            </div>
          )}
        </div>
        {loginData?.userGroup !== "Employee" && (
          <div className="row mt-5 justify-content-center">
            <div className=" col-12 col-md-6 d-flex justify-content-center mb-4">
              <div
                className="doughnut-count"
                style={{ maxWidth: "300px", width: "100%" }}
              >
                <Doughnut data={tasksData} />
              </div>
            </div>

            <div className=" col-12 col-md-6 d-flex justify-content-center mb-4">
              <div
                className="doughnut-count"
                style={{ maxWidth: "300px", width: "100%" }}
              >
                <Doughnut data={usersData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
