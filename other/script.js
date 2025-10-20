let dictionaryData = [];

fetch("other/dictionary.json")
  .then(res => res.json())
  .then(data => dictionaryData = data);

document.getElementById("searchBtn").addEventListener("click", searchWord);
document.getElementById("searchBox").addEventListener("keypress", e => {
  if (e.key === "Enter") searchWord();
});

function searchWord() {
  const query = document.getElementById("searchBox").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!query) {
    resultDiv.innerHTML = "<p>దయచేసి ఒక పదం ఇవ్వండి.</p>";
    return;
  }

  const entry = dictionaryData.find(item => item.word === query);
  if (!entry) {
    resultDiv.innerHTML = "<p>ఆ పదం నిఘంటువులో లేదు.</p>";
    return;
  }

  resultDiv.innerHTML = `
    <div class="word">📍 ${entry.word}</div>
    <div class="field"><strong>వ్యాకరణ పాత్ర:</strong> ${entry.role}</div>
    <div class="field"><strong>పర్యాయపదాలు:</strong> ${entry.synonyms.join(", ")}</div>
    <div class="field"><strong>వాక్యాలు:</strong><ul>
      ${entry.examples.map(e => `<li>${e}</li>`).join("")}
    </ul></div>
    <div class="field"><strong>సంబంధిత పదాలు:</strong>
      ${entry.related.map(r => `
        <div class="related-word">
          <strong>${r.word}</strong> (${r.role})<br>
          పర్యాయపదాలు: ${r.synonyms.join(", ")}<br>
          ఉదాహరణలు:<ul>${r.examples.map(ex => `<li>${ex}</li>`).join("")}</ul>
        </div>
      `).join("<hr>")}
    </div>
  `;
}
