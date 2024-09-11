import React from 'react'

export default function ProgressBar() {
    return (
        <>
            <main class="main-wrapper">
                <div class="steps-wrapper">
                    <div class="steps">
                        <span class="step active"></span>
                        <span class="step"></span>
                        <span class="step"></span>
                        <div class="progress-bar">
                            <span class="progress"></span>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="btn btn-prev" id="btn-prev" disabled>Previous</button>
                        <button class="btn btn-next" id="btn-next">Next</button>
                    </div>
                </div>
            </main>
        </>
    )
}
