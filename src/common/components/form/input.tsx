import * as React from 'react'

interface Props {
    name: string
    label: string
    placeholder?: string
    value: string
    //그냥 void 리턴하는 함수 껍대기
    onChange: (fieldName: string, value: string) => void 
    error?: string
}

export const Input: React.SFC<Props> = (props) => {
    return (
        <div className={formatWrapperClass(props)}>
        {/* //htmlFor은 bound할 html 요소 */}
            <label htmlFor={props.name}>{props.label}</label>
            <div className='field'>
                <input type='text'
                    name={props.name}
                    className='form-control'
                    placeholder={props.placeholder}
                    value={props.value}
                    //props를 먼저 인자로 넣어주고 반환 되는 콜백에 이벤트 들어가는 듯
                    onChange={onChangeInput(props)}
                />
            </div>
            {/* validatoin error message prints */}
            <div className='help-block'>{props.error}</div>
        </div>
    )
}

//에러값이 전달되면 has-error class를 추가한다.
const formatWrapperClass = (props: Props) => {
    const wrapperClass = 'form-group'

    return props.error ? 
    `${wrapperClass} has-error` :
    wrapperClass
}

//pageContainer에 정의된 함수에 값을 넣어줌
const onChangeInput = (props: Props) => (e:React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name
    const inputValue = e.target.value

    props.onChange(inputName, inputValue)
}