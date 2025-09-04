import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import DatamapsIndia from "react-datamaps-india";
import { Select } from "antd";
import { BaseUrl } from "../utils/url";

const IndiaMap = () => {
  const dispatch = useDispatch();
  const { statesWithDistricts } = useSelector((state) => state.data);
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedStateName, setSelectedStateName] = useState(null);
  const [stateStats, setStateStats] = useState({
    bloodCollectionSummary: { totalCollection: "N/A", stateName: "" },
    donorRegistered: { hnumDonorRegistered: "N/A" },
    totalBloodCenters: [{ hnumTotalBloodCentres: "N/A" }],
    campsOrganised: { finalCount: "N/A" },
  });
  const [allStateData, setAllStateData] = useState({
    bloodCollectionSummary: [],
    totalBloodCenters: [],
    donorRegistered: [],
    campsOrganised: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Dispatching getApiData...");
    dispatch(getApiData());

    const fetchMapData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BaseUrl}/eraktkosh/stateData`);
        console.log("Complete state stats", response.data);
        setAllStateData(response.data);
      } catch (error) {
        console.error("Error in fetchMapData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapData();
  }, [dispatch]);

  const states = statesWithDistricts || [];

  const handleStateChange = (stateCode, stateName) => {
    console.log("Selected stateCode:", stateCode);
    console.log("All state data:", allStateData);

    if (!stateCode || !allStateData.bloodCollectionSummary.length) return;

    setSelectedState(stateCode);
    setSelectedStateName(stateName);

    const bloodData = allStateData.bloodCollectionSummary.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );

    console.log("All blood data:", allStateData.bloodCollectionSummary);
    console.log("Matched blood data:", bloodData);

    const centerData = allStateData.totalBloodCenters.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );
    console.log("All center data:", allStateData.totalBloodCenters);
    console.log("Matched center data:", centerData);

    const donorData = allStateData.donorRegistered.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );
    console.log("All donor data:", allStateData.donorRegistered);
    console.log("Matched donor data:", donorData);

    const campsData = allStateData.campsOrganised.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );
    console.log("All camp data: ", allStateData.campsOrganised);
    console.log("Matched camp data: ", campsData);

    setStateStats({
      bloodCollectionSummary: {
        totalCollection: bloodData?.totalCollection ?? "N/A",
        stateName: stateName,
      },
      donorRegistered: {
        hnumDonorRegistered: donorData?.hnumDonorRegistered ?? "N/A",
      },
      totalBloodCenters: [
        {
          hnumTotalBloodCentres: centerData?.hnumTotalBloodCentres ?? "N/A",
        },
      ],
      campsOrganised: {
        finalCount: campsData?.finalCount ?? "N/A",
      },
    });
  };
  useEffect(() => {
    if (
      statesWithDistricts?.length > 0 &&
      allStateData?.bloodCollectionSummary?.length > 0
    ) {
      const defaultState =
        allStateData.bloodCollectionSummary.find((state) =>
          statesWithDistricts.some((s) => s.stateCode === state.stateCode)
        ) || allStateData.bloodCollectionSummary[26];

      if (defaultState) {
        handleStateChange(defaultState.stateCode, defaultState.stateName);
      }
    }
  }, [statesWithDistricts, allStateData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        hoveredState?.stateCode &&
        hoveredState?.stateCode !== selectedState
      ) {
        handleStateChange(hoveredState.stateCode, hoveredState.stateName);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [hoveredState]);

  const mapData = {};
  states.forEach((state) => {
    mapData[state.stateName] = {
      value: state.totalCollection,
      title: state.stateName,
    };
  });

  return (
    <section className="map__india">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-5 col-12">
            <h3 className="section__heading mb-2">
              Nationwide Presence.
              <br />
              Ensuring Accessibility Across India.
            </h3>
            <p className="mb-0 section__overview">
              A Connected Network of Blood Center Serving Every State and
              District
            </p>

            <div className="map__dropdown__section d-flex flex-column mt-3 mb-2">
              <label htmlFor="">Select State</label>
              <Select
                style={{ width: "100%" }}
                value={selectedStateName}
                onChange={(value, option) => {
                  console.log("Dropdown selection changed");
                  handleStateChange(value, option.label);
                }}
                placeholder="Select"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={states.map((state) => ({
                  value: state.stateCode,
                  label: state.stateName,
                }))}
              />
            </div>

            <div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 pe-0 mb-2 pe-2">
                  <div className="map__data_container p-3 h-100 d-flex align-items-baseline">
                    <div>
                      <img
                        className="me-2"
                        src="assets/landingPage/registration.svg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-0 key">Donor Registration</p>
                      <p className="mb-0 value">
                        {stateStats?.donorRegistered?.hnumDonorRegistered ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ps-0 mb-2">
                  <div className="map__data_container p-3 h-100 d-flex align-items-baseline ">
                    <div>
                      <img
                        className="me-2"
                        src="assets/landingPage/units.svg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-0 key">Blood Units Collected</p>
                      <p className="mb-0 value">
                        {stateStats?.bloodCollectionSummary?.totalCollection ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 pe-0 pe-2 mb-2">
                  <div className="map__data_container d-flex p-3 h-100 align-items-baseline ">
                    <div>
                      <img
                        className="me-2"
                        src="assets/landingPage/center.svg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-0 key">Blood Centers</p>
                      <p className="mb-0 value">
                        {stateStats?.totalBloodCenters?.[0]
                          ?.hnumTotalBloodCentres || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ps-0 mb-2">
                  <div className="map__data_container d-flex p-3 h-100 align-items-baseline">
                    <div>
                      <img
                        className="me-2"
                        src="assets/landingPage/camps.svg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-0 key">Camps Organised</p>
                      <p className="mb-0 value">
                        {stateStats?.campsOrganised?.finalCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "13px" }} className="mb-0">
              *The data represented has been collected post year 2017 on wards.
            </p>
          </div>

          <div className="col-xl-7 col-lg-7 col-12">
            <DatamapsIndia
              hoverComponent={({ value }) => {
                const matchedState = states.find(
                  (state) =>
                    state.stateName.toLowerCase() === value.name.toLowerCase()
                );

                if (
                  matchedState &&
                  (hoveredState?.stateCode !== matchedState.stateCode ||
                    hoveredState?.stateName !== matchedState.stateName)
                ) {
                  setHoveredState({
                    stateCode: matchedState.stateCode,
                    stateName: matchedState.stateName,
                  });
                }

                return (
                  <div>
                    <div>{value.name}</div>
                  </div>
                );
              }}
              mapLayout={{
                title: "",
                legendTitle: "",
                startColor: "#e6e6e6",
                endColor: "#e6e6e6",
                hoverTitle: "",
                borderColor: "#fff",
                hoverColor: "#7f0210",
                hoverBorderColor: "#7f0210",
              }}
              regionData={mapData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndiaMap;
