const CheckBoxCustom = ({label, checked})=>{
  return <div style={{
    display: 'inline-block',
    marginRight: '1.5rem',
  }}>
    <input type={'checkbox'} style={{
      width: 'fit-content',
      height: '1rem'
    }} checked={checked}/>
    <label style={{
      padding: '5px',
    }}>{label}</label>
  </div>
}

export  default  CheckBoxCustom;