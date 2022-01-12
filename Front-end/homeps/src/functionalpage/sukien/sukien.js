import {
    Routes,
    Route,

} from 'react-router-dom'
import DetailsEvent from './DetailsEvent'
import CurrentEventList from './CurrentEventList'

export default function SuKien() {
    return (
        <Routes>
            <Route path='' element={<CurrentEventList />} />
            <Route path='current-event'>
                <Route path={`:id`} element={<DetailsEvent type='1' />}></Route>
            </Route>
        </Routes>

    )
}
