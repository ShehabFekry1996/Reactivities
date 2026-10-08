import {MapContainer,Popup,TileLayer,Marker} from 'react-leaflet';
import { categoryIcon, tileAttribution, tileUrl } from '../../../lib/util/mapUtils';

type Props={
    position: [number,number],
    venue:string,
    category?: string
}

export default function MapComponent({position,venue,category}: Props) {
  return (
  <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{height:'100%'}}>
    <TileLayer url={tileUrl} attribution={tileAttribution} />
    <Marker position={position} icon={categoryIcon(category)}>
      <Popup>
            {venue}
      </Popup>
    </Marker>
  </MapContainer>
  )
}
