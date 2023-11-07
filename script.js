const questions = [];

function askQuestion() {
    const questionInput = document.getElementById("question");
    const questionContainer = document.getElementById("questionContainer");

    const question = questionInput.value;
    if (question.trim() === "") {
        alert("Por favor, digite uma pergunta.");
        return;
    }

    // Clear the input field
    questionInput.value = "";

    const newQuestion = {
        question,
        yesCount: 0,
        noCount: 0
    };

    questions.push(newQuestion);

    // Create a new question element and add it to the container
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerHTML = `
      <div>
        <strong>Pergunta: ${question}</strong> 
            <label>
                <input type="radio" name="response" value="yes"> Sim
            </label>
            <label>
                <input type="radio" name="response" value="no"> Não
            </label>
            <button onclick="submitResponse(this, ${questions.length - 1})">Responder</button>
        </div>
        <p><strong>Respostas:</strong> Sim: 0 Não: 0</p>
    `;

    questionContainer.appendChild(questionElement);

    // Add a horizontal line separator
    const hr = document.createElement("hr");
    questionContainer.appendChild(hr);
}

function submitResponse(button, questionIndex) {
    const responseElement = button.parentElement;
    const responseValue = responseElement.querySelector("input[name='response']:checked").value;

    const question = questions[questionIndex];

    if (responseValue === "yes") {
        question.yesCount++;
    } else if (responseValue === "no") {
        question.noCount++;
    }

    const totalResponses = question.yesCount + question.noCount;
    const yesPercentage = ((question.yesCount / totalResponses) * 100).toFixed(2);
    const noPercentage = ((question.noCount / totalResponses) * 100).toFixed(2);

    // Update response percentages
    const questionElement = responseElement.parentElement;
    questionElement.querySelector("p").innerHTML = `<strong>Respostas:</strong> Sim: ${yesPercentage}% Não: ${noPercentage}%`;
}
