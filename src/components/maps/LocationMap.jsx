import React , {useEffect, useState} from 'react'

const { kakao } = window;

const LocationMap = () => {
  // const [map , setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) , level: 3 };
    const map = new kakao.maps.Map(container, options);
    // setMap(maps);
  }, []);

  return (
    <>
      <div id="map" style={{width: "100%" , height: "400px"}}></div>
    </>
  )
}

export default LocationMap