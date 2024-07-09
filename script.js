const thresholds = {
    "Total Fat": 5, // max grams per serving
    "Saturated Fat": 3, // max grams per serving
    "Trans Fat": 0.5, // max grams per serving
    "Cholesterol": 0.03, // max grams per serving, convert mg to g
    "Sodium": 0.23, // max grams per serving, convert mg to g
    "Total Carbohydrate": 60, // max grams per serving
    "Dietary Fiber": 5, // min grams per serving
    "Protein": 20, // max grams per serving
    "Calcium": 0.3 // max grams per serving, convert mg to g
};

const updateValue = (id) => {
    const slider = document.getElementById(id);
    const valueField = document.getElementById(`${id}Value`);
    const value = parseFloat(slider.value);

    valueField.value = value;
    checkHealth();
};
const checkHealth = () => {
    const servingSize = parseFloat(document.getElementById('servingSize').value);
    if (servingSize === 0) return;

    const nutrients = getNutrientValues();
    const { exceedsThresholds, meetsGoodNutrients } = evaluateNutrients(nutrients, servingSize);

    updateBackgroundColor(exceedsThresholds, meetsGoodNutrients);
};

const getNutrientValues = () => {
    return {
        "Total Fat": parseFloat(document.getElementById('totalFat').value) || undefined,
        "Saturated Fat": parseFloat(document.getElementById('saturatedFat').value) || undefined,
        "Trans Fat": parseFloat(document.getElementById('transFat').value) || undefined,
        "Cholesterol": parseFloat(document.getElementById('cholesterol').value) / 1000 || undefined, // Convert mg to g
        "Sodium": parseFloat(document.getElementById('sodium').value) / 1000 || undefined, // Convert mg to g
        "Total Carbohydrate": parseFloat(document.getElementById('totalCarbs').value) || undefined,
        "Dietary Fiber": parseFloat(document.getElementById('dietaryFiber').value) || undefined,
        "Protein": parseFloat(document.getElementById('protein').value) || undefined,
        "Calcium": parseFloat(document.getElementById('calcium').value) / 1000 || undefined // Convert mg to g
    };
};

const evaluateNutrients = (nutrients, servingSize) => {
    let exceedsThresholds = false;
    let meetsGoodNutrients = true;

    for (const [nutrient, value] of Object.entries(nutrients)) {
        if (value === undefined) continue; // Skip if value is not set
        const ratio = value / servingSize * 100;
        if (thresholds[nutrient] !== undefined) {
            if (nutrient === 'Dietary Fiber' || nutrient === 'Protein') {
                if (ratio < thresholds[nutrient]) {
                    meetsGoodNutrients = false;
                }
            } else {
                if (ratio > thresholds[nutrient]) {
                    exceedsThresholds = true;
                    break;
                }
            }
        }
    }
    return { exceedsThresholds, meetsGoodNutrients };
};

const updateBackgroundColor = (exceedsThresholds, meetsGoodNutrients) => {
    if (exceedsThresholds) {
        document.body.style.backgroundColor = '#FF4F33'; // Red
        document.body.style.color = '#ffffff'; // White text
    } else if (meetsGoodNutrients) {
        document.body.style.backgroundColor = '#DAF7A6'; // Green
        document.body.style.color = '#333333'; // Black text
    } else {
        document.body.style.backgroundColor = '#ffffcc'; // Light yellow
        document.body.style.color = '#333333'; // Black text
    }
};
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', (event) => {
        const id = event.target.id.replace('Value', '');
        const slider = document.getElementById(id);
        slider.value = event.target.value;
        checkHealth();
    });
});

document.getElementById('servingSize').addEventListener('input', () => {
    checkHealth();
});

checkHealth();