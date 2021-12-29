import React,{} from 'react'
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

const Form = () => {

  let navigate = useNavigate();
  const Back = () => {
      navigate(-1, {replace: true});
  } 
  return (
    <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>THÊM MÁY</strong> 
        </CCardHeader>
        <CCardBody>

            <CRow>
              <CRow xs>      
                <CFormLabel>Tên máy</CFormLabel>       
                <CFormInput id = "psName" placeholder="psName"  />
              </CRow>
              <CRow xs>               
                <CFormLabel>Phiên bản</CFormLabel> 
                <CFormInput id = "psVersion" placeholder="Ps3,4,5"  />
              </CRow>
              <CRow xs>
                <CFormLabel>Ngày nhập</CFormLabel> 
                <CFormInput id= "psDate"  type = 'date'  />
              </CRow>
              <CRow xs>
                <CFormLabel>Thời gian bảo hành(tháng)</CFormLabel> 
                <CFormInput id = "psInsurance" placeholder="12"  />
              </CRow>              
            </CRow>
        </CCardBody>
      </CCard>
    </CCol>
    

    <div className="d-grid gap-2 col-6 mx-auto">
      <CButton type = 'submit' color="primary">Lưu</CButton>
      <CButton type = 'reset' color= "danger"  onClick={Back}>Hủy</CButton>
    </div>
    </CRow>


  )
}
export default Form
