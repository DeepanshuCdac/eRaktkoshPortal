import { Button } from 'antd'
import React, { useState } from 'react'

export default function Counter() {
    const [value, setValue] = useState(0)

    const handleIncrease = () => {
        setValue(value + 1)
    }
    
    const handleDecrease = () => {
        if(value === 0){
            return
        }
        setValue(value - 1)
    }

    const handleReset = () => {
        setValue(0) 
    }

    return (
        <div style={{ padding: '20px' }}>
            <p style={{ fontSize: '24px', marginBottom: '20px' }}>Count: {value}</p>
            <Button type="primary" onClick={handleIncrease} style={{ marginRight: '8px' }}>Increase</Button>
            <Button type="primary" danger onClick={handleDecrease} style={{ marginRight: '8px' }}>Decrease</Button>
            <Button onClick={handleReset}>Reset</Button>
        </div>
    )
}