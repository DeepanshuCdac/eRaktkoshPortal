import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getApiData } from "../redux/slices/dataSlice";
import { Select } from "antd";
import { BaseUrl } from "../utils/url";

const IndiaMap = () => {
  const dispatch = useDispatch();
  const { statesWithDistricts } = useSelector((state) => state.data);

  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedStateName, setSelectedStateName] = useState("All");
  const [stateStats, setStateStats] = useState({
    bloodCollectionSummary: { totalCollection: "N/A", stateName: "All" },
    donorRegistered: { hnumDonorRegistered: "N/A" },
    totalBloodCenters: [{ hnumTotalBloodCentres: "N/A" }],
    campsOrganised: { finalCount: "N/A" },
    upcomingCamps: [{ totalUpcomingCamps: "N/A" }],
  });

  const [allStateData, setAllStateData] = useState({
    bloodCollectionSummary: [],
    totalBloodCenters: [],
    donorRegistered: [],
    campsOrganised: [],
    upcomingCamps: [],
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

  const states = [
    { stateCode: "ALL", stateName: "All" }, 
    ...(statesWithDistricts || []),
  ];

  const handleStateChange = (stateCode, stateName) => {
    if (!stateCode || !allStateData.bloodCollectionSummary.length) return;

    setSelectedState(stateCode);
    setSelectedStateName(stateName);

    if (stateCode === "ALL") {
      const sumValues = (arr, key) =>
        arr.reduce((sum, item) => sum + (Number(item?.[key]) || 0), 0);

      const totalCollection = sumValues(
        allStateData.bloodCollectionSummary,
        "totalCollection"
      );
      const totalCenters = sumValues(
        allStateData.totalBloodCenters,
        "hnumTotalBloodCentres"
      );
      const totalDonors = sumValues(
        allStateData.donorRegistered,
        "hnumDonorRegistered"
      );
      const totalCamps = sumValues(allStateData.campsOrganised, "finalCount");
      const totalUpcomingCamps = sumValues(
        allStateData.upcomingCamps,
        "totalUpcomingCamps"
      );

      setStateStats({
        bloodCollectionSummary: {
          totalCollection: totalCollection || "0",
          stateName: "All",
        },
        donorRegistered: {
          hnumDonorRegistered: totalDonors || "0",
        },
        totalBloodCenters: [{ hnumTotalBloodCentres: totalCenters || "0" }],
        campsOrganised: { finalCount: totalCamps || "0" },
        upcomingCamps: [{ totalUpcomingCamps: totalUpcomingCamps || "0" }],
      });
      return;
    }

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
    const upcomingCamps = allStateData.upcomingCamps.find(
      (item) => item.stateCode?.toString() === stateCode?.toString()
    );

    setStateStats({
      bloodCollectionSummary: {
        totalCollection: bloodData?.totalCollection ?? "0",
        stateName,
      },
      donorRegistered: {
        hnumDonorRegistered: donorData?.hnumDonorRegistered ?? "0",
      },
      totalBloodCenters: [
        { hnumTotalBloodCentres: centerData?.hnumTotalBloodCentres ?? "0" },
      ],
      campsOrganised: { finalCount: campsData?.finalCount ?? "0" },
      upcomingCamps: [
        { totalUpcomingCamps: upcomingCamps?.totalUpcomingCamps ?? "0" },
      ],
    });
  };

  useEffect(() => {
    if (allStateData?.bloodCollectionSummary?.length > 0) {
      handleStateChange("ALL", "All");
    }
  }, [allStateData]);

  useEffect(() => {
    if (window.AmCharts) {
      const map = new window.AmCharts.AmMap();
      map.panEventsEnabled = true;
      map.backgroundColor = "#fff";
      map.backgroundAlpha = 1;
      map.zoomControl.panControlEnabled = false;
      map.zoomControl.zoomControlEnabled = false;
      map.zoomControl.homeButtonEnabled = false;

      const dataProvider = { map: "indiaLow", getAreasFromMap: true };
      map.dataProvider = dataProvider;

      map.areasSettings = {
        autoZoom: false,
        color: "#CDCDCD",
        colorSolid: "#5EB7DE",
        selectedColor: "#7f0210",
        outlineColor: "#f7f3f3ff",
        rollOverColor: "rgba(163, 6, 27, 0.3)",
        rollOverOutlineColor: "#FFFFFF",
        selectable: true,
      };

      map.balloon = { enabled: true };

     map.addListener("clickMapObject", function (event) {
      
      map.dataProvider.areas.forEach((area) => {
        area.showAsSelected = false;
      });

      event.mapObject.showAsSelected = true;
      map.validateNow();

      const normalizeName = (name) =>
        name
          ?.toLowerCase()
          .replace(/&/g, "and")            
          .replace(/\bisland\b/g, "islands")
          .replace(/\s+/g, " ")            
          .trim();

      const clickedState = states.find(
        (s) => normalizeName(s.stateName) === normalizeName(event.mapObject.title)
      );

      if (clickedState) {
        handleStateChange(clickedState.stateCode, clickedState.stateName);
      }
    });

     map.export = { enabled: true };

    map.write("chartdiv");

        const removeCredits = () => {
      const links = document.querySelectorAll("#chartdiv a[href*='amcharts.com']");
      links.forEach((el) => el.remove());
    };

      setTimeout(removeCredits, 500);

      const observer = new MutationObserver(removeCredits);
    const chartDiv = document.getElementById("chartdiv");
       if (chartDiv) {
      observer.observe(chartDiv, {
        childList: true,
        subtree: true,
      });
    }
      return () => observer.disconnect();
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
                onChange={(value, option) =>
                  handleStateChange(value, option.label)
                }
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

            <div className="row">
              <div className="col-6 mb-2">
                <div className="map__data_container p-3 d-flex align-items-baseline">
                  <img
                    className="me-2"
                    style={{ height: "23px", width: "20px" }}
                    src={`${process.env.PUBLIC_URL}/assets/landingPage/registration.svg`}
                    alt=""
                  />
                  <div>
                    <p className="mb-0 key">Total Donor Registration</p>
                    <p className="mb-0 value">
                      {stateStats?.donorRegistered?.hnumDonorRegistered ||
                        "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-6 mb-2">
                <div className="map__data_container p-3 d-flex align-items-baseline">
                  <img
                    className="me-2"
                    src={`${process.env.PUBLIC_URL}/assets/landingPage/units.svg`}
                    alt=""
                  />
                  <div>
                    <p className="mb-0 key">Total Blood Centers</p>
                    <p className="mb-0 value">
                      {stateStats?.totalBloodCenters?.[0]
                        ?.hnumTotalBloodCentres || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-6 mb-2">
                <div className="map__data_container p-3 d-flex align-items-baseline">
                  <img
                    className="me-2"
                    src={`${process.env.PUBLIC_URL}/assets/landingPage/center.svg`}
                    alt=""
                  />
                  <div>
                    <p className="mb-0 key">Total Upcoming Camps</p>
                    <p className="mb-0 value">
                      {stateStats?.upcomingCamps?.[0]?.totalUpcomingCamps ||
                        "0"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-6 mb-2">
                <div className="map__data_container p-3 d-flex align-items-baseline">
                  <img
                    className="me-2"
                    src={`${process.env.PUBLIC_URL}/assets/landingPage/camps.svg`}
                    alt=""
                  />
                  <div>
                    <p className="mb-0 key">Camps Organised</p>
                    <p className="mb-0 value">
                      {stateStats?.campsOrganised?.finalCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "13px" }} className="mb-0">
              <span className="mandatory">*</span>The data represented has been
              collected post year 2017 onwards.
            </p>
          </div>

          {/* Right Panel */}
          <div className="col-xl-7 col-lg-7 col-12">
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndiaMap;
