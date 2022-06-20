import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormSelect,
} from '@coreui/react'

import { checkAndUpdateResiForScan } from '../../utils/axios-request'

const ScanForSent = () => {
  //function
  const handleOnEnterPressed = () => {
    let res = checkAndUpdateResiForScan(textInput, 'SEND')
    try {
      res.then(function (result) {
        console.log(result.status)
        if (result.status === 'true') {
          //alert('Invoice ' + textInput + ' berhasil di update untuk di kirim')
          setErrorMessage('Resi ' + textInput + ' berhasil di update untuk di kirim')
          setIsErrorMessage(2)
        } else {
          //alert('Invoice ' + textInput + ' gagal di update untuk dikirim, error:' + result.message)
          setErrorMessage(
            'Resi ' + textInput + ' gagal di update untuk dikirim, error:' + result.message,
          )
          setIsErrorMessage(1)
        }
      })
    } catch (err) {}
    setTextInput('')
  }
  const TextErrorMessage = (props) => {
    return (
      <div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Scan Result:</strong> {/*<small>File input</small>*/}
          </CCardHeader>
          <CCardBody>
            <h6 className={props.IsError == 1 ? 'text-danger' : 'text-primary'}>{props.Message}</h6>
          </CCardBody>
        </CCard>
      </div>
    )
  }
  //state
  const [textInput, setTextInput] = useState('')
  const [cursorInput, setCursorInput] = useState(null)

  const [isErrorMessage, setIsErrorMessage] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Scan Send</strong> {/*<small>File input</small>*/}
          </CCardHeader>
          <CCardBody>
            <CFormLabel htmlFor="formFile">Input Resi Untuk dikirim</CFormLabel>
            <CFormInput
              autoFocus="autofocus"
              type="text"
              placeholder="Kode Resi"
              aria-label="default input example"
              value={textInput}
              onChange={(e) => {
                setCursorInput(e.target.selectionStart)
                setTextInput(e.target.value)
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleOnEnterPressed()
                }
              }}
              onFocus={(e) => {
                e.target.selectionStart = cursorInput
              }}
            />
          </CCardBody>
        </CCard>

        {isErrorMessage > 0 && <TextErrorMessage IsError={isErrorMessage} Message={errorMessage} />}
      </CCol>
    </CRow>
  )
}

export default ScanForSent
