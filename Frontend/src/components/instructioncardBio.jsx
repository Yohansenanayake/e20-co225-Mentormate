import React from 'react';
import './instructionBio.css';

const instructioncardBio = () => {
    return (
        <div className="question-directions-container">
            <p>
                For each of the questions 41 to 50, one or more of the responses is/are correct.
                Decide which response/responses is/are correct and then select the correct number.
            </p>
            <ul className="directions-list">
                <li>If only (A), (B) and (D) are correct...........................(1)</li>
                <li>If only (A), (C) and (D) are correct...........................(2)</li>
                <li>If only (A) and (B) are correct...................................(3)</li>
                <li>If only (C) and (D) are correct...................................(4)</li>
                <li>If any other response or combination of responses is correct.......(5)</li>
            </ul>
            <table className="directions-table">
                <thead>
                    <tr>
                        <th>(1)</th>
                        <th>(2)</th>
                        <th>(3)</th>
                        <th>(4)</th>
                        <th>(5)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>(A), (B), (D) correct.</td>
                        <td>(A), (C), (D) correct.</td>
                        <td>(A), (B) correct.</td>
                        <td>(C), (D) correct.</td>
                        <td>Any other response or combination of responses correct.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default instructioncardBio;
