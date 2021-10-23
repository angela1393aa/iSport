import React, { Component } from 'react';
import '../../../node_modules/leaflet/dist/leaflet.css';
import L from '../../../node_modules/leaflet';

class GymMap extends Component {
    //地圖
    constructor(props) {
        super(props);
        this.mapid = null;
        this.map = null;
    }
    //建立組件
    componentDidMount() {
        // 引入地圖
        this.mymap = L.map('mapid').setView([25.0259029, 121.5703875], 18);
        // 引入圖資
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.mymap);
        //建立座標
        const greenIcon = new L.Icon({
            iconUrl:
                'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl:
                'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });
        //定位座標
        const marker = L.marker([25.0259029, 121.5703875], {
            icon: greenIcon,
        }).addTo(this.mymap);
        marker.bindPopup('<b>點即旁邊的按鈕可以顯示地圖!</b>').openPopup();
    }
    //重新渲染比較前後的值是否有差異，如果有差異的話才做新的一次網路請求
    componentDidUpdate(prevProps, prevState) {
        // console.log(
        //     'componentDidUpdate',
        //     prevProps.lat,
        //     this.props.lat,
        //     prevProps.lng,
        //     this.props.lng
        // );
        if (
            prevProps.lat !== this.props.lat ||
            prevProps.lng !== this.props.lng
        ) {
            this.mymap.setView([this.props.lat, this.props.lng], 18);
            L.popup()
                .setLatLng([this.props.lat, this.props.lng]) //設置彈出窗口將打開的地理點。
                .addTo(this.mymap) //將彈出窗口添加到地圖。
                .setContent(
                    `<h1>${this.props.name}</h1>
                      <p>${this.props.address}</p>
                      <img class="img-fluid" src="${this.props.image}">`
                ) //設置彈出窗口的 HTML 內容。
                .openOn(this.mymap); //將彈出窗口添加到地圖並關閉前一個。
        }
    }

    render() {
        return (
            <>
                <div id="mapid" style={{ height: '100%', width: '100%' }} />
            </>
        );
    }
}

export default GymMap;
