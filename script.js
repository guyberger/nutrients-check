const thresholds = {
    "Total Fat": 3,
    "Saturated Fat": 1,
    "Trans Fat": 0.5,
    "Cholesterol": 0.02, // Convert mg to g for consistency
    "Sodium": 0.14, // Convert mg to g for consistency
    "Total Carbohydrate": 15,
    "Dietary Fiber": 3,
    "Protein": 5
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

    const nutrients = {
        "Total Fat": parseFloat(document.getElementById('totalFat').value),
        "Saturated Fat": parseFloat(document.getElementById('saturatedFat').value),
        "Trans Fat": parseFloat(document.getElementById('transFat').value),
        "Cholesterol": parseFloat(document.getElementById('cholesterol').value) / 1000, // Convert mg to g
        "Sodium": parseFloat(document.getElementById('sodium').value) / 1000, // Convert mg to g
        "Total Carbohydrate": parseFloat(document.getElementById('totalCarbs').value),
        "Dietary Fiber": parseFloat(document.getElementById('dietaryFiber').value),
        "Protein": parseFloat(document.getElementById('protein').value)
    };

    let exceedsThresholds = false;
    let meetsGoodNutrients = true;

    for (const [nutrient, value] of Object.entries(nutrients)) {
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

    if (exceedsThresholds) {
        document.body.style.backgroundColor = '#FF4F33'; // Light red
        document.body.style.color = '#ffffff'; // White text
    } else if (meetsGoodNutrients) {
        document.body.style.backgroundColor = '#DAF7A6'; // Light green
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