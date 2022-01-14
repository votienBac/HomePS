import {
    Routes,
    Route,

} from 'react-router-dom'
import DetailsEvent from './DetailsEvent'
import CurrentEventList from './CurrentEventList'
import DailyEventList from './DailyEventList'
import DetailsDailyEvent from './DetailsDailyEvent'

export default function SuKien() {
    return (
        <Routes>
            <Route path='' element={<CurrentEventList />} />
            <Route path='onetimeevent'>
                <Route path={`:id`} element={<DetailsEvent type='1' />}></Route>
            </Route>
            <Route path='dailyevent'>
                <Route path={`:id`} element={<DetailsEvent type='1' />}></Route>
            </Route>
        </Routes>

    )
}
