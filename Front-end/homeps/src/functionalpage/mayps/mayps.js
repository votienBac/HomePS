import React, {useState} from "react";
import { 
    CButton,
    CCardBody,
    CCollapse,
    CRow,CCol,
    CSmartTable,
 } from '@coreui/react-pro';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom';
//import '@coreui/coreui/dist/css/coreui.min.css';
import Form from "./form";

export default function MayPS(){
  return (
    <Routes>
        <Route path='' element={<ExtraMayPS />} />
        <Route path="/form" element={<Form />} />
    </Routes>

)
}
function ExtraMayPS(){
    const [details, setDetails] = useState([])

    const columns = [
      { key: 'psId',label: 'Mã máy',filter: false, sorter: false,_style: { wpsIdth: '5%' } },
      {key: 'psName',label: 'Tên máy',_style: { wpsIdth: '20%' },_props: { color: 'primary', className: 'fw-semibold' },},
      // 'registered',
      // 'Thời_gian_cập_nhật',
      { key: 'psStatus',label: 'Tình trạng máy', filter: false, sorter: false, _style: { wpsIdth: '30%' } },
    
      { key: 'psState',label: 'Trạng thái máy',_style: { wpsIdth: '10%' } },
      {
        key: 'show_details',label: '',
        _style: { wpsIdth: '10%' },
        filter: false,
        sorter: false,
        _props: { color: 'primary', className: 'fw-semibold' },
      },
    ]
    const usersData = [
      { psId: '#May01',
        psName: '01',
        Thời_gian_cập_nhật: '2018/01/01',
        psStatus: 'PS5',
        psState: 'Đang chơi' },
        { psId: '#May02',
        psName: '02',
        Thời_gian_cập_nhật: '2018/01/02',
        psStatus: 'PS5',
        psState: 'Trống' },
        { psId: '#May03',
        psName: '03',
        Thời_gian_cập_nhật: '2018/01/03',
        psStatus: 'PS4',
        psState: 'Đang chơi' },
        { psId: '#May04',
        psName: '04',
        Thời_gian_cập_nhật: '2018/01/01',
        psStatus: 'PS5',
        psState: 'Đang chơi' },
        { psId: '#May05',
        psName: '05',
        Thời_gian_cập_nhật: '2018/01/01',
        psStatus: 'PS5',
        psState: 'Trống' },
        { psId: '#May06',
        psName: '06',
        Thời_gian_cập_nhật: '2018/01/03',
        psStatus: 'PS5',
        psState: 'Hỏng' },
        { psId: '#May07',
        psName: '07',
        Thời_gian_cập_nhật: '2018/01/09',
        psStatus: 'PS4',
        psState: 'Đang chơi' },
        { psId: '#May08',
        psName: '08',
        Thời_gian_cập_nhật: '2018/01/10',
        psStatus: 'PS5',
        psState: 'Trống' },
        { psId: '#May09',
        psName: '09',
        Thời_gian_cập_nhật: '2018/01/05',
        psStatus: 'PS5',
        psState: 'Đang chơi' },
        { psId: '#May10',
        psName: '10',
        Thời_gian_cập_nhật: '2018/01/01',
        psStatus: 'PS4',
        psState: 'Đang chơi' },
    ]
 
const toggleDetails = (index) => {
  const position = details.indexOf(index)
  let newDetails = details.slice()
  if (position !== -1) {
    newDetails.splice(position, 1)
  } else {
    newDetails = [...details, index]
  }
  setDetails(newDetails)
} // hiển thị show
return (
  <CRow>
  <CSmartTable
    activePage={1}
    cleaner
    clickableRows
    columns={columns}
    columnFilter
    columnSorter
    footer
    items={usersData}
    pagination
    itemsPerPageSelect // số lượng item trong 1 bảng
    itemsPerPage={5} // chọn trang
    
    scopedColumns={{

      show_details: (item) => {
        return (
          <td className="py-2">
            <CButton
              color="primary"
              variant="outline"
              shape="square"
              size="sm"
              onClick={() => {
                toggleDetails(item._id)
              }}
            >
              {details.includes(item._id) ? 'Hide' : 'Show'}
            </CButton>
          </td>
        )
      },
      details: (item) => {
        return (
          <CCollapse visible={details.includes(item._id)}>
            <CCardBody>
              {/* <p className="text-muted">Thời gian cập nhật: {item.Thời_gian_cập_nhật}</p> */}
              <CButton href="./form" size="sm" color="info">
                Sửa
              </CButton>
              <CButton size="sm" color="danger" >
                Xóa
              </CButton>
            </CCardBody>
          </CCollapse>
        )
      },
    }}
    // selectable
    sorterValue={{ column: 'id', state: 'asc' }}
    tableFilter 
    tableFilterLabel="Tìm kiếm"
    tableHeadProps={{
      color: 'danger',
    }}
    tableProps={{
      striped: true,
      hover: true,
    }}
    
  />
    <CCol>
    <Link to='/mayps/form'><CButton component="a"color="primary" size="lg" >Thêm máy</CButton></Link>
    </CCol>
  </CRow>
)
}