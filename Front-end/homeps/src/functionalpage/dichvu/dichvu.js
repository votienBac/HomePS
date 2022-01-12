import {
    Routes,
    Route,
    // Link,
} from 'react-router-dom'
import DetailsService from './DetailsService'
import CurrentServiceList from './CurrentServiceList'

export default function DichVu() {
    return (
        <Routes>
            <Route path='' element={<CurrentServiceList />} />
            <Route path='current-service'>
                <Route path={`:id`} element={<DetailsService type='1' />}></Route>
            </Route>
        </Routes>

    )
}