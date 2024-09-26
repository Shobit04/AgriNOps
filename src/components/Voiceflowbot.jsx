// VoiceflowBot.jsx
import React, { useEffect } from 'react';

export const DisableInputExtension = {
    name: 'DisableInput',
    type: 'effect',
    match: ({ trace }) =>
        trace.type === 'ext_disableInput' ||
        trace.payload.name === 'ext_disableInput',
    effect: ({ trace }) => {
        const { isDisabled } = trace.payload;

        function disableInput() {
            const chatDiv = document.getElementById('voiceflow-chat');

            if (chatDiv) {
                const shadowRoot = chatDiv.shadowRoot;
                if (shadowRoot) {
                    const textareas = shadowRoot.querySelectorAll('textarea');
                    for (let i = 0; i < textareas.length; i++) {
                        if (textareas[i].id.includes('vf-chat-input')) {
                            textareas[i].disabled = isDisabled;
                        }
                    }
                }
            }
        }

        disableInput();
        window.voiceflow.chat.interact({
            type: 'complete',
        });
    },
};

export const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_form' || trace.payload.name === 'ext_form',
    render: ({ trace, element }) => {
        const formContainer = document.createElement('form');

        formContainer.innerHTML = `
            <style>
              label {
                font-size: 0.8em;
                color: #888;
              }
              input[type="text"], input[type="email"], input[type="tel"] {
                width: 100%;
                border: none;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                background: transparent;
                margin: 5px 0;
                outline: none;
              }
              .phone {
                width: 150px;
              }
              .invalid {
                border-color: red;
              }
              .submit {
                background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
                border: none;
                color: white;
                padding: 10px;
                border-radius: 5px;
                width: 100%;
                cursor: pointer;
              }
            </style>
  
            <label for="name">Name</label>
            <input type="text" class="name" name="name" required><br><br>
  
            <label for="email">Email</label>
            <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" title="Invalid email address"><br><br>
  
            <label for="phone">Phone Number</label>
            <input type="tel" class="phone" name="phone" required pattern="\\d+" title="Invalid phone number, please enter only numbers"><br><br>
  
            <input type="submit" class="submit" value="Submit">
          `;

        formContainer.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = formContainer.querySelector('.name');
            const email = formContainer.querySelector('.email');
            const phone = formContainer.querySelector('.phone');

            if (
                !name.checkValidity() ||
                !email.checkValidity() ||
                !phone.checkValidity()
            ) {
                name.classList.add('invalid');
                email.classList.add('invalid');
                phone.classList.add('invalid');
                return;
            }

            formContainer.querySelector('.submit').remove();

            window.voiceflow.chat.interact({
                type: 'complete',
                payload: { name: name.value, email: email.value, phone: phone.value },
            });
        });

        element.appendChild(formContainer);
    },
};

export const DateExtension = {
    name: 'Date',
    type: 'response',
    match: ({ trace }) =>
        trace.type === 'ext_date' || trace.payload.name === 'ext_date',
    render: ({ trace, element }) => {
        const formContainer = document.createElement('form');

        // Get current date and next 7 working days (excluding Saturdays and Sundays)
        let currentDate = new Date();
        let next7WorkingDays = [];
        while (next7WorkingDays.length < 7) {
            let futureDate = new Date(currentDate);
            futureDate.setDate(currentDate.getDate() + 1);
            currentDate = futureDate;
            let dayOfWeek = futureDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
                next7WorkingDays.push(futureDate);
            }
        }

        formContainer.innerHTML = `
            <style>
              label {
                font-size: 0.8em;
                color: #888;
              }
              select, input[type="number"] {
                width: 100%;
                border: none;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                background: transparent;
                margin: 5px 0;
                outline: none;
              }
              .invalid {
                border-color: red;
              }
              .submit {
                background: linear-gradient(to right, #2e6ee1, #2e7ff1);
                border: none;
                color: white;
                padding: 10px;
                border-radius: 5px;
                width: 100%;
                cursor: pointer;
                opacity: 0.3;
              }
              .submit:enabled {
                opacity: 1;
              }
              .time-container {
                display: flex;
                justify-content: space-between;
              }
              .time-container div {
                flex: 1;
                margin: 5px;
              }
            </style>
            <label for="date">Select your date</label><br>
            <select id="date" name="date">
              ${next7WorkingDays.map(day => `<option value="${day.toISOString().split('T')[0]}">${day.toDateString()}</option>`).join('')}
            </select><br><br>
            <div class="time-container">
              <div>
                <label for="hours">Hours</label>
                <input type="number" id="hours" name="hours" min="0" max="23" placeholder="HH">
              </div>
              <div>
                <label for="minutes">Minutes</label>
                <input type="number" id="minutes" name="minutes" min="0" max="59" placeholder="MM">
              </div>
            </div>
            <br>
            <input type="submit" id="submit" class="submit" value="Submit" disabled="disabled">
          `;

        const submitButton = formContainer.querySelector('#submit');
        const dateInput = formContainer.querySelector('#date');
        const hoursInput = formContainer.querySelector('#hours');
        const minutesInput = formContainer.querySelector('#minutes');

        const checkInputs = () => {
            if (dateInput.value && hoursInput.value !== '' && minutesInput.value !== '') {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }
        };

        dateInput.addEventListener('input', checkInputs);
        hoursInput.addEventListener('input', checkInputs);
        minutesInput.addEventListener('input', checkInputs);

        formContainer.addEventListener('submit', function (event) {
            event.preventDefault();

            const date = dateInput.value;
            const hours = hoursInput.value.padStart(2, '0');
            const minutes = minutesInput.value.padStart(2, '0');
            const time = `${hours}:${minutes}`;

            formContainer.querySelector('.submit').remove();

            window.voiceflow.chat.interact({
                type: 'complete',
                payload: { date: date, time: time },
            });
        });

        element.appendChild(formContainer);
    },
};

const VoiceflowBot = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
        script.type = 'text/javascript';
        script.onload = () => {
            window.voiceflow.chat.load({
                verify: { projectID: '669eccf354ad5b9bda4d4399' },
                url: 'https://general-runtime.voiceflow.com',
                versionID: 'development',
                user: {
                    name: 'Demo User',
                },
                render: {
                    mode: 'overlay',
                },
                autostart: false,
                allowDangerousHTML: true,
                assistant: {
                    extensions: [
                        DisableInputExtension,
                        FormExtension,
                        DateExtension,
                    ],
                },
            });
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <canvas id="confetti-canvas"></canvas>
            <div id="flat-chat"></div>
            <div id="voiceflow-chat-frame"></div>
        </div>
    );
};

export default VoiceflowBot;
