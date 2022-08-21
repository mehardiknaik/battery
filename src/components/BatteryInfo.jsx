import axios from "axios";
import React from "react";
import GaugeChart from "react-gauge-chart";
import styles from "./BatteryInfo.module.scss";

const BatteryInfo = ({ level, charging, chargingTime, dischargingTime }) => {
  function findAllCustomerData() {
    return new Promise(function(resolve, reject) {
      axios.post('http://sampleapi.de/v1/find', { query: 'tobias' })
        .then(function(result) {
          var dataPromises = result.data.customerIds.map(function(customerId) {
            return axios.get('http://sampleapi.de/v1/customer/'+customerId);
          });
  
          Promise.all(dataPromises)
            .then(function(customerDatas) {
              resolve(customerDats);
            })
            .catch(function(err) {
              reject(err);
            });
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
  
  (() => {
  findAllCustomerData()
    .then(function(customers) {
      customers.forEach(function(customer) {
        console.log(customer.id+': '+customer.firstName+' '+customer.lastName);
      });
    })
    .catch(function(err) {
      console.error(err);
    });
  })();
  return (
    <>
      <GaugeChart
        id="gauge-chart3"
        nrOfLevels={20}
        arcWidth={0.3}
        percent={level}
        hideText={true}
        animate={false}
        colors={["#EA4228", "#F5CD19", "#5BE12C"]}
      />
      <div className={styles.GuageText}>
        {charging ? "⚡" : ""}
        {(level * 100).toFixed(0)}%
      </div>

      {/* <div>
        <div>
          <strong>Charge level</strong>:<span>{level * 100}%</span>
        </div>
        <div>
          <strong>Charging</strong>:<span>{charging ? "yes" : "no"}</span>
        </div>
        <div>
          <strong>Charging time</strong>:&nbsp;&nbsp;
          <span>{chargingTime ? chargingTime : "finished"}</span>
        </div>
        <div>
          <strong>Discharging time</strong>:<span>{dischargingTime}</span>
        </div>
      </div> */}
    </>
  );
};

export default BatteryInfo;
