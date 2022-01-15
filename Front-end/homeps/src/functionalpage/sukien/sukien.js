import DetailsEvent from './DetailsEvent'
import CurrentEventList from './CurrentEventList'
import DailyEventList from './DailyEventList'
import DetailsDailyEvent from './DetailsDailyEvent'
import {
    Routes,
    Route,

} from 'react-router-dom'
export default function SuKien() {
    return (
        <Routes>
            <Route path='' element={<CurrentEventList />} />
            <Route path='daily-event'>
                <Route path='' element = {<DailyEventList />}></Route>
                <Route path={`:id`} element={<DetailsDailyEvent/>}></Route>
            </Route>
            <Route path='one-time-event'>
                <Route path={`:id`} element = {<DetailsEvent />}></Route>
            </Route>
        </Routes>

    )
}
