// New map code...


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
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
    dispatch(getApiData());

    const fetchMapData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BaseUrl}/eraktkosh/stateData`);
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
    if (!stateCode || !allStateData.bloodCollectionSummary.length) return;

    setSelectedState(stateCode);
    setSelectedStateName(stateName);

    const bloodData = allStateData.bloodCollectionSummary.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );
    const centerData = allStateData.totalBloodCenters.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );
    const donorData = allStateData.donorRegistered.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );
    const campsData = allStateData.campsOrganised.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );

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

  // ✅ Initialize AmCharts Map once
  useEffect(() => {
    if (window.AmCharts) {
      const map = new window.AmCharts.AmMap();
      map.panEventsEnabled = true;
      map.backgroundColor = "#fff";
      map.backgroundAlpha = 1;

      map.zoomControl.panControlEnabled = true;
      map.zoomControl.zoomControlEnabled = true;

      const dataProvider = {
        map: "indiaLow",
        getAreasFromMap: true,
      };

      map.dataProvider = dataProvider;

      map.areasSettings = {
        autoZoom: false,
        color: "#CDCDCD",
        colorSolid: "#5EB7DE",
        selectedColor: "#7f0210",
        outlineColor: "#f7f3f3ff",
        rollOverColor: "rgba(127, 2, 16, 0.3)",
        rollOverOutlineColor: "#FFFFFF",
        selectable: true,
      };

      map.addListener("clickMapObject", function (event) {
        map.selectedObject = map.dataProvider;

        event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
        map.returnInitialColor(event.mapObject);

        // Find clicked state
        const clickedState = states.find(
          (s) => s.stateName.toLowerCase() === event.mapObject.title.toLowerCase()
        );
        if (clickedState) {
          handleStateChange(clickedState.stateCode, clickedState.stateName);
        }
      });

      map.export = { enabled: true };

      map.write("chartdiv");
    }
  }, [states, allStateData]);

  return (
    <section className="map__india">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Panel */}
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

            {/* Stats Cards */}
            <div>
              <div className="row">
                <div className="col-6 mb-2">
                  <div className="map__data_container p-3 h-100 d-flex align-items-baseline">
                    <img className="me-2" src="assets/landingPage/registration.svg" alt="" />
                    <div>
                      <p className="mb-0 key">Donor Registration</p>
                      <p className="mb-0 value">
                        {stateStats?.donorRegistered?.hnumDonorRegistered || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-2">
                  <div className="map__data_container p-3 h-100 d-flex align-items-baseline">
                    <img className="me-2" src="assets/landingPage/units.svg" alt="" />
                    <div>
                      <p className="mb-0 key">Blood Units Collected</p>
                      <p className="mb-0 value">
                        {stateStats?.bloodCollectionSummary?.totalCollection || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-2">
                  <div className="map__data_container p-3 h-100 d-flex align-items-baseline">
                    <img className="me-2" src="assets/landingPage/center.svg" alt="" />
                    <div>
                      <p className="mb-0 key">Blood Centers</p>
                      <p className="mb-0 value">
                        {stateStats?.totalBloodCenters?.[0]?.hnumTotalBloodCentres || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-2">
                  <div className="map__data_container p-3 h-100 d-flex align-items-baseline">
                    <img className="me-2" src="assets/landingPage/camps.svg" alt="" />
                    <div>
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
              <span className="mandatory">*</span>The data represented has been
              collected post year 2017 onwards.
            </p>
          </div>

          {/* Right Panel - AmCharts Map */}
          <div className="col-xl-7 col-lg-7 col-12">
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndiaMap;
