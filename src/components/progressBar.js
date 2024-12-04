import React from 'react'
import '../../src/scss/progressBar.scss';

export default function ProgressBar({ currentStep, totalSteps }) {

    return (
        <>
            <div className="main-wrapper mb-4">
                <div className="steps-wrapper">
                    <div className="steps">
                        {[...Array(totalSteps)].map((_, index) => (
                            <span
                                key={index}
                                className={`step ${index < currentStep ? "active" : ""}`}>
                            </span>
                        ))}
                        <div className="progress-bar">
                            <span
                                className="progress"
                                style={{
                                    width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                                }}>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
