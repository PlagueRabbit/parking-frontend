import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

interface Lot {
  id: number;
  name: string;
  cnt: number;
}

interface ParkingData {
  available_spaces: number;
  long_parked: number;
  total_spaces: number;
}

export default function ParkingLotDashboard() {
  const [lots, setLots] = useState<Lot[]>([]);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [parkingData, setParkingData] = useState<ParkingData>({
    available_spaces: 0,
    long_parked: 0,
    total_spaces: 0,
  });

  const baseURL = "https://privately-firm-cat.ngrok-free.app";

  // ✅ 주차장 목록 가져오기
  useEffect(() => {
    axios
      .get<Lot[]>(`${baseURL}/ParkingLots/`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setLots(res.data);
          setSelectedLot(res.data[0]);
        } else {
          console.error("❌ /ParkingLots 응답이 배열이 아님:", res.data);
        }
      })
      .catch((err) => {
        console.error("❌ /ParkingLots 요청 실패:", err);
      });
  }, []);

  // ✅ 선택된 주차장의 JSON 데이터
  useEffect(() => {
    if (selectedLot) {
      axios
        .get<ParkingData>(
          `${baseURL}/static/parking_${selectedLot.id}.json?ts=${Date.now()}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        )
        .then((res) => {
          setParkingData(res.data);
        })
        .catch((err) => {
          console.error("❌ parking 데이터 로드 실패:", err);
          setParkingData({
            available_spaces: 0,
            long_parked: 0,
            total_spaces: 0,
          });
        });
    }
  }, [selectedLot]);

  return (
    <div className="container">
      <div className="layout">
        {/* 주차장 정보 */}
        <div className="main-content">
          <h1 className="title">{selectedLot?.name || "주차장"}</h1>
          <div className="image-wrapper">
            {selectedLot && (
              <img
                src={`${baseURL}/static/predicted${selectedLot.id}.jpg?ts=${Date.now()}`}
                alt="주차장 이미지"
                className="parking-image"
              />
            )}
          </div>
          <div className="info-text">
            <p>총 주차공간: {parkingData.total_spaces}</p>
            <p>남은 주차공간: {parkingData.available_spaces}</p>
            <p>장기 주차 탐지: {parkingData.long_parked}대</p>
          </div>
        </div>

        {/* 사이드 패널 */}
        <div className="side-panel">
          <h2 className="side-title">다른 구역</h2>
          <div className="button-list">
            {Array.isArray(lots) && lots.length > 0 ? (
              lots.map((lot) => (
                <button
                  key={lot.id}
                  onClick={() => setSelectedLot(lot)}
                  className={`lot-button ${
                    selectedLot?.id === lot.id ? "active" : ""
                  }`}
                >
                  {lot.name}
                </button>
              ))
            ) : (
              <p>주차장 목록을 불러오는 중입니다...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
