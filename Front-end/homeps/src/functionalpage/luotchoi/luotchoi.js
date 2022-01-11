import AddTurn from './addturn.js'
import DetailsTurn from './detailsturn'
import Payment from './payment'
import FinishedTurn from './finishedturnlist'
import DetailsFinishTurn from './detailsfinishturn'
import {
    Routes,
    Route,

} from 'react-router-dom'

import CurrentTurnList from './currentturnlist'

export default function LuotChoi() {
    return (
        <Routes>
            <Route path='' element={<CurrentTurnList />} />
            <Route path='finished-turn'>
                <Route path='' element={<FinishedTurn />}></Route>
                <Route path={`:id`} element={<DetailsFinishTurn />}></Route>
            </Route>
            <Route path='current-turn'>
                <Route path={`:id`} element={<DetailsTurn type='1' />}></Route>
            </Route>
            <Route path='payment'>
                <Route path={`:id`} element={<Payment />}></Route>
            </Route>

            <Route path="addturn/*" element={<AddTurn />}>
            </Route>

        </Routes>

    )
}